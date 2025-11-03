import { useState } from "react"

export default function useDrinkFiltering(deactivateCard) {
   const [alcoholFilter, setAlcoholFilter] = useState(true)
   const [categoryFilter, setCategoryFilter] = useState("")
   const [spiritFilter, setSpiritFilter] = useState("")

   function handleAlcoholFilterChange() {
      deactivateCard?.()
      setAlcoholFilter(prev => !prev)
      setCategoryFilter("")
      setSpiritFilter("")
   }
   
   function handleCategoryFilterChange(category) {
      deactivateCard?.()
      setCategoryFilter(prev => (prev === category ? "" : category))
   }
   
   function handleSpiritFilterChange(spirit) {
      deactivateCard?.()
      setSpiritFilter(prev => (prev === spirit ? "" : spirit))
   }

   function handleClearFilters() {
      deactivateCard?.()
      setCategoryFilter("")
      setSpiritFilter("")
   }

   return {
      alcoholFilter,
      categoryFilter,
      spiritFilter,
      handleAlcoholFilterChange,
      handleCategoryFilterChange,
      handleSpiritFilterChange,
      handleClearFilters
   }
}