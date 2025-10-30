import { useState } from "react"

export default function useActiveCard() {
   const [activeIndex, setActiveIndex] = useState(null);

   function activateCard(index) {
      setActiveIndex(index)
   }

   function deactivateCard() {
      setActiveIndex(null)
   }
   
   return {
      activeIndex,
      activateCard,
      deactivateCard
   }
}