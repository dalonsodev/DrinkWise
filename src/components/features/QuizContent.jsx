import React from "react"
import ProgressIndicator from "../common/ProgressIndicator"
import Question from "../common/Question"
import Option from "../common/Option"
import NotFound from "../common/NotFound"
import useCocktailLayout from "../../hooks/useCocktailLayout"

export default function QuizContent({
   currentStep,
   currentQuestions,
   quizAlcohol,
   q3DynamicOptions,
   filteredCocktails,
   getIsSelected,
   handleOptionSelect,
   handlePrevStep,
   handleNextStep,
   isResultsBtnDisabled,
   t
}) {
   const { items, hasResults } = useCocktailLayout(filteredCocktails)

   function renderQuestion() {
      const question = currentQuestions[currentStep] || { options: [], isMulti: false }
      const isQ3Alcohol = quizAlcohol && currentStep === 2

      const optionsToDisplay = isQ3Alcohol && q3DynamicOptions.length > 0
         ? q3DynamicOptions.map(spirit => ({
            value: spirit,
            label: t(`spirit.${spirit}`)
         }))
         : question.options

      return (
         <Question question={question.text}>
            {optionsToDisplay.map((item, idx) => {
               const opt = typeof item === "object" ? item.label : item
               const value = typeof item === "object" ? item.value : item

               return (
                  <Option 
                     key={idx}
                     option={opt}
                     selected={getIsSelected(question, value)}
                     onSelect={() => handleOptionSelect(value, currentStep)}
                     isMulti={question.isMulti}
                  />
               )
            })}
         </Question>
      )
   }

   function renderResults() {
      return (
         <div className="results-container">
            <p className="cocktail-count cocktail-count-results">
               <span
                  className="cocktail-count-number cocktail-count-number-results"
               >{items?.length}</span> 
               {t("menu.cocktailCountQuiz", { count: items?.length })}
            </p>
            <div 
               className="cocktail-list carousel"
               role="region"
               aria-label={t("a11y.carousel")}
               aria-roledescription={t("a11y.carouselRoleDesc")}
            >
               {hasResults ? items : <NotFound />}
            </div>
         </div>
      )
   }

   return (
      <>
         <div className="progress-wrapper">
            <ProgressIndicator 
               progress={(currentStep + 1) / currentQuestions.length} 
            />

            {currentStep > 0 && (
               <button 
                  className="quiz-prev-btn"
                  onClick={handlePrevStep}
               >
                  {t("quiz.back")}
               </button>
            )}
         </div>

         {currentStep < currentQuestions.length 
            ? renderQuestion() 
            : renderResults()
         }

         <div className="quiz-navigation">
            {currentStep === currentQuestions.length - 1 && (
               <button
                  className="btn-primary"
                  onClick={handleNextStep}
                  disabled={isResultsBtnDisabled()}
               >
                  {t("quiz.results")}
               </button>
            )}
         </div>
      </>
   )
}