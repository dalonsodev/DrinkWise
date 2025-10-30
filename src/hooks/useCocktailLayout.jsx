import React, { useState } from "react";
import DrinkCard from "../components/features/DrinkCard";
import { t } from "i18next";

export default function useCocktailLayout(cocktails) {
   const [activeIndex, setActiveIndex] = useState(null);

   const handleCardToggle = (index) => {
      setActiveIndex(index);
   };

   const items = cocktails.length > 0
      ? cocktails.map((cocktail, index) => {
           const toggleThisCard = () => handleCardToggle(index); // ← Capture index on the fly (avoid closure)
           return (
              <div
                 key={cocktail.id}
                 className="cocktail-card-wrapper carousel-item"
                 role="group"
                 aria-roledescription={t("a11y.cocktailRoleDesc")}
                 aria-label={`${index + 1} ${t("a11y.of")} ${cocktails.length}: ${cocktail.name}`}
              >
                 <DrinkCard
                    cocktail={cocktail}
                    isActive={activeIndex === index}
                    onToggle={toggleThisCard}
                 />
              </div>
           );
        })
      : null;

   return {
      items,
      hasResults: cocktails.length > 0,
      activeIndex
   };
}