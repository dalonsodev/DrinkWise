import React from "react"
import cocktails from "../data/cocktails.json"
import { useTranslation } from "react-i18next"
import FilterControls from "../components/features/FilterControls"
import NotFound from "../components/common/NotFound"
import ToggleAlcohol from "../components/common/ToggleAlcohol"
import useDrinkFilters from "../hooks/useDrinkFilters"
import useCocktailLayout from "../hooks/useCocktailLayout"

export default function Menu() {
   const { t } = useTranslation()
   const {
      alcoholFilter,
      categoryFilter,
      spiritFilter,
      handleAlcoholFilterChange,
      handleCategoryFilterChange,
      handleSpiritFilterChange,
      handleClearFilters
   } = useDrinkFilters()

   const drinksToDisplay = cocktails.filter(cocktail => {
      const matchesAlcohol = cocktail.hasAlcohol === alcoholFilter
      const matchesCategory = categoryFilter 
         ? cocktail.category === categoryFilter 
         : true
      const matchesSpirit = alcoholFilter && spiritFilter 
         ? cocktail.spirit === spiritFilter 
         : true
      
      return matchesAlcohol && matchesCategory && matchesSpirit
   })
   
   const { items, hasResults } = useCocktailLayout(drinksToDisplay)

   if (!cocktails || !Array.isArray(cocktails)) {
      console.error("Error: cocktails data is not an array or is undefined")
      return <p>{t("menu.error")}</p>
   }

   return (
      <section className="menu-page">
         <div className="menu-header">
            <h1 className="menu-title">{t("menu.title")}</h1>
            <ToggleAlcohol 
               alcoholFilter={alcoholFilter}
               onToggle={handleAlcoholFilterChange}
            />
         </div>
         <FilterControls 
            drinksToDisplayLength={drinksToDisplay.length}
            alcoholFilter={alcoholFilter}
            categoryFilter={categoryFilter}
            spiritFilter={spiritFilter}
            handleClearFilters={handleClearFilters}
            handleAlcoholFilterChange={handleAlcoholFilterChange}
            handleCategoryFilterChange={handleCategoryFilterChange}
            handleSpiritFilterChange={handleSpiritFilterChange}
         />
         <div className="cocktail-list carousel">
            {hasResults ? items : <NotFound />}
         </div>
      </section>
  );
}