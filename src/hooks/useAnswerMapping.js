import { useMemo, useCallback } from "react"

export default function useAnswerMapping() {
   const ANSWER_MAP = useMemo(() => ({
      // WITH ALCOHOL
      // Ocassion (q1) 
      "Aperitif": "Aperitif",
      "With meal": "With meal",
      "Dessert": "Dessert", 
      "Evening/Night": "Evening/Night",
      "Aperitivo": "Aperitif",
      "En la comida": "With meal",
      "Postre/Sobremesa": "Dessert",
      "Tarde/Noche": "Evening/Night",
      
      // Category (q2)
      "Sweet and/or Fruity": "sweetAndFruity",
      "Refreshing and light": "refreshingAndLight", 
      "Strong and classic": "boldAndClassic",
      "Dulce y/o Afrutado": "sweetAndFruity",
      "Refrescante y ligero": "refreshingAndLight",
      "Potente y clásico": "boldAndClassic",
      
      // Spirits (q3)
      "Whisky": "Whisky",
      "Gin": "Gin",
      "Vodka": "Vodka",
      "Rum": "Rum",
      "Tequila": "Tequila",
      "Others": "Others",
      "Ginebra": "Gin", 
      "Ron": "Rum",
      "Otros": "Others",
      
      // NO ALCOHOL
      // Category (q1)
      "Citrus": "citrus",
      "Fruity": "fruity",
      "Herbal": "herbal",
      "Cítrico": "citrus",
      "Afrutado": "fruity",

      // Texture (q2)
      "Smooth and silky": "Smooth",
      "Let's go bubbly!": "Bubbly",
      "Suave y sedoso": "Smooth",
      "Burbujeante": "Bubbly"
   }), [])

   const standardizeAnswer = useCallback((answer) => {
      if (Array.isArray(answer)) {
         return answer.map(opt => ANSWER_MAP[opt] || opt)
      }
      return ANSWER_MAP[answer] || answer
   }, [ANSWER_MAP])

   return { standardizeAnswer, ANSWER_MAP }
}