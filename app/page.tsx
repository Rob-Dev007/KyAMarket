export const revalidate  = 0;

import Container from "./components/Container";
import BannerHome from "./components/BannerHome";
import ProductList from "./components/products/ProductsList";
import getProducts from "@/actions/getProducts";
import NullData from "./components/NullData";

type Props = {
  searchParams: {
    searchTerm?: string | string[];
    category?: string | string[];
  };
};

export default async function Home({ searchParams }: Props) {
  const searchTerm = Array.isArray(searchParams.searchTerm) ? searchParams.searchTerm[0] : searchParams.searchTerm ?? '';
  const category = Array.isArray(searchParams.category) ? searchParams.category[0] : searchParams.category ?? '';

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
