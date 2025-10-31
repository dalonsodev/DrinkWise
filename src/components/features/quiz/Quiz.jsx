import { useTranslation } from "react-i18next"
import QuizConfirmation from "../quiz/QuizConfirmation"
import useQuizLogic from "../../../hooks/useQuizLogic"
import QuizContent from "./QuizContent"

export default function Quiz() {
   const { t } = useTranslation()
   const {
      showConfirmation,
      quizAlcohol,
      currentStep,
      currentQuestions,
      filteredCocktails,
      q3DynamicOptions,
      handleQuizAlcoholToggle,
      handleStartQuiz,
      getIsSelected,
      handleOptionSelect,
      handlePrevStep,
      handleNextStep,
      isResultsBtnDisabled
   } = useQuizLogic()

   return (
      <section className={`page quiz-page ${currentStep === currentQuestions.length 
         ? "results-active" 
         : ""}`}>
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
                  <QuizContent 
                     currentStep={currentStep}
                     currentQuestions={currentQuestions}
                     quizAlcohol={quizAlcohol}
                     q3DynamicOptions={q3DynamicOptions}
                     filteredCocktails={filteredCocktails}
                     getIsSelected={getIsSelected}
                     handleOptionSelect={handleOptionSelect}
                     handlePrevStep={handlePrevStep}
                     handleNextStep={handleNextStep}
                     isResultsBtnDisabled={isResultsBtnDisabled}
                     t={t}
                  />
               )
            }
         </div>
      </section>
   )
}