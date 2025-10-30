import React from "react"
import useActiveCard from "../../hooks/useActiveCard"
import DrinkCard from "../features/DrinkCard"
import { t } from "i18next"

export default function CocktailCarousel({ cocktails }) {
   const { activeIndex, activateCard } = useActiveCard()

   if (!cocktails || cocktails.length === 0) {
      return null
   }

   function renderCocktail(cocktail, index) {
      const toggleCard = () => activateCard(index)
      
      return (
         <div
            key={cocktail.id}
            className="cocktail-card-wrapper carousel-item"
            role="group"
            aria-roledescription={t("a11y.cocktailRoleDesc")}
            aria-label={`${index + 1} ${t("a11y.of")} ${cocktails.length}: ${cocktail.name}`}
         >
            <DrinkCard
               cocktail={cocktail}
               isActive={activeIndex === index}
               onToggle={toggleCard}
            />
         </div>
      )
   }

   const items = cocktails.map(renderCocktail)

   return (
      <>{items}</>
   )
}