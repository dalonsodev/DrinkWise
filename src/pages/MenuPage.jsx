import React from "react"
import cocktails from "../data/cocktails.json"
import { useTranslation } from "react-i18next"
import DrinkCard from "../components/features/DrinkCard"

export default function Menu() {
   const { t } = useTranslation()
   
   function getCocktails(cocktails) {
      if (!cocktails || !Array.isArray(cocktails)) {
         console.error("Error: cocktails data is not an array or is undefined")
         
         return <p>{t("menu.error")}</p>
      }

      return cocktails.map(cocktail => (
         <DrinkCard key={cocktail.id} cocktail={cocktail} />
      ))
   }

   return (
      <section className="menu-page">
         <h1 className="menu-title">{t("menu.title")}</h1>
         <div className="cocktail-list">
            {getCocktails(cocktails)}
         </div>
      </section>
  );
}