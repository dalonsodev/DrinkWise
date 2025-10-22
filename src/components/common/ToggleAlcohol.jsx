import React from "react"
import { useTranslation } from "react-i18next"

export default function ToggleAlcohol({
   alcoholFilter,
   onToggle
}) {
   const { t } = useTranslation()

   return (
      <div className="menu-filter-alcohol">
         <label className="toggle-label" htmlFor="alcohol-toggle">
            <span className="toggle-text">
               {t(`menu.filter.${alcoholFilter 
                  ? "withAlcohol" 
                  : "noAlcohol"}`
               )}
            </span>
            <input 
               id="alcohol-toggle"
               type="checkbox"
               checked={alcoholFilter}
               onChange={onToggle}
               className="toggle-input"
            />
            <span className="toggle-slider"></span>
         </label>
      </div>
   )
}