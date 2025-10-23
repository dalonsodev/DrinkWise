import React from "react"
import { useTranslation } from "react-i18next"
import ProgressIndicator from "../common/ProgressIndicator"
import Question from "../common/Question"
import Option from "../common/Option"
import QuizConfirmation from "./QuizConfirmation"
import useQuizLogic from "../../hooks/useQuizLogic"
import useCocktailLayout from "../../hooks/useCocktailLayout"
import NotFound from "../common/NotFound"

export default function Quiz() {
   const { t } = useTranslation()
   const {
      showConfirmation,
      quizAlcohol,
      currentStep,
      currentQuestions,
      filteredCocktails,
      handleQuizAlcoholToggle,
      handleStartQuiz,
      getIsSelected,
      handleOptionSelect,
      handlePrevStep,
      handleNextStep,
      isResultsBtnDisabled
   } = useQuizLogic()

   function renderQuestion() {
      const question = currentQuestions[currentStep] || { options: [], isMulti: false }
      return (
         <Question question={question.text}>
            {question.options.map((opt, idx) => (
               <Option 
                  key={idx}
                  option={opt}
                  selected={getIsSelected(question, opt)}
                  onSelect={() => handleOptionSelect(opt, currentStep)}
                  isMulti={question.isMulti}
               />
            ))}
         </Question>
      )
   }
   
   const { items, hasResults } = useCocktailLayout(filteredCocktails)

   function renderResults() {
      return (
         <div className="results-container">
            <h2>
               <span
                  className="cocktail-count-number cocktail-count-number-results"
               >{items?.length}</span> 
               Resultados
            </h2>
            <div className="cocktail-list carousel">
               {hasResults ? items : <NotFound />}
            </div>
         </div>
      )
   }

   return (
      <section className={`page quiz-page ${currentStep === currentQuestions.length ? "results-active" : ""}`}>
         <div className="quiz-container">
            {showConfirmation ? (
               <>
                  <h1 className="quiz-title sr-only">Quiz page</h1>
                  <QuizConfirmation 
                     quizAlcohol={quizAlcohol}
                     onToggle={handleQuizAlcoholToggle}
                     onStart={handleStartQuiz}
                  />
               </>
               ) : (
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
         </div>
      </section>
   )
}