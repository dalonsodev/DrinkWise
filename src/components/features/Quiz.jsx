import React, { useState, useEffect } from "react"
import questionsWithAlcohol from "../../data/questions/withAlcohol"
import questionsNoAlcohol from "../../data/questions/noAlcohol"
import ProgressIndicator from "../common/ProgressIndicator"
import Question from "../common/Question"
import Option from "../common/Option"
import QuizConfirmation from "./QuizConfirmation"

export default function Quiz() {
   const [showConfirmation, setShowConfirmation] = useState(true)
   const [quizAlcohol, setQuizAlcohol] = useState(true)
   const [answers, setAnswers] = useState([])
   const [currentStep, setCurrentStep] = useState(0)
   const [lastAnsweredStep, setLastAnsweredStep] = useState(-1)
   
   const currentQuestions = quizAlcohol ? questionsWithAlcohol : questionsNoAlcohol

   useEffect(() => {
      if (currentStep < currentQuestions.length) {
         const question = currentQuestions[currentStep] || { isMulti: false }
         const answer = answers[currentStep]
         if (!question.isMulti &&
               answer !== null &&
               currentStep === lastAnsweredStep &&
               currentStep < currentQuestions.length - 1) {
            setTimeout(() => {
               handleNextStep()
               setLastAnsweredStep(-1)
            }, 150)
         }
      }
   }, [answers, currentStep, currentQuestions, lastAnsweredStep])

   function handleQuizAlcoholToggle() {
      setQuizAlcohol(prev => !prev)
   }

   function handleStartQuiz() {
      const questions = quizAlcohol ? questionsWithAlcohol : questionsNoAlcohol
      setShowConfirmation(false)
      setCurrentStep(0)
      setAnswers(questions.map(q => q.isMulti ? [] : null))
   }

   function getIsSelected(question, opt) {
      const answer = answers[currentStep]
      
      return question.isMulti
         ? (answer || []).includes(opt)
         : answer === opt
   }

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

   function handleOptionSelect(selectedOption, step) {
      setAnswers(prev => {
         const newAnswers = [...prev]
         if (newAnswers[step] === undefined) {
            newAnswers[step] = []
         }

         const question = currentQuestions[step]
         if (question.isMulti) {
            const current = Array.isArray(newAnswers[step]) ? newAnswers[step] : []

            newAnswers[step] = current.includes(selectedOption)
               ? current.filter(opt => opt !== selectedOption)
               : [...current, selectedOption]
         } 
         else {
            newAnswers[step] = selectedOption
         }

         return newAnswers
      })

      setLastAnsweredStep(step)
   }

   function handlePrevStep() {
      const prevStep = currentStep - 1
      setCurrentStep(prev => prev - 1)
      setLastAnsweredStep(-1)
      setAnswers(prev => {
         const newAnswers = [...prev]
         newAnswers[prevStep] = null
         return newAnswers
      })
   }

   function handleNextStep() {
      setCurrentStep(prev => prev + 1)
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
                              onClick={() => setCurrentStep(currentQuestions.length)}
                              disabled={
                                 currentQuestions[currentStep]?.isMulti
                                    ? !answers[currentStep]?.length > 0
                                    : !answers[currentStep]
                              }
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