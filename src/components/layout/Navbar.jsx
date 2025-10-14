import React from "react"
import { Link, NavLink } from "react-router-dom"
import { useTranslation } from "react-i18next"

export default function Navbar({ changeLanguage }) {
   const { t } = useTranslation()

   return (
      <header className="header">
         <Link className="logo" to="/">DrinkWise</Link>
         <div className="nav-language">
            <button 
               className="btn-language"
               onClick={() => changeLanguage("es")}
            >
               {t("nav.language.es")}
            </button>
            <button 
               className="btn-language"
               onClick={() => changeLanguage("en")}
            >
               {t("nav.language.en")}
            </button>
         </div>
         <nav>
            <NavLink 
               className={({ isActive }) => `nav-link ${isActive ? "active" : null}`}
               to="/quiz"
            >
               {t("nav.quiz")}
            </NavLink>
            <NavLink 
               className={({ isActive }) => `nav-link ${isActive ? "active" : null}`}
               to="/menu"
            >
               {t("nav.menu")}
            </NavLink>
         </nav>
      </header>
   )
}