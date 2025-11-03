import { useTranslation } from "react-i18next"
import MenuHeader from "../components/features/menu/MenuHeader"
import MenuContent from "../components/features/menu/MenuContent"
import cocktails from "../data/cocktails.json"
import useDrinkFiltering from "../hooks/useDrinkFiltering"
import useActiveCard from "../hooks/useActiveCard"

export default function Menu() {
   const { t } = useTranslation()
   const activeCard = useActiveCard()

   const {
      alcoholFilter,
      categoryFilter,
      spiritFilter,
      handleAlcoholFilterChange,
      handleCategoryFilterChange,
      handleSpiritFilterChange,
      handleClearFilters
   } = useDrinkFiltering(activeCard.deactivateCard)

   const drinksToDisplay = cocktails.filter(cocktail => {
      const matchesAlcohol = cocktail.hasAlcohol === alcoholFilter
      const matchesCategory = categoryFilter 
         ? cocktail.category === categoryFilter 
         : true
      const matchesSpirit = alcoholFilter && spiritFilter 
         ? cocktail.spirit === spiritFilter 
         : true
      
      return matchesAlcohol && matchesCategory && matchesSpirit
   })

   if (!cocktails || !Array.isArray(cocktails)) {
      console.error("Error: cocktails data is not an array or is undefined")
      return <p>{t("menu.error")}</p>
   }

   const hasResults = drinksToDisplay.length > 0

   return (
      <section className="menu-page">
         <a href="#cocktail-list" className="skip-link">{t("a11y.skipLink")}</a>
         <MenuHeader 
            alcoholFilter={alcoholFilter}
            onToggle={handleAlcoholFilterChange}
            t={t}
         />
         <MenuContent 
            drinks={drinksToDisplay}
            hasResults={hasResults}
            alcoholFilter={alcoholFilter}
            categoryFilter={categoryFilter}
            spiritFilter={spiritFilter}
            handleClearFilters={handleClearFilters}
            handleCategoryFilterChange={handleCategoryFilterChange}
            handleAlcoholFilterChange={handleAlcoholFilterChange}
            handleSpiritFilterChange={handleSpiritFilterChange}
            t={t}
            activeCard={activeCard}
         />
      </section>
  );
}