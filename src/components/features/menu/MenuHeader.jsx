import ToggleAlcohol from "../../common/ToggleAlcohol"

export default function MenuHeader({ alcoholFilter, onToggle, t }) {
   return (
      <div className="menu-header">
         <h1 className="menu-title">{t("menu.title")}</h1>
         <ToggleAlcohol 
            alcoholFilter={alcoholFilter}
            onToggle={onToggle}
         />
      </div>
   )
}