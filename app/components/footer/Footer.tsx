
import { FaInstagram } from "react-icons/fa";
import Container from "../Container";
import FooterList from "./FooterList";
import Link from "next/link";
import { FaFacebook } from "react-icons/fa6";
import { BsWhatsapp } from "react-icons/bs";

interface FooterProps{
    children : React.ReactNode
}

const Footer: React.FC<FooterProps> = ({ children })=>{
    return(
      <footer className="bg-gradient-to-tr from-purple-500 to-fuchsia-500 text-sm text-gray-50">
        <Container>
            <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
                <FooterList>
                    <h3 className="text-base font-bold">Categorias</h3>
                    <Link href='#'>Cargadores</Link>
                    <Link href='#'>Cables de datos</Link>
                    <Link href='#'>Smartwatch</Link>
                    <Link href='#'>Altavoces</Link>
                    <Link href='#'>Auriculares</Link>
                    <Link href='#'>Earpods</Link>
                </FooterList>
                <FooterList>
                    <h3 className="text-base font-bold">Servicios</h3>
                    <Link href='#'>Contactanos</Link>
                    <Link href='#'>Politica de compras</Link>
                    <Link href='#'>Reclamos y reposiciones</Link>
                </FooterList>
                <div className="w-full md:w-1/4 mb-6 md:mb-0">
                    <h3 className="text-base font-bold mb-3">Acerca de nosotros</h3>
                    <p>K&A Market, por K&A Cell, local de repuestos y accesorios para teléfonos móviles, ademas te ofrecemos accesorios para computadora</p>
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