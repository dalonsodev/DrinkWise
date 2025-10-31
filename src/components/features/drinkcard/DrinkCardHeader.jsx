import React from "react"

export default function DrinkCardHeader({ name, isExpanded, t }) {
   return (
      <>
         <h2 className="cocktail-name">{name}</h2>
         {!isExpanded && (
            <i className="cocktail-category">
               {t(`category.${name}`)}
            </i>
         )}
      </>
   )
}