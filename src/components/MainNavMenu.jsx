import { Link } from "react-router-dom"
import { IoMenu, IoClose } from "react-icons/io5"
import Menu from "./Menu/Index"

export default function MainNavMenu() {

    return (
        <Menu className="fixed inset-x-0 top-0 text-2xl">
            <Menu.Button className="px-3 py-2 fixed z-20 text-3xl">
                {open => !open ? <IoMenu /> : <IoMenu className="text-white"/>}
            </Menu.Button>
            <Menu.Dropdown className="fixed inset-x-0 top-0 text-center bg-sky-700 grid gap-2 pt-2 pb-4 text-white shadow-md">        
                <Link to="/"><Menu.Button><Menu.Item>Lista de compras</Menu.Item></Menu.Button></Link>
                <Link to="/recipes"><Menu.Button><Menu.Item>Recetas</Menu.Item></Menu.Button></Link>
                <Menu.Button className="fixed top-0 right-0 px-3 py-2">
                    {/* {open => <IoClose />} */}
                    <IoClose />
                </Menu.Button>           
            </Menu.Dropdown>
        </Menu>
    )
}