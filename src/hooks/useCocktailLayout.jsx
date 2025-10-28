import React from "react"
import DrinkCard from "../components/features/DrinkCard"
import { t } from "i18next"

export default function useCocktailLayout(cocktails) {
const items = cocktails.length > 0 ? 
   cocktails.map((cocktail, index) => (
      <div 
         key={cocktail.id} 
         className="cocktail-card-wrapper carousel-item"
         role="group"
         aria-roledescription={t("a11y.cocktailRoleDesc")}
         aria-label={`${index + 1} ${t("a11y.of")} ${cocktails.length}: ${cocktail.name}`}
      >
         <DrinkCard cocktail={cocktail} />
      </div>
   )) : null

   return {
      items,
      hasResults: cocktails.length > 0
   }
}