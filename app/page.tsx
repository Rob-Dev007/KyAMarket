export const revalidate  = 0;

import Container from "./components/Container";
import BannerHome from "./components/BannerHome";
import ProductList from "./components/products/ProductsList";
import getProducts from "@/actions/getProducts";
import NullData from "./components/NullData";

type Props = {
  searchParams: Promise<{
    searchTerm?: string | string[];
    category?: string | string[];
  }>;
};

export default async function Home({ searchParams }: Props) {

  const params = await searchParams;
  const searchTerm = Array.isArray(params.searchTerm) ? params.searchTerm[0] : params.searchTerm ?? '';
  const category = Array.isArray(params.category) ? params.category[0] : params.category ?? '';

  const products =  await getProducts( {searchTerm, category} );

  if(products.length === 0){
    return <NullData title='¡Ooops!...No se encontraron productos. Click en "Todas" para limpiar los filtros'/>
  }

  const isFilterAplied = !!category || !!searchTerm;

  return (
    <Container>
      { !isFilterAplied && <BannerHome /> }
      {!category && !searchTerm }
        <ProductList products={products} title={category ?? "Todos"} />
    </Container>
  );
}
