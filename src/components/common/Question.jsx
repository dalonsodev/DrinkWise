import React from "react"

export default function Question({ question, children }) {
   return (
      <div className="question-container">
         <h2>{question}</h2>
         {children}
      </div>
   )
}