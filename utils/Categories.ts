import { MdStorefront } from "react-icons/md";
import { RiBatteryChargeLine } from "react-icons/ri";
import { SlEarphones } from "react-icons/sl";
import { IoIosDesktop } from "react-icons/io";
import { BsSpeaker } from "react-icons/bs";
import { IoWatch } from "react-icons/io5";
import { LuCable } from "react-icons/lu";


export const categories = [
    {
        label: "Todas",
        icon: MdStorefront
    },
    {
        label: "Cables USB",
        icon: LuCable
    },
    {
        label: "Cargadores",
        icon: RiBatteryChargeLine
    },
    {
        label: "Auriculares",
        icon: SlEarphones
    },
    {
        label: "Accesorios",
        icon: IoIosDesktop
    },
    {
        label: "Altavoces",
        icon: BsSpeaker
    },
    {
        label: "Smartwatch",
        icon: IoWatch
    },
    
]
