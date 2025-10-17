import React, { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import cocktails from "../data/cocktails.json"
import { useTranslation } from "react-i18next"
import DrinkCard from "../components/features/DrinkCard"
import NotFound from "../components/common/NotFound"

export default function Menu() {
   const { t } = useTranslation()
   const [searchParams, setSearchParams] = useSearchParams()
   
   const alcoholFilter = searchParams.get("hasAlcohol") || "true"
   const categoryFilter = searchParams.get("category")
   const spiritFilter = searchParams.get("spirit")

   useEffect(() => {
      if (!searchParams.get("hasAlcohol")) {
         setSearchParams({ hasAlcohol: "true" }, { replace: true })
      }
   }, [searchParams, setSearchParams])

   if (!cocktails || !Array.isArray(cocktails)) {
      console.error("Error: cocktails data is not an array or is undefined")
      
      return <p>{t("menu.error")}</p>
   }

   const drinksToDisplay = cocktails.filter(cocktail => {
      const matchesAlcohol = cocktail.hasAlcohol === (alcoholFilter === "true")
      const matchesCategory = categoryFilter 
         ? cocktail.category === categoryFilter 
         : true
      const matchesSpirit = alcoholFilter === "true" && spiritFilter 
         ? cocktail.spirit === spiritFilter 
         : true
      
      return matchesAlcohol && matchesCategory && matchesSpirit
   })
   
   const cocktailEls = drinksToDisplay.map(cocktail => (
      <DrinkCard key={cocktail.id} cocktail={cocktail} />
   ))

   function handleAlcoholFilterChange() {
      const newAlcoholFilter = alcoholFilter === "true" ? "false" : "true"
      
      setSearchParams({ 
         hasAlcohol: newAlcoholFilter
      })
   }
   
   function handleCategoryFilterChange(value) {
      const hasAlcohol = searchParams.get("hasAlcohol")
      const spirit = searchParams.get("spirit")
      
      setSearchParams({ 
         hasAlcohol: hasAlcohol,
         category: value,
         ...(spirit && { spirit })
      })
   }
   
   function handleSpiritFilterChange(value) {
      const hasAlcohol = searchParams.get("hasAlcohol")
      const category = searchParams.get("category")
      
      setSearchParams({
         hasAlcohol: hasAlcohol,
         ...(category && { category }),
         spirit: value
      })
   }

   function handleClearFilters() {
      const hasAlcohol = searchParams.get("hasAlcohol")
      setSearchParams({ hasAlcohol })
   }

   return (
      <section className="menu-page">
         <h1 className="menu-title">{t("menu.title")}</h1>
         <div className="menu-filters">
            <div className="menu-filter-alcohol">
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
            </div>

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
                     {drinksToDisplay.length}
                  </span>
                  {t("menu.cocktailCount", { count: drinksToDisplay.length })}
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
         <div className="cocktail-list">
            {cocktailEls.length > 0 
               ? cocktailEls 
               : <NotFound />}
         </div>
      </section>
  );
}