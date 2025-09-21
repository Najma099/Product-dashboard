import { Card, CardContent, CardHeader } from '@/components/ui/card'

interface ProductCardProps {
    productName: string
    status?: string
    category?: string
    certification?: string
    transparencyScore?: number
    riskFlags?: number
    updatedDate?: string
    scoreColor?: string
    showRiskIndicator?: boolean
    onClick?: () => void
}

export const ProductCard = ({
    productName,
    status,
    category,
    certification,
    transparencyScore,
    riskFlags,
    updatedDate,
    scoreColor = "text-green-600",
    showRiskIndicator = true,
    onClick
}: ProductCardProps) => {
    return (
        <Card className="cursor-pointer hover:shadow-md" onClick={onClick}>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <h3 className="font-semibold">{productName}</h3>
                    {status && <span className="text-sm text-green-600">{status}</span>}
                </div>
            </CardHeader>
            <CardContent>
                {category && <p className="text-sm text-gray-600">{category}</p>}
                {certification && <p className="text-sm text-gray-500 mt-1">Certification: {certification}</p>}
                {transparencyScore !== undefined && (
                    <div className="mt-2">
                        <span className="text-sm">Transparency Score</span>
                        <div className={`text-2xl font-bold ${scoreColor}`}>
                            {transparencyScore}/100
                        </div>
                    </div>
                )}
                {showRiskIndicator && riskFlags !== undefined && riskFlags > 0 && (
                    <div className="mt-2 flex items-center">
                        <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                        <span className="text-sm text-red-600">Risk Flags: {riskFlags}</span>
                    </div>
                )}
                {updatedDate && (
                    <p className="text-xs text-gray-500 mt-2">Updated: {updatedDate}</p>
                )}
            </CardContent>
        </Card>
    )
}
