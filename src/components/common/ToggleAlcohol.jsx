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
               className="toggle-input"
               type="checkbox"
               checked={alcoholFilter}
               onChange={onToggle}
               aria-label={t("a11y.toggleAlcohol")}
            />
            <span 
               className="toggle-slider" 
               tabIndex="0"
               aria-hidden="true"
               onKeyDown={(e) => {
                  if (e.key === " " || e.key === "Enter") {
                     e.preventDefault()
                     onToggle()
                  }
               }}
            ></span>
         </label>
      </div>
   )
}