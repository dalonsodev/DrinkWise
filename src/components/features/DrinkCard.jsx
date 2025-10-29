import React from "react"
import { useTranslation } from "react-i18next"

export default function DrinkCard({ cocktail }) {
   const { t } = useTranslation()
   const cocktailName = cocktail.name
   
   return (
      <article className="cocktail-card">
         <div className="cocktail-image-wrapper">
            <img 
               src={cocktail.image || cocktail.imageFallback}
               alt={`${cocktail.name} cocktail.`}
               className="cocktail-image"
               loading="lazy"
            />
            <div className="cocktail-overlay">
               <div className="cocktail-heading">
                  <h2 className="cocktail-name">{cocktailName}</h2>
                  <i className="cocktail-category">
                     {t(`category.${cocktailName}`)}
                  </i>
               </div>
               <p 
                  className="cocktail-description"
               >
                  {t(`description.${cocktailName}`) || cocktail.description}
               </p>
            </div>
         </div>
         {/* <div className="cocktail-content">
            <ul className="cocktail-ingredients">
               {cocktail.ingredients.map((ingredient, index) => (
                  <li key={index}>
                     {t(`ingredients.${ingredient}`) || ingredient}
                  </li>
               ))}
            </ul>
         </div> */}
      </article>
   )
}