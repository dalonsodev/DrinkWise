import React from "react"

export default function ProgressIndicator({ progress = 0 }) {
   return (
      <div className="progress-container">
         <div 
            className="progress-fill"
            style={{ width: `${progress * 100}%` }}
         >
         </div>
      </div>
   )
}