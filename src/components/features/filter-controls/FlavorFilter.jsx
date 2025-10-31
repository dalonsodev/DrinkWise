const FLAVOR_ALCOHOL = [
   "sweetAndFruity",
   "refreshingAndLight",
   "boldAndClassic"
]

const FLAVOR_NO_ALCOHOL = [
   "citrus",
   "fruity",
   "herbal"
]

export default function FlavorFilter({
   alcoholFilter,
   categoryFilter,
   onCategoryChange,
   t
}) {
   const flavors = alcoholFilter ? FLAVOR_ALCOHOL : FLAVOR_NO_ALCOHOL
   
   function getFlavorFilters(flavors) {
      return flavors.map(flavor => (
         <button
            key={flavor}
            onClick={() => onCategoryChange(flavor)}
            className={`menu-filter-btn ${categoryFilter === flavor 
               ? "active"
               : ""
            }`}
            aria-pressed={categoryFilter === flavor}
         >
            {t(`category.${flavor}`)}
         </button>
      ))
   }

   return (
      <div className="menu-filter menu-filter-flavour">
         <p className="menu-filter-label">{t("menu.filter.flavorProfile")}:</p>
         {getFlavorFilters(flavors)}
      </div>
   )
}