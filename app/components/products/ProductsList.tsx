'use client';

import { ExtendedProduct } from '@/actions/getProducts';
import ProductCard from './ProductCard';

interface ProductListProps {
    products: ExtendedProduct[];
    title?: string;
  }
  
  export default function ProductList({ products, title }: ProductListProps) {
    // Fisher-Yates shuffle
    function shuffledArray(array: ExtendedProduct[]): ExtendedProduct[] {
      const copy = [...array];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    }
  
    const shuffledProducts = shuffledArray(products);
  
    return (
      <div className="p-8">
        {title && <h2 className="text-2xl font-bold mb-4 capitalize">{title}</h2>}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {shuffledProducts.map((product) => (
            <ProductCard key={product.id} data={product} />
          ))}
        </div>
      </div>
    );
  }