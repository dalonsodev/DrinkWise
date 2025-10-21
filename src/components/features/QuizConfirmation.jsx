import React from "react"
import ToggleAlcohol from "../common/ToggleAlcohol"

export default function QuizConfirmation({
   quizAlcohol,
   onToggle,
   onStart
}) {
   return (
      <div className="quiz-confirmation">
         <h2>Antes de empezar...</h2>
         <p>Confirma que quieres opciones con alcohol.</p>
         <ToggleAlcohol 
            alcoholFilter={quizAlcohol}
            onToggle={onToggle}
         />
         <p>(Desmarca si quieres cócteles sin alcohol.)</p>
         <button 
            onClick={onStart}
            className="btn-quiz"
         >
            Comenzar quiz
         </button>
      </div>
   )
}