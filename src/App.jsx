import React from "react"
import { useTranslation } from "react-i18next"
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"

export default function App() {
   const { t, i18n } = useTranslation()
   
   const changeLanguage = (lng) => {
      i18n.changeLanguage(lng)
   }

   return (
      <div>
         <Navbar />
         <h1>{t("title")}</h1>
         <button onClick={() => changeLanguage("es")}>Español</button>
         <button onClick={() => changeLanguage("en")}>English</button>
         <Footer />
      </div>
   )
}