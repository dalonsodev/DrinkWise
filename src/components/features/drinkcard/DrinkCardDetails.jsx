export default function DrinkCardDetails({ cocktail, t }) {
   const ingredients = cocktail.ingredients
      .map(ingre => (t(`ingredients.${ingre}`))).join(", ")

   const allergens = cocktail.allergens
      .map(aller => (t(`allergens.${aller}`))).join(", ")

   return (
      <div className="cocktail-content">
         <p className="cocktail-details">
            <span className="cocktail-details-label">
               {t("drinkCard.ingredientsLabel")}:{" "}
            </span>
            {ingredients}
         </p>
         <p className="cocktail-details">
            <span className="cocktail-details-label">
               {t("drinkCard.allergensLabel")}:{" "} 
            </span>
            {allergens}
         </p>
      </div>
   )
}