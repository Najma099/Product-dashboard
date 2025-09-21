import { Header } from '@/components/header';
import { ProductCard } from '@/components/prod-Card-Wrapper'
import {  SummaryCard } from '@/components/summary-Card'

export default function Home() {
  return (
    <div >
      <Header/>
      <main className='m-10'>
        <SummaryCard/>
        <ProductCard
          productName="Organic Cotton T-Shirt"
          status="active"
          category="Apparel"
          transparencyScore={87}
          riskFlags={1}
          updatedDate="15/01/2024"
        />
        
      </main>
    </div>
  );
}