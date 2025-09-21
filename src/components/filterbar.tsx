import { SearchBar } from './search-bar';
import { ProductFilters } from './product-Filter';

interface FilterBarProps {
  search: string;
  setSearch: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  certification: string;
  setCertification: (value: string) => void;
}

export const FilterBar = ({
  search,
  setSearch,
  category,
  setCategory,
  certification,
  setCertification
}: FilterBarProps) => {
  return (
    <div className="flex flex-wrap items-center gap-4 p-4 border border-gray-300 rounded-lg mb-6">
      <SearchBar search={search} setSearch={setSearch} />
      <ProductFilters
        category={category}
        setCategory={setCategory}
        certification={certification}
        setCertification={setCertification}
      />
    </div>
  );
};