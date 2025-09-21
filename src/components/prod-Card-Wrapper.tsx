import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import AnalyticsModal from "@/components/analytics";
import { Product } from "@/data/product";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [open, setOpen] = useState(false);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <>
      <Card
        className="cursor-pointer hover:shadow-md transition"
        onClick={() => setOpen(true)}
      >
        <CardHeader>
          <div className="flex justify-between items-start">
            <h3 className="font-semibold">{product.name}</h3>
            {product.status && (
              <span
                className={`text-sm font-medium ${
                  product.status === "Active"
                    ? "text-green-600"
                    : product.status === "Pending"
                    ? "text-yellow-600"
                    : "text-gray-600"
                }`}
              >
                {product.status}
              </span>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {product.category && <p className="text-sm text-gray-600">{product.category}</p>}
          {product.certification && (
            <p className="text-sm text-gray-500 mt-1">
              Certification: {product.certification}
            </p>
          )}
          {product.transparencyScore !== undefined && (
            <div className="mt-2">
              <span className="text-sm">Transparency Score</span>
              <div className={`text-2xl font-bold ${getScoreColor(product.transparencyScore)}`}>
                {product.transparencyScore}/100
              </div>
            </div>
          )}
          {product.riskFlags !== undefined && product.riskFlags > 0 && (
            <div className="mt-2 flex items-center">
              <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
              <span className="text-sm text-red-600">
                Risk Flags: {product.riskFlags}
              </span>
            </div>
          )}
          {product.updatedDate && (
            <p className="text-xs text-gray-500 mt-2">
              Updated: {product.updatedDate}
            </p>
          )}
        </CardContent>
      </Card>

      <AnalyticsModal
        product={product}
        isVisible={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};
