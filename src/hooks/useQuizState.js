import { useState } from "react"
import questionsWithAlcohol from "../data/questions/withAlcohol"
import questionsNoAlcohol from "../data/questions/noAlcohol"

export default function useQuizState() {
   const [showConfirmation, setShowConfirmation] = useState(true)
   const [quizAlcohol, setQuizAlcohol] = useState(true)
   const [answers, setAnswers] = useState([])
   const [currentStep, setCurrentStep] = useState(0)
   const [lastAnsweredStep, setLastAnsweredStep] = useState(-1)
   const [skippedQ3, setSkippedQ3] = useState(false)

   const currentQuestionsBase = quizAlcohol ? questionsWithAlcohol : questionsNoAlcohol

   function handleStartQuiz() {
      const questions = quizAlcohol ? questionsWithAlcohol : questionsNoAlcohol
      setShowConfirmation(false)
      setCurrentStep(0)
      setAnswers(questions.map(q => q.isMulti ? [] : null))
   }

   function handleQuizAlcoholToggle() {
      setQuizAlcohol(prev => !prev)
   }

   function handlePrevStep() {
      let prevStep = currentStep - 1
      const isSkippingQ3 = skippedQ3 && prevStep === 2

      if (isSkippingQ3) {
         prevStep -= 1 // Jumps to q2
         setSkippedQ3(false)
      }

      setCurrentStep(prevStep)
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

   return {
      showConfirmation,
      quizAlcohol,
      answers, 
      setAnswers,
      currentStep,
      setCurrentStep,
      lastAnsweredStep,
      setLastAnsweredStep,
      skippedQ3,
      setSkippedQ3,
      currentQuestionsBase,
      handleStartQuiz,
      handleQuizAlcoholToggle,
      handlePrevStep,
      handleNextStep
   }
}