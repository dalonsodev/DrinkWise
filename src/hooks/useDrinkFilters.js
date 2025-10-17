import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"

export default function useDrinkFilters() {
   const [searchParams, setSearchParams] = useSearchParams()
   const alcoholFilter = searchParams.get("hasAlcohol") || "true"
   const categoryFilter = searchParams.get("category")
   const spiritFilter = searchParams.get("spirit")

   useEffect(() => {
      if (!searchParams.get("hasAlcohol")) {
         setSearchParams({ hasAlcohol: "true" }, { replace: true })
      }
   }, [searchParams, setSearchParams])

   function handleAlcoholFilterChange() {
      const newAlcoholFilter = alcoholFilter === "true" ? "false" : "true"
      
      setSearchParams({ 
         hasAlcohol: newAlcoholFilter
      })
   }
   
   function handleCategoryFilterChange(value) {
      const hasAlcohol = searchParams.get("hasAlcohol")
      const spirit = searchParams.get("spirit")
      
      setSearchParams({ 
         hasAlcohol: hasAlcohol,
         category: value,
         ...(spirit && { spirit })
      })
   }
   
   function handleSpiritFilterChange(value) {
      const hasAlcohol = searchParams.get("hasAlcohol")
      const category = searchParams.get("category")
      
      setSearchParams({
         hasAlcohol: hasAlcohol,
         ...(category && { category }),
         spirit: value
      })
   }

   function handleClearFilters() {
      const hasAlcohol = searchParams.get("hasAlcohol")
      setSearchParams({ hasAlcohol })
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