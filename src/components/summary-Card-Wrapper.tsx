import { Card, CardContent } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'

interface SummaryCardWrapperProps {
  totalProducts: number
  title?: string
  icon?: LucideIcon
}

export const SummaryCardWrapper = ({
  totalProducts,
  title,
  icon: Icon,
}: SummaryCardWrapperProps) => {
  return (
    <Card className="bg-white dark:bg-gray-800">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-amber-50">{totalProducts}</h3>

        {title && (
          <div className="flex items-center space-x-2 mt-2 text-gray-800 dark:text-gray-100 font-bold text-sm ">
            {Icon && <Icon className="h-5 w-5 text-blue-500" />}
            <span>{title}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
