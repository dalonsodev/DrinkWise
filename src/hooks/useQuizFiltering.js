import { useCallback } from "react"
import cocktails from "../data/cocktails.json"

export default function useQuizFiltering(answers, quizAlcohol, standardizeAnswer) {
   const getFilteredAfterQ2 = useCallback(() => {
      if (answers[0] === null || answers[1] === null) return []
      const q1 = standardizeAnswer(answers[0])
      const q2 = standardizeAnswer(answers[1])
      
      return cocktails.filter(cocktail => {
         if (!cocktail.hasAlcohol) return false
         const matchesOccasion = cocktail.occasion.includes(q1)
         const matchesCategory = cocktail.category === q2
         
         return matchesOccasion && matchesCategory
      })
   }, [answers, standardizeAnswer])

   const filterCocktails = useCallback(() => {
      if (!answers.every(answer => answer !== undefined)) return []

      const [q1, q2, q3] = answers.map(standardizeAnswer)

      return cocktails.filter(cocktail => {
         if (cocktail.hasAlcohol !== quizAlcohol) return false
         if (quizAlcohol) {
            return cocktail.occasion.includes(q1) &&
               cocktail.category === q2 &&
               (!q3 || q3.includes(cocktail.spirit))
         } else {
            return (!q1 || cocktail.category === q1) && 
               (!q2 || cocktail.texture === q2)
         }
      })
   }, [answers, quizAlcohol, standardizeAnswer])

   return { getFilteredAfterQ2, filterCocktails }
}