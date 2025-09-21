import React, { useState } from "react";
import { Product } from '@/data/product';
import { ExtendedProduct } from '@/lib/type';

// Union type that accepts both Product and ExtendedProduct
interface AnalyticsModalProps {
  product: Product | ExtendedProduct;
  isVisible: boolean;
  onClose: () => void;
}

// Type guard to check if product is ExtendedProduct
const isExtendedProduct = (product: Product | ExtendedProduct): product is ExtendedProduct => {
  return 'image' in product && 'ingredients' in product;
};

const AnalyticsModal: React.FC<AnalyticsModalProps> = ({ product, isVisible, onClose }) => {
  const [showDetails, setShowDetails] = useState(false);

  if (!isVisible) return null;

  const generateAnalytics = (product: Product | ExtendedProduct) => {
    const score = product.transparencyScore;
    const flags = product.riskFlags;

    let explanation = "";
    let suggestions: string[] = [];
    let riskFlagsList: string[] = [];

    if (score >= 80) {
      explanation = "Excellent transparency. All key requirements met.";
      suggestions = [
        "Maintain current certification standards.",
        "Consider adding sustainability metrics.",
        "Regular third-party audits recommended.",
      ];
    } else if (score >= 70) {
      explanation = `Moderate transparency. Missing details for ${flags} components.`;
      suggestions = [
        "Add detailed sourcing information.",
        "Include certification documentation.",
        "Clarify supply chain transparency.",
      ];
    } else {
      explanation = "Transparency needs improvement. Multiple areas require attention.";
      suggestions = [
        "Complete missing documentation urgently.",
        "Verify all certification claims.",
        "Implement comprehensive labeling.",
        "Establish supply chain traceability.",
      ];
    }

    const allFlags = [
      "Incomplete sourcing",
      "Missing certification docs",
      "Unclear ingredient list",
      "No supplier verification",
      "Expired certifications",
    ];
    riskFlagsList = allFlags.slice(0, flags);

    return { explanation, suggestions, riskFlagsList };
  };

  const analytics = generateAnalytics(product);

  const getScoreClass = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "#10b981"; // green
    if (score >= 60) return "#f59e0b"; // yellow
    return "#ef4444"; // red
  };

  const getExplanationBgClass = (score: number) => {
    if (score >= 80) return 'bg-green-500/10 border-green-500/30 text-green-700 dark:text-green-300';
    if (score >= 60) return 'bg-yellow-500/10 border-yellow-500/30 text-yellow-700 dark:text-yellow-300';
    return 'bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-300';
  };

  const getSeverityClass = (flag: string, index: number) => {
    if (index === 0 || flag.includes("Missing") || flag.includes("No")) 
      return "bg-red-500/10 text-red-700 dark:text-red-300 border-red-500/30";
    if (index === 1 || flag.includes("Incomplete") || flag.includes("Unclear")) 
      return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-300 border-yellow-500/30";
    return "bg-green-500/10 text-green-700 dark:text-green-300 border-green-500/30";
  };

  const getIconForSuggestion = (suggestion: string) => {
    const text = suggestion.toLowerCase();
    if (text.includes('sourcing') || text.includes('source')) return '🌱';
    if (text.includes('certification') || text.includes('certified')) return '🏆';
    if (text.includes('documentation')) return '📋';
    if (text.includes('audit')) return '🔍';
    if (text.includes('maintain') || text.includes('standards')) return '⚖️';
    if (text.includes('sustainability') || text.includes('metrics')) return '🌿';
    if (text.includes('supply chain') || text.includes('traceability')) return '🔗';
    return '💡';
  };

  const CircularProgress = ({ score, size = 120 }: { score: number; size?: number }) => {
    const radius = size === 120 ? 50 : 30;
    const strokeWidth = size === 120 ? 8 : 6;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90 w-full h-full" viewBox={`0 0 ${size} ${size}`}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="hsl(var(--muted))"
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={getScoreColor(score)}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className={`${size === 120 ? 'text-3xl' : 'text-xl'} font-bold text-foreground`}>
              {score}
            </div>
            <div className="text-sm text-muted-foreground">Score</div>
          </div>
        </div>
      </div>
    );
  };

  // Get additional details if it's an ExtendedProduct
  const extendedProduct = isExtendedProduct(product) ? product : null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-background border border-border rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-purple-600 text-primary-foreground p-6 rounded-t-2xl">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Product Transparency Report</h2>
                <p className="text-primary-foreground/80 mt-1">{product.name}</p>
                <p className="text-primary-foreground/70 text-sm">
                  {product.category} • {product.certification} Certification
                </p>
              </div>
              <button 
                onClick={onClose} 
                className="text-primary-foreground hover:text-primary-foreground/80 transition-colors p-2 hover:bg-primary-foreground/10 rounded-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Score Section */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <CircularProgress score={product.transparencyScore} />
              </div>
              <div className={`inline-block px-4 py-3 rounded-lg border ${getExplanationBgClass(product.transparencyScore)} max-w-md`}>
                <p className="font-medium">{analytics.explanation}</p>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Suggestions Panel */}
              <div className="bg-gradient-to-r from-card/40 to-card/20 backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                  </svg>
                  <h3 className="text-lg font-semibold text-foreground">Improvement Suggestions</h3>
                </div>
                <div className="space-y-3">
                  {analytics.suggestions.map((suggestion, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-primary/5 border border-primary/20 rounded-lg hover:bg-primary/10 transition-colors">
                      <span className="text-xl flex-shrink-0 mt-0.5">{getIconForSuggestion(suggestion)}</span>
                      <span className="text-foreground/80 text-sm leading-relaxed">{suggestion}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Risk Flags Panel */}
              <div className="bg-gradient-to-r from-card/40 to-card/20 backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-6 h-6 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.996-.833-2.767 0L3.047 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                  </svg>
                  <h3 className="text-lg font-semibold text-foreground">Risk Flags ({product.riskFlags})</h3>
                </div>
                <div className="space-y-2">
                  {analytics.riskFlagsList.length > 0 ? (
                    analytics.riskFlagsList.map((flag, index) => (
                      <div
                        key={index}
                        className={`inline-block px-3 py-2 rounded-full text-sm font-medium border ${getSeverityClass(flag, index)} mr-2 mb-2`}
                      >
                        {flag}
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <span className="text-green-600 dark:text-green-400">✓</span>
                      <span className="text-green-700 dark:text-green-300 text-sm">No risk flags detected</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Extended Product Details (only if available) */}
            {extendedProduct && (
              <div className="mt-6 bg-gradient-to-br from-card/20 to-card/10 backdrop-blur-sm border border-border/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span>📋</span>
                  Additional Product Details
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Product Image */}
                  {extendedProduct.image && (
                    <div className="text-center">
                      <img
                        src={extendedProduct.image}
                        alt={extendedProduct.name}
                        className="w-32 h-32 object-cover rounded-lg mx-auto shadow-md border-2 border-card"
                      />
                      <p className="text-sm text-muted-foreground mt-2">Product Image</p>
                    </div>
                  )}

                  {/* Details Grid */}
                  <div className="space-y-3 text-sm">
                    {extendedProduct.ingredients && extendedProduct.ingredients.length > 0 && (
                      <div>
                        <span className="font-medium text-foreground">Ingredients:</span>
                        <p className="text-muted-foreground">{extendedProduct.ingredients.join(', ')}</p>
                      </div>
                    )}
                    {extendedProduct.origin && (
                      <div>
                        <span className="font-medium text-foreground">Origin:</span>
                        <p className="text-muted-foreground">{extendedProduct.origin}</p>
                      </div>
                    )}
                    {extendedProduct.supplier && (
                      <div>
                        <span className="font-medium text-foreground">Supplier:</span>
                        <p className="text-muted-foreground">{extendedProduct.supplier}</p>
                      </div>
                    )}
                    {extendedProduct.certificationBody && (
                      <div>
                        <span className="font-medium text-foreground">Certification Body:</span>
                        <p className="text-muted-foreground">{extendedProduct.certificationBody}</p>
                      </div>
                    )}
                    {extendedProduct.expiryDate && (
                      <div>
                        <span className="font-medium text-foreground">Certification Expires:</span>
                        <p className="text-muted-foreground">{extendedProduct.expiryDate}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Detail Panel */}
            {showDetails && (
              <div className="mt-6 bg-gradient-to-br from-card/20 to-card/10 backdrop-blur-sm border border-border/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">Detailed Analysis</h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Mini Progress Chart */}
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <CircularProgress score={product.transparencyScore} size={80} />
                    </div>
                    <p className="text-sm text-muted-foreground">Transparency Score</p>
                  </div>

                  {/* AI Analysis */}
                  <div className="md:col-span-2">
                    <h4 className="font-semibold text-foreground mb-2">AI Analysis</h4>
                    <p className="text-foreground/80 text-sm mb-4">
                      Based on comprehensive evaluation of product documentation, supply chain transparency, 
                      and compliance standards, this product demonstrates {
                        product.transparencyScore >= 80 ? 'excellent' :
                        product.transparencyScore >= 60 ? 'moderate' : 'poor'
                      } transparency levels with a score of {product.transparencyScore}/100.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-muted-foreground">Status:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          product.status === 'Active' ? 'bg-green-500/20 text-green-700 dark:text-green-300' :
                          product.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-300' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {product.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-muted-foreground">Updated:</span>
                        <span className="text-foreground">{product.updatedDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between items-center mt-6 pt-6 border-t border-border/30">
              <button 
                onClick={() => setShowDetails(!showDetails)}
                className="text-primary hover:text-primary/80 font-medium flex items-center gap-1 transition-colors"
              >
                <span>{showDetails ? 'Hide Details' : 'Show Details'}</span>
                <svg className={`w-4 h-4 transition-transform ${showDetails ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              <div className="flex gap-3">
                <button className="bg-secondary hover:bg-secondary/80 text-secondary-foreground px-4 py-2 rounded-lg transition-colors font-medium">
                  Export Report
                </button>
                <button 
                  onClick={onClose} 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsModal;