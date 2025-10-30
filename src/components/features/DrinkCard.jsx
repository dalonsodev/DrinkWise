import React, { useState, useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"

export default function DrinkCard({ cocktail, isActive, onToggle }) {
   const { t } = useTranslation()
   const [isExpanded, setIsExpanded] = useState(false)
   const cardRef = useRef(null)

   useEffect(() => {
      setIsExpanded(isActive)
   }, [isActive])

   function handleToggle(e) {
      e.stopPropagation()
      onToggle?.()
      setIsExpanded(prev => !prev)
   }

   useEffect(() => {
      const handleClickOutside = (e) => {
         if (cardRef.current && !cardRef.current.contains(e.target) && isExpanded) {
            setIsExpanded(false)
         }
      }

      if (isExpanded) {
         document.addEventListener("click", handleClickOutside)
      }

      return () => {
         document.removeEventListener("click", handleClickOutside)
      }
   }, [isExpanded])

   function handleKeyDown(e) {
      if (e.key === " " || e.key === "Enter") {
         e.preventDefault()
         handleToggle(e)
      }
   }

   function getIngredients() {
      return cocktail.ingredients.map(ing => t(`ingredients.${ing}`)).join(", ")
   }

   function getAllergens() {
      return cocktail.allergens.map(all => t(`allergens.${all}`)).join(", ")
   }
   
   return (
      <article 
         ref={cardRef}
         className={`cocktail-card ${isExpanded ? "expanded" : ""}`}
         onClick={handleToggle}
         onKeyDown={handleKeyDown}
         tabIndex="0"
         role="button"
         aria-expanded={isExpanded}
      >
         <div className="cocktail-image-wrapper">
            <img 
               src={cocktail.image || cocktail.imageFallback}
               alt={`${cocktail.name} cocktail.`}
               className="cocktail-image"
               loading="lazy"
            />
            <div className="cocktail-overlay">
               <div className="cocktail-heading">
                  <h2 className="cocktail-name">{cocktail.name}</h2>

                  {!isExpanded && (
                     <i className="cocktail-category">
                        {t(`category.${cocktail.name}`)}
                     </i>
                  )}

                  <p className="cocktail-description">
                     {t(`description.${cocktail.name}`) || cocktail.description}
                  </p>

                  <div className="cocktail-content">
                     <p className="cocktail-details">
                        <span className="cocktail-details-label">
                           {t("drinkCard.ingredientsLabel")}:{" "}
                        </span>
                        {getIngredients()}
                     </p>
                     <p className="cocktail-details">
                        <span className="cocktail-details-label">
                           {t("drinkCard.allergensLabel")}:{" "} 
                        </span>
                        {getAllergens()}
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </article>
   )
}