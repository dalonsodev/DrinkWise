import { useState, useEffect, useRef } from "react"

export default function useLazyBackground(imageUrl) {
   const [background, setBackground] = useState("")
   const elementRef = useRef(null)

   useEffect(() => {
      const node = elementRef.current
      const observer = new IntersectionObserver(
         (entries) => {
            entries.forEach(entry => {
               if (entry.isIntersecting) {
                  setBackground(`url(${imageUrl})`)
                  observer.disconnect()
               }
            })
         },
         { rootMargin: "200px" }
      )

      if (node) {
         observer.observe(node)
      }

      return () => {
         if (node) {
            observer.unobserve(node)
         }
      }

   }, [imageUrl])

   return [background, elementRef]
}