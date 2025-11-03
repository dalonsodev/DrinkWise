import { useCallback } from "react"

export default function useQ3Options(
   currentStep,
   quizAlcohol,
   getFilteredAfterQ2
) {
   return useCallback(() => {
      if (!quizAlcohol || currentStep !== 2) return []

      const filteredAfterQ2 = getFilteredAfterQ2()
      if (filteredAfterQ2.length < 2) return []

      const spiritsCounts = {}
      filteredAfterQ2.forEach(cocktail => {
         const spirit = cocktail.spirit
         spiritsCounts[spirit] = (spiritsCounts[spirit] || 0) + 1
      })

      let validSpirits = Object.keys(spiritsCounts)
         .filter(spirit => spiritsCounts[spirit] >= 1)

      return validSpirits.sort((a, b) => {
            if (a === "Others") return 1
            if (b === "Others") return -1
            return a.localeCompare(b)
         })
   }, [quizAlcohol, currentStep, getFilteredAfterQ2])
}