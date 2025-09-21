import { SummaryCardWrapper } from '@/components/summary-Card-Wrapper'
import { Package, AlertCircle, BarChart2, RefreshCw, CheckCircle } from 'lucide-react'

export const SummaryCard = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-5 gap-4 mb-8 mt-3">
        <SummaryCardWrapper
          totalProducts={5}
          title="Total Products"
          icon={Package}
        />
        
        <SummaryCardWrapper
          totalProducts={12}
          title="High Risk Items"
          icon={AlertCircle}
        />
        
        <SummaryCardWrapper
          totalProducts={87}
          title="Average Score"
          icon={BarChart2}
        />
        
        <SummaryCardWrapper
          totalProducts={3}
          title="Needs Review"
          icon={RefreshCw}
        />
        
        <SummaryCardWrapper
          totalProducts={24}
          title="Completed"
          icon={CheckCircle}
        />
      </div>
    </div>
  )
}
