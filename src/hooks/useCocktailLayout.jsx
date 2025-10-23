import React from "react"
import DrinkCard from "../components/features/DrinkCard"

export default function useCocktailLayout(cocktails) {
const items = cocktails.length > 0 ? 
   cocktails.map(cocktail => (
      <div 
         key={cocktail.id} 
         className="cocktail-card-wrapper carousel-item"
      >
         <DrinkCard cocktail={cocktail} />
      </div>
   )) : null

   return {
      items,
      hasResults: cocktails.length > 0
   }
}