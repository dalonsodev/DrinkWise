import React from "react"
import { useTranslation } from "react-i18next"

export default function FilterControls({
   alcoholFilter,
   categoryFilter,
   spiritFilter,
   handleClearFilters,
   handleCategoryFilterChange,
   handleSpiritFilterChange,
   drinksToDisplayLength
}) {
   const { t } = useTranslation()

   return (
      <div className="menu-filters">
         {alcoholFilter && 
            <div className="menu-filter menu-filter-flavour">
               <p className="menu-filter-label">{t("menu.filter.flavorProfile")}:</p>
               <button 
                  onClick={() => handleCategoryFilterChange("sweetAndFruity")}
                  className={`menu-filter-btn ${categoryFilter === "sweetAndFruity" 
                     ? "active" 
                     : ""}`}
               >
                  {t("category.sweetAndFruity")}
               </button>

               <button 
                  onClick={() => handleCategoryFilterChange("refreshingAndLight")}
                  className={`menu-filter-btn ${categoryFilter === "refreshingAndLight" 
                     ? "active" 
                     : ""}`}
               >
                  {t("category.refreshingAndLight")}
               </button>

               <button 
                  onClick={() => handleCategoryFilterChange("boldAndClassic")}
                  className={`menu-filter-btn ${categoryFilter === "boldAndClassic" 
                     ? "active" 
                     : ""}`}
               >
                  {t("category.boldAndClassic")}
               </button>
            </div>
         }
         {!alcoholFilter && 
            <div className="menu-filter menu-filter-flavour">
               <p className="menu-filter-label">{t("menu.filter.flavorProfile")}:</p>
               <button 
                  onClick={() => handleCategoryFilterChange("citrus")}
                  className={`menu-filter-btn 
                     ${categoryFilter === "citrus" ? "active" : ""}`}
                  aria-pressed={categoryFilter === "citrus"}
               >
                  {t("category.citrus")}
               </button>

               <button 
                  onClick={() => handleCategoryFilterChange("fruity")}
                  className={`menu-filter-btn 
                     ${categoryFilter === "fruity" ? "active" : ""}`}
                  aria-pressed={categoryFilter === "fruity"}
               >
                  {t("category.fruity")}
               </button>

               <button 
                  onClick={() => handleCategoryFilterChange("herbal")}
                  className={`menu-filter-btn 
                     ${categoryFilter === "herbal" ? "active" : ""}`}
                  aria-pressed={categoryFilter === "herbal"}
               >
                  {t("category.herbal")}
               </button>
            </div>
         }

         {alcoholFilter &&
            <>
               <div className="menu-filter menu-filter-spirit">
                  <p className="menu-filter-label">{t("menu.filter.mainSpirit")}:</p>
                  <button 
                     onClick={() => handleSpiritFilterChange("Whisky")}
                     className={`menu-filter-btn 
                        ${spiritFilter === "Whisky" ? "active" : ""}`}
                     aria-pressed={spiritFilter === "Whisky"}
                  >
                     {t("spirit.Whisky")}
                  </button>

                  <button 
                     onClick={() => handleSpiritFilterChange("Gin")}
                     className={`menu-filter-btn 
                        ${spiritFilter === "Gin" ? "active" : ""}`}
                     aria-pressed={spiritFilter === "Gin"}
                  >
                     {t("spirit.Gin")}
                  </button>

                  <button 
                     onClick={() => handleSpiritFilterChange("Vodka")}
                     className={`menu-filter-btn 
                        ${spiritFilter === "Vodka" ? "active" : ""}`}
                     aria-pressed={spiritFilter === "Vodka"}
                  >
                     {t("spirit.Vodka")}
                  </button>

                  <button 
                     onClick={() => handleSpiritFilterChange("Rum")}
                     className={`menu-filter-btn 
                        ${spiritFilter === "Rum" ? "active" : ""}`}
                     aria-pressed={spiritFilter === "Rum"}
                  >
                     {t("spirit.Rum")}
                  </button>

                  <button 
                     onClick={() => handleSpiritFilterChange("Tequila")}
                     className={`menu-filter-btn 
                        ${spiritFilter === "Tequila" ? "active" : ""}`}
                     aria-pressed={spiritFilter === "Tequila"}
                  >
                     {t("spirit.Tequila")}
                  </button>

                  <button 
                     onClick={() => handleSpiritFilterChange("Others")}
                     className={`menu-filter-btn 
                        ${spiritFilter === "Others" ? "active" : ""}`}
                     aria-pressed={spiritFilter === "Others"}
                  >
                     {t("spirit.Others")}
                  </button>
               </div>
            </>
         }
         <div className="clear-filters-container">
            <p className="cocktail-count">
               <span className="cocktail-count-number">
                  {drinksToDisplayLength}
               </span>
               {t("menu.cocktailCount", { count: drinksToDisplayLength })}
            </p>
            {categoryFilter || spiritFilter ? (
               <button
                  onClick={() => handleClearFilters()}
                  className="clear-filters-btn"   
               >
                  {t("menu.clearFilters")}
               </button>
            ) : null}
         </div>
      </div>
   )
}