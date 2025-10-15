import React from "react"
import useLazyBackground from "../../hooks/useLazyBackground"

export default function DrinkCard({ cocktail }) {
   const [background, ref] = useLazyBackground(cocktail.image)
   
   return (
      <article className="cocktail-card">
         <div
            ref={ref}
            className="cocktail-image"
            style={{ backgroundImage: background }}
         >
            <div className="cocktail-overlay">
               <h2 className="cocktail-name">{cocktail.name}</h2>
               <p className="cocktail-description">{cocktail.description}</p>
            </div>
         </div>
         <div className="cocktail-content">
            <ul className="cocktail-ingredients">
               {cocktail.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
               ))}
            </ul>
         </div>
      </article>
   )
}