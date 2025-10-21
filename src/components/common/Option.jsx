import React from "react"

export default function Option({ option, selected, onSelect, isMulti = false }) {
   return (
      <label 
         className={`menu-filter-btn quiz-option ${selected ? "active" : ""}`}
      >
         <input 
            type={isMulti ? "checkbox" : "radio"}
            checked={selected}
            onChange={onSelect}
            name={isMulti ? null : "quiz-single"}
            style={{ display: "none" }}
         />
         {option}
      </label>
   )
}