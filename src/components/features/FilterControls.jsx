import React from "react"
import { useTranslation } from "react-i18next"
import ToggleAlcohol from "../common/ToggleAlcohol"

export default function FilterControls({
   alcoholFilter,
   categoryFilter,
   spiritFilter,
   handleClearFilters,
   handleAlcoholFilterChange,
   handleCategoryFilterChange,
   handleSpiritFilterChange,
   drinksToDisplayLength,
}) {
   const { t } = useTranslation()

   return (
      <div className="menu-filters">
         {/* <div className="menu-filter-alcohol">
            <label className="toggle-label">
               <input 
                  type="checkbox"
                  checked={alcoholFilter === "true"}
                  onChange={handleAlcoholFilterChange}
                  className="toggle-input"
               />
               <span className="toggle-slider"></span>
               <span className="toggle-text">
                  {t(`menu.filter.${alcoholFilter === "true" 
                     ? "withAlcohol" 
                     : "noAlcohol"}`
                  )}
               </span>
            </label>
         </div> */}
         <ToggleAlcohol 
            alcoholFilter={alcoholFilter}
            onToggle={handleAlcoholFilterChange}
         />

         <p className="menu-filter-label">{t("menu.filter.flavorProfile")}</p>
         {alcoholFilter === "true" && 
            <div className="menu-filter menu-filter-flavour">
               <button 
                  onClick={() => handleCategoryFilterChange("sweetAndFruity")}
                  className={`menu-filter-btn 
                     ${categoryFilter === "sweetAndFruity" ? "active" : ""}`}
               >
                  {t("category.sweetAndFruity")}
               </button>

               <button 
                  onClick={() => handleCategoryFilterChange("refreshingAndLight")}
                  className={`menu-filter-btn 
                     ${categoryFilter === "refreshingAndLight" ? "active" : ""}`}
               >
                  {t("category.refreshingAndLight")}
               </button>

               <button 
                  onClick={() => handleCategoryFilterChange("boldAndClassic")}
                  className={`menu-filter-btn 
                     ${categoryFilter === "boldAndClassic" ? "active" : ""}`}
               >
                  {t("category.boldAndClassic")}
               </button>
            </div>
         }
         {alcoholFilter === "false" && 
            <div className="menu-filter menu-filter-flavour">
               <button 
                  onClick={() => handleCategoryFilterChange("citrus")}
                  className={`menu-filter-btn 
                     ${categoryFilter === "citrus" ? "active" : ""}`}
               >
                  {t("category.citrus")}
               </button>

               <button 
                  onClick={() => handleCategoryFilterChange("fruity")}
                  className={`menu-filter-btn 
                     ${categoryFilter === "fruity" ? "active" : ""}`}
               >
                  {t("category.fruity")}
               </button>

               <button 
                  onClick={() => handleCategoryFilterChange("herbal")}
                  className={`menu-filter-btn 
                     ${categoryFilter === "herbal" ? "active" : ""}`}
               >
                  {t("category.herbal")}
               </button>
            </div>
         }

         {alcoholFilter === "true" &&
            <>
               <p className="menu-filter-label">{t("menu.filter.mainSpirit")}</p>
               <div className="menu-filter menu-filter-spirit">
                  <button 
                     onClick={() => handleSpiritFilterChange("Whisky")}
                     className={`menu-filter-btn 
                        ${spiritFilter === "Whisky" ? "active" : ""}`}
                  >
                     {t("spirit.Whisky")}
                  </button>

                  <button 
                     onClick={() => handleSpiritFilterChange("Gin")}
                     className={`menu-filter-btn 
                        ${spiritFilter === "Gin" ? "active" : ""}`}
                  >
                     {t("spirit.Gin")}
                  </button>

                  <button 
                     onClick={() => handleSpiritFilterChange("Vodka")}
                     className={`menu-filter-btn 
                        ${spiritFilter === "Vodka" ? "active" : ""}`}
                  >
                     {t("spirit.Vodka")}
                  </button>

                  <button 
                     onClick={() => handleSpiritFilterChange("Rum")}
                     className={`menu-filter-btn 
                        ${spiritFilter === "Rum" ? "active" : ""}`}
                  >
                     {t("spirit.Rum")}
                  </button>

                  <button 
                     onClick={() => handleSpiritFilterChange("Tequila")}
                     className={`menu-filter-btn 
                        ${spiritFilter === "Tequila" ? "active" : ""}`}
                  >
                     {t("spirit.Tequila")}
                  </button>

                  <button 
                     onClick={() => handleSpiritFilterChange("Others")}
                     className={`menu-filter-btn 
                        ${spiritFilter === "Others" ? "active" : ""}`}
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