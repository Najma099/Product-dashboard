export interface Product {
  id: number
  name: string
  category: string
  certification: "Gold" | "Platinum" | "Silver" | "Green" | "None"
  transparencyScore: number
  riskFlags: number
  status: "Active" | "Pending" | "Completed"
  updatedDate: string
}

export const products: Product[] = [
  { id: 1, name: "Organic Apple", category: "Fruits", certification: "Gold", transparencyScore: 92, riskFlags: 0, status: "Active", updatedDate: "2025-09-21" },
  { id: 2, name: "Salmon", category: "Seafood", certification: "Platinum", transparencyScore: 98, riskFlags: 1, status: "Pending", updatedDate: "2025-09-20" },
  { id: 3, name: "Almond Milk", category: "Dairy", certification: "Green", transparencyScore: 85, riskFlags: 0, status: "Completed", updatedDate: "2025-09-19" },
  { id: 4, name: "Spinach", category: "Vegetables", certification: "Gold", transparencyScore: 90, riskFlags: 0, status: "Active", updatedDate: "2025-09-18" },
  { id: 5, name: "Chicken Breast", category: "Meat", certification: "Silver", transparencyScore: 78, riskFlags: 2, status: "Pending", updatedDate: "2025-09-17" },
]
