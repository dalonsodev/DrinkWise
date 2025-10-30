import React from "react"
import { t } from "i18next"

export default function QuizProgress({ currentStep, totalSteps, onPrev }) {
   const progress = (currentStep + 1) / totalSteps
   
   return (
      <div className="progress-wrapper">
         <ProgressIndicator 
            progress={progress} 
         />

         {currentStep > 0 && (
            <button className="quiz-prev-btn" onClick={onPrev}>
               {t("quiz.back")}
            </button>
         )}
      </div>
   )
}