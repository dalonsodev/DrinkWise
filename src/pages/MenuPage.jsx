import React from "react"
import cocktails from "../data/cocktails.json"
import { useTranslation } from "react-i18next"
import DrinkCard from "../components/features/DrinkCard"
import FilterControls from "../components/features/FilterControls"
import NotFound from "../components/common/NotFound"
import useDrinkFilters from "../hooks/useDrinkFilters"

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

   if (!cocktails || !Array.isArray(cocktails)) {
      console.error("Error: cocktails data is not an array or is undefined")
      
      return <p>{t("menu.error")}</p>
   }

   const drinksToDisplay = cocktails.filter(cocktail => {
      const matchesAlcohol = cocktail.hasAlcohol === (alcoholFilter === "true")
      const matchesCategory = categoryFilter 
         ? cocktail.category === categoryFilter 
         : true
      const matchesSpirit = alcoholFilter === "true" && spiritFilter 
         ? cocktail.spirit === spiritFilter 
         : true
      
      return matchesAlcohol && matchesCategory && matchesSpirit
   })
   
   const cocktailEls = drinksToDisplay.map(cocktail => (
      <DrinkCard key={cocktail.id} cocktail={cocktail} />
   ))

   return (
      <section className="menu-page">
         <h1 className="menu-title">{t("menu.title")}</h1>
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
         <div className="cocktail-list">
            {cocktailEls.length > 0 
               ? cocktailEls 
               : <NotFound />}
         </div>
      </section>
  );
}