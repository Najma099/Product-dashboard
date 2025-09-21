"use client"

import { Card, CardContent } from '@/components/ui/card'
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react'

interface SummaryCardWrapperProps {
  totalProducts: number
  title?: string
  icon?: LucideIcon
  trend?: {
    value: string
    direction: 'up' | 'down' | 'neutral'
  }
  color?: 'blue' | 'green' | 'orange' | 'red' | 'purple'
}

export const SummaryCardWrapper = ({
  totalProducts,
  title,
  icon: Icon,
  trend,
  color = 'blue'
}: SummaryCardWrapperProps) => {
  const colorClasses = {
    blue: {
      bg: 'bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/20 dark:to-blue-900/10',
      iconBg: 'bg-blue-100 dark:bg-blue-900/30',
      iconColor: 'text-blue-600 dark:text-blue-400',
      border: 'border-blue-200/50 dark:border-blue-800/30'
    },
    green: {
      bg: 'bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-950/20 dark:to-emerald-900/10',
      iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      border: 'border-emerald-200/50 dark:border-emerald-800/30'
    },
    orange: {
      bg: 'bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-950/20 dark:to-orange-900/10',
      iconBg: 'bg-orange-100 dark:bg-orange-900/30',
      iconColor: 'text-orange-600 dark:text-orange-400',
      border: 'border-orange-200/50 dark:border-orange-800/30'
    },
    red: {
      bg: 'bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-950/20 dark:to-red-900/10',
      iconBg: 'bg-red-100 dark:bg-red-900/30',
      iconColor: 'text-red-600 dark:text-red-400',
      border: 'border-red-200/50 dark:border-red-800/30'
    },
    purple: {
      bg: 'bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/20 dark:to-purple-900/10',
      iconBg: 'bg-purple-100 dark:bg-purple-900/30',
      iconColor: 'text-purple-600 dark:text-purple-400',
      border: 'border-purple-200/50 dark:border-purple-800/30'
    }
  }

  const colors = colorClasses[color]

  return (
    <Card className={`${colors.bg} ${colors.border} border backdrop-blur-sm hover:shadow-lg transition-all duration-300 group hover:scale-[1.02]`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-3 flex-1">
            {/* Value */}
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-foreground tracking-tight">
                {totalProducts}
              </h3>
              {title && (
                <p className="text-sm font-medium text-muted-foreground">
                  {title}
                </p>
              )}
            </div>

            {/* Trend */}
            {trend && (
              <div className="flex items-center gap-1">
                {trend.direction === 'up' ? (
                  <TrendingUp className="h-3 w-3 text-green-600 dark:text-green-400" />
                ) : trend.direction === 'down' ? (
                  <TrendingDown className="h-3 w-3 text-red-600 dark:text-red-400" />
                ) : null}
                <span className={`text-xs font-medium ${
                  trend.direction === 'up' 
                    ? 'text-green-600 dark:text-green-400'
                    : trend.direction === 'down'
                    ? 'text-red-600 dark:text-red-400'  
                    : 'text-muted-foreground'
                }`}>
                  {trend.value}
                </span>
              </div>
            )}
          </div>

          {/* Icon */}
          {Icon && (
            <div className={`p-3 rounded-xl ${colors.iconBg} group-hover:scale-110 transition-transform duration-300`}>
              <Icon className={`h-6 w-6 ${colors.iconColor}`} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}