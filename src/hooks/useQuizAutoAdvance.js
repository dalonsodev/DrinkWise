import { useEffect, useRef } from "react"

export default function useQuizAutoAdvance({
   currentStep,
   currentQuestions,
   answers,
   lastAnsweredStep,
   quizAlcohol,
   getFilteredAfterQ2,
   setCurrentStep,
   setLastAnsweredStep,
   setAnswers,
   setSkippedQ3
}) {

   const isSkippingToResults = useRef(false)

   useEffect(() => {
      if(isSkippingToResults.current) return

      if (currentStep >= currentQuestions.length) return

      const question = currentQuestions[currentStep]
      const answer = answers[currentStep]

      if (answer === undefined || answer === null) return

      // Special case: In q2 (step 1) with alcohol, check if it should skip q3
      if (quizAlcohol && 
            currentStep === 1 && 
            answer !== null && 
            !question.isMulti 
            && currentStep === lastAnsweredStep) {
         const filteredAfterQ2 = getFilteredAfterQ2()
         
         if (filteredAfterQ2.length === 1) {
            setAnswers(prev => {
               const newAnswers = [...prev]
               newAnswers[2] = null // Ignore q3 in final filter
               return newAnswers
            })
            setSkippedQ3(true)
            isSkippingToResults.current = true

            setTimeout(() => {
               setCurrentStep(currentQuestions.length)
               setLastAnsweredStep(-1)
               isSkippingToResults.current = false
            }, 150)
            
            return // Early exit to avoid normal/original auto-advance
         }
      }

      // Original filter for auto-advance questions
      if (!question.isMulti &&
            answer !== null &&
            currentStep === lastAnsweredStep &&
            currentStep < currentQuestions.length - 1) {
         setTimeout(() => {
            setCurrentStep(prev => prev + 1)
            setLastAnsweredStep(-1)
         }, 150)
      }
   }, [
      currentStep, 
      currentQuestions, 
      answers,
      lastAnsweredStep, 
      quizAlcohol, 
      getFilteredAfterQ2,
      setCurrentStep, 
      setLastAnsweredStep, 
      setAnswers, 
      setSkippedQ3
   ])
}