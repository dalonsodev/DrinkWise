import React from "react"
import ProgressIndicator from "../../common/ProgressIndicator"
import Question from "../../common/Question"
import Option from "../../common/Option"
import NotFound from "../../common/NotFound"
import CocktailCarousel from "../../common/CocktailCarousel"
import QuizProgress from "./QuizProgress"

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
      const hasResults = filteredCocktails.length > 0
      return (
         <div className="results-container">
            <p className="cocktail-count cocktail-count-results">
               <span
                  className="cocktail-count-number cocktail-count-number-results"
               >{filteredCocktails.length}</span> 
               {t("menu.cocktailCountQuiz", { count: filteredCocktails.length })}
            </p>
            <div 
               className="cocktail-list carousel"
               role="region"
               aria-label={t("a11y.carousel")}
               aria-roledescription={t("a11y.carouselRoleDesc")}
            >
               {hasResults 
                  ? <CocktailCarousel cocktails={filteredCocktails} /> 
                  : <NotFound />
               }
            </div>
         </div>
      )
   }

   return (
      <>
         <QuizProgress 
            currentStep={currentStep}
            totalSteps={currentQuestions.length}
            onPrev={handlePrevStep}
         />

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