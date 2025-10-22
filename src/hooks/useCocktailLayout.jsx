import React from "react"
import DrinkCard from "../components/features/DrinkCard"

export default function useCocktailLayout(cocktails) {
   const layout = {
      containerClass: `cocktail-list carousel`,
      wrapperClass: `cocktail-card-wrapper carousel-item`
   }

   const items = cocktails.length > 0 ? cocktails.map(cocktail => (
      <div key={cocktail.id} className={layout.wrapperClass}>
         <DrinkCard cocktail={cocktail} />
      </div>
   )) : null

   return {
      layout,
      items,
      hasResults: cocktails.length > 0
   }
}