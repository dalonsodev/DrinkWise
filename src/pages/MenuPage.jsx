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
                     className={`menu-filter-btn 
                        ${categoryFilter === "sweetAndFruity" ? "active" : ""}`}
                     onClick={() => handleCategoryFilterChange("sweetAndFruity")}
                  >{t("category.sweetAndFruity")}</button>

                  <button 
                     className={`menu-filter-btn 
                        ${categoryFilter === "refreshingAndLight" ? "active" : ""}`}
                     onClick={() => handleCategoryFilterChange("refreshingAndLight")}
                  >{t("category.refreshingAndLight")}</button>

                  <button 
                     className={`menu-filter-btn 
                        ${categoryFilter === "boldAndClassic" ? "active" : ""}`}
                     onClick={() => handleCategoryFilterChange("boldAndClassic")}
                  >{t("category.boldAndClassic")}</button>
               </div>
            }
            {alcoholFilter === "false" && 
               <div className="menu-filter menu-filter-flavour">
                  <button 
                     className={`menu-filter-btn ${categoryFilter === "citrus" ? "active" : ""}`}
                     onClick={() => handleCategoryFilterChange("citrus")}
                  >{t("category.citrus")}</button>
                  <button 
                     className={`menu-filter-btn ${categoryFilter === "fruity" ? "active" : ""}`}
                     onClick={() => handleCategoryFilterChange("fruity")}
                  >{t("category.fruity")}</button>
                  <button 
                     className={`menu-filter-btn ${categoryFilter === "herbal" ? "active" : ""}`}
                     onClick={() => handleCategoryFilterChange("herbal")}
                  >{t("category.herbal")}</button>
               </div>
            }

            {alcoholFilter === "true" &&
               <>
                  <p className="menu-filter-label">{t("menu.filter.mainSpirit")}</p>
                  <div className="menu-filter menu-filter-spirit">
                     <button 
                        className={`menu-filter-btn ${spiritFilter === "Whisky" ? "active" : ""}`}
                        onClick={() => handleSpiritFilterChange("Whisky")}
                     >{t("spirit.Whisky")}</button>
                     <button 
                        className={`menu-filter-btn ${spiritFilter === "Gin" ? "active" : ""}`}
                        onClick={() => handleSpiritFilterChange("Gin")}
                     >{t("spirit.Gin")}</button>
                     <button 
                        className={`menu-filter-btn ${spiritFilter === "Vodka" ? "active" : ""}`}
                        onClick={() => handleSpiritFilterChange("Vodka")}
                     >{t("spirit.Vodka")}</button>
                     <button 
                        className={`menu-filter-btn ${spiritFilter === "Rum" ? "active" : ""}`}
                        onClick={() => handleSpiritFilterChange("Rum")}
                     >{t("spirit.Rum")}</button>
                     <button 
                        className={`menu-filter-btn ${spiritFilter === "Tequila" ? "active" : ""}`}
                        onClick={() => handleSpiritFilterChange("Tequila")}
                     >{t("spirit.Tequila")}</button>
                     <button 
                        className={`menu-filter-btn ${spiritFilter === "Others" ? "active" : ""}`}
                        onClick={() => handleSpiritFilterChange("Others")}
                     >{t("spirit.Others")}</button>
                  </div>
               </>
            }

         </div>
         <div className="cocktail-list">
            {cocktailEls.length > 0 
               ? cocktailEls 
               : <NotFound />}
         </div>
      </section>
  );
}