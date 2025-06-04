'use client';


import Container from "../Container";
import FooterList from "./FooterList";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaFacebook } from "react-icons/fa6";
import { BsWhatsapp } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";


const Footer= ()=>{

    const router = useRouter();

    const handleCategoryClick = (category: string)=>{
        const query = new URLSearchParams({ category }).toString();
        router.push(`/?${query}`);
    }

    const categorias = ["Cargadores", "Cables USB", "Smartwatch", "Altavoces", "Accesorios", "Auriculares"];

    return(
      <footer className="bg-gradient-to-tr from-purple-500 to-fuchsia-500 text-sm text-gray-50">
        <Container>
            <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
                <FooterList>
                    <h3 className="text-base font-bold">Categorias</h3>

                    { categorias.map((cat)=>(
                        (<button key={ cat } 
                        onClick={ ()=> handleCategoryClick(cat) } 
                        className="text-center w-fit mx-0 hover:underline">
                            { cat }
                        </button>)
                    ))}
                </FooterList>
                <FooterList>
                    <h3 className="text-base font-bold">Servicios</h3>
                    <Link className="hover:underline" href="/help#contacto">Contáctanos</Link>
                    <Link className="hover:underline" href="/help#politica">Política de compras</Link>
                    <Link className="hover:underline" href="/help#reclamos">Reclamos y reposiciones</Link>
                </FooterList>
                <div className="w-full md:w-1/4 mb-6 md:mb-0">
                    <h3 className="text-base font-bold mb-3">Acerca de nosotros</h3>
                    <p>K&A Market, por K&A Cell, local de accesorios para teléfonos móviles, ademas te ofrecemos accesorios para computadora</p>
                    <span>&copy; { new Date().getFullYear() } K&A Cell - Todos los derechos reservados</span>
                </div>
                <FooterList>
                    <h3 className="text-base font-bold">Siguenos</h3>
                    <div className="flex gap-3 items-center">
                        <Link href='#'> <FaFacebook className="text-2xl" /> </Link>
                        <Link href='#'><FaInstagram className="text-2xl"/></Link>
                        <Link href='#'><BsWhatsapp className="text-2xl"/></Link>
                    </div>
                </FooterList>
            </div>
        </Container>
      </footer>
    )
};

export default Footer;