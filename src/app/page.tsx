"use client"

import { useState, useMemo } from "react"
import { products as allProducts } from '@/data/product'
import { FilterBar } from '@/components/filterbar'
import { ProductGrid } from '@/components/product-Grid'
import { SummaryCard } from '@/components/summary-Card'
import { Header } from '@/components/header'
import { ProductFormWizard } from '@/components/productFormWizard'
import { Button } from "@/components/ui/button"
import { Plus, Sparkles } from "lucide-react"
import { Footer } from '@/components/footer';

export default function Dashboard() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")
  const [certification, setCertification] = useState("")
  const [showForm, setShowForm] = useState(false)

  const filteredProducts = useMemo(() => {
    return allProducts.filter((p) => {
      return (
        (!search || p.name.toLowerCase().includes(search.toLowerCase())) &&
        (!category || p.category === category) &&
        (!certification || p.certification === certification)
      )
    })
  }, [search, category, certification])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 dark:from-background dark:via-background dark:to-primary/5">
      <Header />
      
      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Welcome dear user
              </h1>
            </div>
            <p className="text-muted-foreground">
              Manage and track your product transparency with ease
            </p>
          </div>
          
          <Button 
            onClick={() => setShowForm(true)}
            size="lg"
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/25 transition-all duration-300"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Product
          </Button>
        </div>

        <div className="bg-gradient-to-r from-card/40 to-card/20 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-xl">
          <SummaryCard />
        </div>

        <div className="bg-gradient-to-r from-card/30 to-card/10 backdrop-blur-sm border border-border/30 rounded-2xl p-6 shadow-lg">
          <FilterBar
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            certification={certification}
            setCertification={setCertification}
          />
        </div>

        <ProductGrid products={filteredProducts} />

       {showForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 overflow-y-auto">
            <div className="min-h-full flex justify-center items-start py-8 px-4">
              <div className="bg-background border border-border shadow-xl rounded-2xl w-full max-w-4xl relative animate-in fade-in-0 zoom-in-95 duration-300">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowForm(false)}
                  className="absolute top-4 right-4 z-10 hover:bg-destructive/10 hover:text-destructive rounded-full transition-all duration-200"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Button>
                <div className="text-foreground">
                  <ProductFormWizard />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}