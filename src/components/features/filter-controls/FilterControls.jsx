import FlavorFilter from "./FlavorFilter"
import SpiritFilter from "./SpiritFilter"
import FiltersFooter from "./FiltersFooter"

export default function FilterControls({
   alcoholFilter,
   categoryFilter,
   spiritFilter,
   handleClearFilters,
   handleCategoryFilterChange,
   handleSpiritFilterChange,
   drinksToDisplayLength,
   t
}) {
   const hasActiveFilters = categoryFilter || spiritFilter

   return (
      <div className="menu-filters">
         <FlavorFilter 
            alcoholFilter={alcoholFilter}
            categoryFilter={categoryFilter}
            onCategoryChange={handleCategoryFilterChange}
            t={t}
         />

         {alcoholFilter &&
            <SpiritFilter 
               spiritFilter={spiritFilter}
               onSpiritChange={handleSpiritFilterChange}
               t={t}
            />
         }

         <FiltersFooter 
            drinksToDisplayLength={drinksToDisplayLength}
            hasActiveFilters={hasActiveFilters}
            onClearFilters={handleClearFilters}
            t={t}
         />
      </div>
   )
}