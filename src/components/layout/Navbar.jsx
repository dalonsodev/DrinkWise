import React from "react"
import { Link, NavLink } from "react-router-dom"
import { useTranslation } from "react-i18next"

export default function Navbar({ changeLanguage }) {
   const { t, i18n } = useTranslation()

   const currentLanguage = i18n.language.split("-")[0]
   const nextLanguage = currentLanguage === "es" ? "en" : "es"
   const flagIcon = nextLanguage === "es" ? "🇪🇸" : "🇬🇧"

   return (
      <header className="header">
         <div className="nav-language">
            <button 
               className="btn-language"
               onClick={() => changeLanguage(nextLanguage)}
               aria-label={t("a11y.languageFlag")}
            >
               {flagIcon}
            </button>
         </div>
         <Link className="logo" to="/">DrinkWise</Link>
         <nav className="nav-links">
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