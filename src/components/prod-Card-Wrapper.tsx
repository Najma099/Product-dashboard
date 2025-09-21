"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import AnalyticsModal from "@/components/analytics"
import { Product } from "@/data/product"
import { 
  Shield, 
  AlertTriangle, 
  Eye,
  Award
} from "lucide-react"

interface ProductCardProps {
  product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [open, setOpen] = useState(false)

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-600 dark:text-emerald-400"
    if (score >= 60) return "text-amber-600 dark:text-amber-400"
    return "text-red-600 dark:text-red-400"
  }

  const getCertificationColor = (certification: string) => {
    switch (certification) {
      case "Gold":
        return "bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-50"
      case "Platinum":
        return "bg-gradient-to-r from-slate-400 to-slate-500 text-slate-50"
      case "Silver":
        return "bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800"
      case "Green":
        return "bg-gradient-to-r from-green-400 to-green-500 text-green-50"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <>
      <Card 
        className="group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-card/40 to-card/20 backdrop-blur-sm"
        onClick={() => setOpen(true)}
      >
        <CardContent className="p-6 space-y-4">
          {/* Header */}
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground leading-tight line-clamp-2 group-hover:text-primary transition-colors text-lg mb-2">
                {product.name}
              </h3>
              <p className="text-sm text-muted-foreground">{product.category}</p>
            </div>
            
            {/* Certification Badge - Top Right */}
            {product.certification && product.certification !== "None" && (
              <Badge className={`text-xs font-semibold shrink-0 ${getCertificationColor(product.certification)}`}>
                <Award className="h-3 w-3 mr-1" />
                {product.certification}
              </Badge>
            )}
          </div>

          {/* Main Score Display */}
          {product.transparencyScore !== undefined && (
            <div className="text-center py-6 bg-gradient-to-br from-background/30 to-background/10 rounded-xl border border-border/30">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">Transparency Score</span>
              </div>
              <div className={`text-4xl font-bold ${getScoreColor(product.transparencyScore)} mb-1`}>
                {product.transparencyScore}
              </div>
              <div className="text-xs text-muted-foreground">
                {product.transparencyScore >= 80 ? "Excellent" : 
                 product.transparencyScore >= 60 ? "Good" : "Needs Improvement"}
              </div>
            </div>
          )}

          {/* Risk Indicator - Only if present */}
          {product.riskFlags !== undefined && product.riskFlags > 0 && (
            <div className="flex items-center justify-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <span className="text-sm font-medium text-destructive">
                {product.riskFlags} Risk Flag{product.riskFlags !== 1 ? 's' : ''}
              </span>
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-border/30">
            <div className="text-xs text-muted-foreground">
              Updated {product.updatedDate}
            </div>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                setOpen(true)
              }}
              className="text-primary hover:text-primary hover:bg-primary/10"
            >
              <Eye className="h-3 w-3 mr-1" />
              Details
            </Button>
          </div>
        </CardContent>
      </Card>

      <AnalyticsModal
        product={product}
        isVisible={open}
        onClose={() => setOpen(false)}
      />
    </>
  )
}