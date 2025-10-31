import CocktailCarousel from "../../common/CocktailCarousel"
import NotFound from "../../common/NotFound"

export default function QuizResults({ cocktails, t }) {
   const hasResults = cocktails.length > 0

   return (
      <div className="results-container">
         <p className="cocktail-count cocktail-count-results">
            <span
               className="cocktail-count-number cocktail-count-number-results"
            >{cocktails.length}</span>
            {t("menu.cocktailCountQuiz", { count: cocktails.length })}
         </p>
         <div 
            className="cocktail-list carousel"
            role="region"
            aria-label={t("a11y.carousel")}
            aria-roledescription={t("a11y.carouselRoleDesc")}
         >
            {hasResults 
               ? <CocktailCarousel cocktails={cocktails} /> 
               : <NotFound />
            }
         </div>
      </div>
   )
}