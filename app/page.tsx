export const revalidate  = 0;

import Container from "./components/Container";
import BannerHome from "./components/BannerHome";
import ProductCard from "./components/products/ProductCard";
import getProducts, { ExtendedProduct } from "@/actions/getProducts";
import NullData from "./components/NullData";

interface HomeProps{
  searchParams: {
    category?: string;
    searchTerm?: string;
  };
}
export default async function Home({ searchParams }: HomeProps) {

  const products =  await getProducts(searchParams);

  if(products.length === 0){
    return <NullData title='¡Ooops!...No se encontraron productos. Click en "Todas" para limpiar los filtros'/>
  }

  //Fisher-Yates shuffle algorithm

  function shuffledArray(array: ExtendedProduct[]): ExtendedProduct[]{
    for(let i = array.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() *  (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }

  const shuffledProducts =  shuffledArray(products);

  return (
    <div className="p-8">
      <Container>
        <div>
          <BannerHome />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {shuffledProducts.map((product: ExtendedProduct)=>{
            return <ProductCard 
                data ={ product } key={ product.id }
            />
          })}
        </div>
      </Container>
    </div>
  );
}
