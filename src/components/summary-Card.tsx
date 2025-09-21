"use client"

import { SummaryCardWrapper } from '@/components/summary-Card-Wrapper'
import { Package, AlertCircle, BarChart2, RefreshCw, CheckCircle } from 'lucide-react'

export const SummaryCard = () => {
  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <BarChart2 className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Overview</h2>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <SummaryCardWrapper
          totalProducts={5}
          title="Total Products"
          icon={Package}
          color="blue"
          trend={{ value: "+12% this month", direction: "up" }}
        />
        
        <SummaryCardWrapper
          totalProducts={12}
          title="High Risk Items"
          icon={AlertCircle}
          color="red"
          trend={{ value: "-2% from last week", direction: "down" }}
        />
        
        <SummaryCardWrapper
          totalProducts={87}
          title="Average Score"
          icon={BarChart2}
          color="green"
          trend={{ value: "+5% improvement", direction: "up" }}
        />
        
        <SummaryCardWrapper
          totalProducts={3}
          title="Needs Review"
          icon={RefreshCw}
          color="orange"
          trend={{ value: "2 new items", direction: "neutral" }}
        />
        
        <SummaryCardWrapper
          totalProducts={24}
          title="Completed"
          icon={CheckCircle}
          color="purple"
          trend={{ value: "+8% this week", direction: "up" }}
        />
      </div>
    </div>
  )
}