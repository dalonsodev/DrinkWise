export default function Question({ question, children }) {
   const optLength = children.length
   return (
      <div className={`question-container ${optLength > 5 ? "two-col" : ""}`}>
         <h2>{question}</h2>
         {children}
      </div>
   )
}