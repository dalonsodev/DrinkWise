import React, { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import cocktails from "../data/cocktails.json"
import { useTranslation } from "react-i18next"
import DrinkCard from "../components/features/DrinkCard"


export default function Menu() {
   const { t } = useTranslation()
   const [searchParams, setSearchParams] = useSearchParams()
   
   const alcoholFilter = searchParams.get("hasAlcohol") || "true"

   useEffect(() => {
      if (!searchParams.get("hasAlcohol")) {
         setSearchParams({ hasAlcohol: "true" }, { replace: true })
      }
   }, [searchParams, setSearchParams])

   if (!cocktails || !Array.isArray(cocktails)) {
      console.error("Error: cocktails data is not an array or is undefined")
      
      return <p>{t("menu.error")}</p>
   }

   const drinksToDisplay = alcoholFilter === "true"
      ? cocktails.filter(cocktail => cocktail.hasAlcohol === true)
      : cocktails.filter(cocktail => cocktail.hasAlcohol === false)

   console.log(drinksToDisplay.length)

   const cocktailEls = drinksToDisplay.map(cocktail => (
      <DrinkCard key={cocktail.id} cocktail={cocktail} />
   ))

   function handleFilterChange() {
      setSearchParams({ hasAlcohol: alcoholFilter === "true" ? "false" : "true"})
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
                     onChange={handleFilterChange}
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
            <div className="menu-filter menu-filter-flavour">
               <button className="menu-filter-btn">Sweet & Fruity</button>
               <button className="menu-filter-btn">Refreshing & Light</button>
               <button className="menu-filter-btn">Bold & Classic</button>
            </div>

            <p className="menu-filter-label">Main spirit</p>
            <div className="menu-filter menu-filter-spirit">
               <button className="menu-filter-btn">Whiskey</button>
               <button className="menu-filter-btn">Gin</button>
               <button className="menu-filter-btn">Vodka</button>
               <button className="menu-filter-btn">Rum</button>
               <button className="menu-filter-btn">Tequila</button>
               <button className="menu-filter-btn">Others</button>
            </div>

         </div>
         <div className="cocktail-list">
            {cocktailEls}
         </div>
      </section>
  );
}