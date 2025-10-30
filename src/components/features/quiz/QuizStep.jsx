import React from "react"
import Question from "../../common/Question"
import Option from "../../common/Option"

export default function QuizStep({
   question,
   options,
   getIsSelected,
   onSelect,
   isMulti
}) {
   return (
      <Question question={question.text}>
         {options.map((item, idx) => {
            const opt = typeof item === "object" ? item.label : item
            const value = typeof item === "object" ? item.value : item

            return (
               <Option 
                  key={idx}
                  option={opt}
                  selected={getIsSelected(question, value)}
                  onSelect={() => onSelect(value)}
                  isMulti={isMulti}
               />
            )
         })}
      </Question>
   )
}