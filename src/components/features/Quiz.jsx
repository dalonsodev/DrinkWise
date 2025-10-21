import React from "react"
import ProgressIndicator from "../common/ProgressIndicator"
import Question from "../common/Question"
import Option from "../common/Option"
import QuizConfirmation from "./QuizConfirmation"
import useQuizLogic from "../../hooks/useQuizLogic"

export default function Quiz() {
   const {
      showConfirmation,
      quizAlcohol,
      answers,
      currentStep,
      currentQuestions,
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

   function renderResults() {
      return (
         <div>
            Resultados aquí (answers: {JSON.stringify(answers)})
         </div>
      )
   }

   return (
      <section className="page quiz-page">
         <h1>Quiz page</h1>
         <div className="quiz-container">
            {showConfirmation ? (
               <QuizConfirmation 
                  quizAlcohol={quizAlcohol}
                  onToggle={handleQuizAlcoholToggle}
                  onStart={handleStartQuiz}
               />
               ) : (
                  <>
                     <ProgressIndicator 
                        progress={(currentStep + 1) / currentQuestions.length} 
                     />

                     {currentStep > 0 && (
                        <button 
                           className="quiz-prev-btn"
                           onClick={handlePrevStep}
                        >
                           ‹ Volver
                        </button>
                     )}

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
                              Ver resultados
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