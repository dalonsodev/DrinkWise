import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import questionsWithAlcohol from "../data/questions/withAlcohol"
import questionsNoAlcohol from "../data/questions/noAlcohol"

export default function useQuizLogic() {
   const { t } = useTranslation()

   const [showConfirmation, setShowConfirmation] = useState(true)
   const [quizAlcohol, setQuizAlcohol] = useState(true)
   const [answers, setAnswers] = useState([])
   const [currentStep, setCurrentStep] = useState(0)
   const [lastAnsweredStep, setLastAnsweredStep] = useState(-1)

   function translateQuestions(questions) {
      return questions.map(q => ({
         ...q,
         text: t(q.textKey),
         options: q.options.map(opt => t(opt.key))
      }))
   }

   const currentQuestionsBase = quizAlcohol ? questionsWithAlcohol : questionsNoAlcohol
   const currentQuestions = translateQuestions(currentQuestionsBase)

   useEffect(() => {
      if (currentStep < currentQuestions.length) {
         const question = currentQuestions[currentStep] || { isMulti: false }
         const answer = answers[currentStep]
         if (!question.isMulti &&
               answer !== null &&
               currentStep === lastAnsweredStep &&
               currentStep < currentQuestions.length - 1) {
            setTimeout(() => {
               handleNextStep()
               setLastAnsweredStep(-1)
            }, 150)
         }
      }
   }, [answers, currentStep, currentQuestions, lastAnsweredStep])

   function handleQuizAlcoholToggle() {
      setQuizAlcohol(prev => !prev)
   }

   function handleStartQuiz() {
      const questions = quizAlcohol ? questionsWithAlcohol : questionsNoAlcohol
      setShowConfirmation(false)
      setCurrentStep(0)
      setAnswers(questions.map(q => q.isMulti ? [] : null))
   }

   function getIsSelected(question, opt) {
      const answer = answers[currentStep]
      
      return question.isMulti
         ? (answer || []).includes(opt)
         : answer === opt
   }

   function handleOptionSelect(selectedOption, step) {
      setAnswers(prev => {
         const newAnswers = [...prev]
         if (newAnswers[step] === undefined) {
            newAnswers[step] = []
         }

         const question = currentQuestions[step]
         if (question.isMulti) {
            const current = Array.isArray(newAnswers[step]) ? newAnswers[step] : []

            newAnswers[step] = current.includes(selectedOption)
               ? current.filter(opt => opt !== selectedOption)
               : [...current, selectedOption]
         } 
         else {
            newAnswers[step] = selectedOption
         }

         return newAnswers
      })

      setLastAnsweredStep(step)
   }

   function handlePrevStep() {
      const prevStep = currentStep - 1
      setCurrentStep(prev => prev - 1)
      setLastAnsweredStep(-1)
      setAnswers(prev => {
         const newAnswers = [...prev]
         newAnswers[prevStep] = null
         return newAnswers
      })
   }

   function handleNextStep() {
      setCurrentStep(prev => prev + 1)
   }

   function isResultsBtnDisabled() {
      if (currentStep !== currentQuestions.length - 1) return true
      const currentAnswer = answers[currentStep]
      const question = currentQuestions[currentStep]
      return question?.isMulti ? !(currentAnswer?.length > 0) : !currentAnswer
   }

   return {
      // States
      showConfirmation,
      quizAlcohol,
      answers,
      currentStep,
      currentQuestions,
      
      // Functions
      handleQuizAlcoholToggle,
      handleStartQuiz,
      getIsSelected,
      handleOptionSelect,
      handlePrevStep,
      handleNextStep,
      isResultsBtnDisabled
   }
}