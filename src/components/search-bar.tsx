import { Input } from '@/components/ui/input'

interface SearchBarProps {
  search: string
  setSearch: (value: string) => void
}

export const SearchBar = ({ search, setSearch }: SearchBarProps) => {
  return (
    <div>
      <Input
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-4xl border rounded-xl p-2"
      />
    </div>
  )
}