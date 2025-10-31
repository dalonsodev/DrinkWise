import React from "react"

export default function FiltersFooter({
   drinksToDisplayLength,
   hasActiveFilters,
   onClearFilters,
   t
}) {
   return (
      <div className="clear-filters-container">
         <p className="cocktail-count">
            <span className="cocktail-count-number">{drinksToDisplayLength}</span>
            {t("menu.cocktailCount", { count: drinksToDisplayLength })}
         </p>
         {hasActiveFilters && (
            <button
               onClick={() => onClearFilters()}
               className="clear-filters-btn"   
            >
               {t("menu.clearFilters")}
            </button>
         )}
      </div>
   )
}