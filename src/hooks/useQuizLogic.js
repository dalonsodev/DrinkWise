import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import cocktails from "../data/cocktails.json"
import questionsWithAlcohol from "../data/questions/withAlcohol"
import questionsNoAlcohol from "../data/questions/noAlcohol"

export default function useQuizLogic() {
   const { t } = useTranslation()

   const [showConfirmation, setShowConfirmation] = useState(true)
   const [quizAlcohol, setQuizAlcohol] = useState(true)
   const [answers, setAnswers] = useState([])
   const [currentStep, setCurrentStep] = useState(0)
   const [lastAnsweredStep, setLastAnsweredStep] = useState(-1)

   const ANSWER_MAP = {
      // WITH ALCOHOL
      // Ocassion (q1) 
      "Aperitif": "Aperitif",
      "With meal": "With meal",
      "Dessert": "Dessert", 
      "Evening/Night": "Evening/Night",
      "Aperitivo": "Aperitif",
      "En la comida": "With meal",
      "Postre/Sobremesa": "Dessert",
      "Tarde/Noche": "Evening/Night",
      
      // Category (q2)
      "Sweet and/or Fruity": "sweetAndFruity",
      "Refreshing and light": "refreshingAndLight", 
      "Strong and classic": "boldAndClassic",
      "Dulce y/o Afrutado": "sweetAndFruity",
      "Refrescante y ligero": "refreshingAndLight",
      "Potente y clásico": "boldAndClassic",
      
      // Spirits (q3)
      "Whisky": "Whisky",
      "Gin": "Gin",
      "Vodka": "Vodka",
      "Rum": "Rum",
      "Tequila": "Tequila",
      "Others": "Others",
      "Ginebra": "Gin", 
      "Ron": "Rum",
      "Otros": "Others",
      
      // NO ALCOHOL
      // Category (q1)
      "Citrus": "citrus",
      "Fruity": "fruity",
      "Herbal": "herbal",
      "Cítrico": "citrus",
      "Afrutado": "fruity",

      // Texture (q2)
      "Smooth and silky": "Smooth",
      "Let's go bubbly!": "Bubbly",
      "Suave y sedoso": "Smooth",
      "Burbujeante": "Bubbly"
   }

   function standardizeAnswer(answer) {
      if (Array.isArray(answer)) {
         return answer.map(opt => ANSWER_MAP[opt] || opt)
      }
      return ANSWER_MAP[answer] || answer
   }

   const stdAnswers = answers.map(answer => standardizeAnswer(answer))

   function translateQuestions(questions) {
      return questions.map(q => ({
         ...q,
         text: t(q.textKey),
         options: q.options.map(opt => t(opt.key))
      }))
   }

   const currentQuestionsBase = quizAlcohol ? questionsWithAlcohol : questionsNoAlcohol
   const currentQuestions = translateQuestions(currentQuestionsBase)


   function filterCocktails() {
      if (currentStep !== currentQuestions.length) return []

      const [q1, q2, q3] = stdAnswers

      if (!quizAlcohol) {
         // NO Alcohol: flavor (q1) + texture (q2)
         return cocktails.filter(cocktail => {
            if (cocktail.hasAlcohol) return false
            const matchesCategory = !q1 || cocktail.category === q1
            const matchesTexture = !q2 || cocktail.texture === q2

            return matchesCategory && matchesTexture
         })
      } else {
         // With Alcohol: occasion (q1) + flavor (q2) + spirit (q3)
         return cocktails.filter(cocktail => {
            if (!cocktail.hasAlcohol) return false
            const matchesOccasion = !q1 || cocktail.occasion.includes(q1)
            const matchesCategory = !q2 || cocktail.category === q2
            const matchesSpirit = !q3 || Array.isArray(q3) 
               ? q3.includes(cocktail.spirit) 
               : cocktail.spirit === q3

            return matchesOccasion && matchesCategory && matchesSpirit
         })
      }
   }


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
      currentStep,
      currentQuestions,
      filteredCocktails: filterCocktails(),
      
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