import { useEffect } from "react"

export default function useClickOutside(ref, callback) {
   useEffect(() => {
      function handleClick(e) {
         if (ref.current && !ref.current.contains(e.target)) {
            callback()
         }
      }

      document.addEventListener("click", handleClick)

      return () => {
         document.removeEventListener("click", handleClick)
      }
   }, [ref, callback])
}