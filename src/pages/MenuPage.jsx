import React, { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import cocktails from "../data/cocktails.json"
import { useTranslation } from "react-i18next"
import DrinkCard from "../components/features/DrinkCard"


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

   console.log(drinksToDisplay.length)

   const cocktailEls = drinksToDisplay.map(cocktail => (
      <DrinkCard key={cocktail.id} cocktail={cocktail} />
   ))

   function handleAlcoholFilterChange() {
      const category = searchParams.get("category")
      const newAlcoholFilter = alcoholFilter === "true" ? "false" : "true"
      setSearchParams({ 
         hasAlcohol: newAlcoholFilter,
         ...(category && { category }),
         ...(newAlcoholFilter === "true" && spiritFilter && { spirit: spiritFilter })
      })
   }
   
   function handleCategoryFilterChange(value) {
      const hasAlcohol = searchParams.get("hasAlcohol")
      setSearchParams({ 
         category: value,
         hasAlcohol: hasAlcohol
      })
   }
   
   function handleSpiritFilterChange(value) {
      const category = searchParams.get("category")
      const hasAlcohol = searchParams.get("hasAlcohol")
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

            <p className="menu-filter-label">Flavour profile</p>
            {alcoholFilter === "true" && 
               <div className="menu-filter menu-filter-flavour">
                  <button 
                     className={`menu-filter-btn 
                        ${categoryFilter === "Sweet and Fruity" ? "active" : ""}`}
                     onClick={() => handleCategoryFilterChange("Sweet and Fruity")}
                  >Sweet & Fruity</button>

                  <button 
                     className={`menu-filter-btn 
                        ${categoryFilter === "Refreshing and Light" ? "active" : ""}`}
                     onClick={() => handleCategoryFilterChange("Refreshing and Light")}
                  >Refreshing & Light</button>

                  <button 
                     className={`menu-filter-btn 
                        ${categoryFilter === "Bold and Classic" ? "active" : ""}`}
                     onClick={() => handleCategoryFilterChange("Bold and Classic")}
                  >Bold & Classic</button>
               </div>
            }
            {alcoholFilter === "false" && 
               <div className="menu-filter menu-filter-flavour">
                  <button 
                     className="menu-filter-btn"
                  >Citrus</button>
                  <button 
                     className="menu-filter-btn"
                  >Fruity</button>
                  <button 
                     className="menu-filter-btn"
                  >Herbal</button>
               </div>
            }

            {alcoholFilter === "true" &&
               <>
                  <p className="menu-filter-label">Main spirit</p>
                  <div className="menu-filter menu-filter-spirit">
                     <button 
                        className="menu-filter-btn"
                        onClick={() => handleSpiritFilterChange("Whiskey")}
                     >Whiskey</button>
                     <button 
                        className="menu-filter-btn"
                        onClick={() => handleSpiritFilterChange("Gin")}
                     >Gin</button>
                     <button 
                        className="menu-filter-btn"
                        onClick={() => handleSpiritFilterChange("Vodka")}
                     >Vodka</button>
                     <button 
                        className="menu-filter-btn"
                        onClick={() => handleSpiritFilterChange("Rum")}
                     >Rum</button>
                     <button 
                        className="menu-filter-btn"
                        onClick={() => handleSpiritFilterChange("Tequila")}
                     >Tequila</button>
                     <button 
                        className="menu-filter-btn"
                        onClick={() => handleSpiritFilterChange("Others")}
                     >Others</button>
                  </div>
               </>
            }

         </div>
         <div className="cocktail-list">
            {cocktailEls}
         </div>
      </section>
  );
}