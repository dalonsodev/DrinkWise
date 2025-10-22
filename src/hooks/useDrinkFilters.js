import { useState } from "react"

export default function useDrinkFilters() {
   const [alcoholFilter, setAlcoholFilter] = useState(true)
   const [categoryFilter, setCategoryFilter] = useState("")
   const [spiritFilter, setSpiritFilter] = useState("")

   function handleAlcoholFilterChange() {
      setAlcoholFilter(prev => !prev)
      setCategoryFilter("")
      setSpiritFilter("")
   }
   
   function handleCategoryFilterChange(category) {
      setCategoryFilter(prev => (prev === category ? "" : category))
   }
   
   function handleSpiritFilterChange(spirit) {
      setSpiritFilter(prev => (prev === spirit ? "" : spirit))
   }

   function handleClearFilters() {
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