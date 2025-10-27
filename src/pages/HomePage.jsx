import React from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

export default function Home() {
   const { t } = useTranslation()

   return (
      <>
         <div className="hero-bg"></div>
         <div className="page home-hero">
            <h1 className="page-title">{t("welcome")}</h1>
            <p className="page-description">{t("welcome.description")}</p>
            <div className="hero-links-wrapper">
               <Link to="/quiz" className="btn-primary">
                  {t("button.startQuiz")}
               </Link>
               <Link to="/menu" className="btn-alt">
                  {t("button.seeMenu")}
               </Link>
            </div>
         </div>
      </>
   )
}