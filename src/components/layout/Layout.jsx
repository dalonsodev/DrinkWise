import React from "react"
import { Outlet } from "react-router-dom"
import { useTranslation } from "react-i18next"
import Navbar from "./Navbar"
import Footer from "./Footer"

export default function Layout() {
   const { t, i18n } = useTranslation()

   const changeLanguage = (lng) => {
      i18n.changeLanguage(lng)
   }

   return (
      <div className="site-wrapper">
         <Navbar changeLanguage={changeLanguage} />
         <main>
            <Outlet />
         </main>
         <Footer />
      </div>
   )
}