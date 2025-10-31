const SPIRITS = ["Whisky", "Gin", "Vodka", "Rum", "Tequila", "Others"]

export default function SpiritFilter({
   spiritFilter,
   onSpiritChange,
   t
}) {

   function getSpiritFilters() {
      return SPIRITS.map(spirit => (
         <button
            key={spirit}
            onClick={() => onSpiritChange(spirit)}
            className={`menu-filter-btn ${spiritFilter === spirit ? "active" : ""}`}
            aria-pressed={spiritFilter === spirit}
         >
            {t(`spirit.${spirit}`)}
         </button>
      ))
   }
   
   return (
      <div className="menu-filter menu-filter-spirit">
         <p className="menu-filter-label">{t("menu.filter.mainSpirit")}:</p>
         {getSpiritFilters()}
      </div>
   )
}