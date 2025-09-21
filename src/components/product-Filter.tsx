interface ProductFiltersProps {
  category: string
  setCategory: (value: string) => void
  certification: string
  setCertification: (value: string) => void
}

export const ProductFilters = ({ category, setCategory, certification, setCertification }: ProductFiltersProps) => {
  return (
    <div className="flex gap-4">
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border rounded-xl"
      >
        <option value="">All Categories</option>
        <option value="Fruits">Fruits</option>
        <option value="Vegetables">Vegetables</option>
        <option value="Meat">Meat</option>
        <option value="Seafood">Seafood</option>
        <option value="Dairy">Dairy</option>
      </select>

      <select
        value={certification}
        onChange={(e) => setCertification(e.target.value)}
        className="border rounded-xl p-2"
      >
        <option value="">All Certifications</option>
        <option value="Gold">Gold</option>
        <option value="Platinum">Platinum</option>
        <option value="Green">Green</option>
        <option value="Silver">Silver</option>
      </select>
    </div>
  )
}
