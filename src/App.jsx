import { Outlet } from "react-router-dom"
import Menu from "./components/Menu/Index"
import { IoMenu, IoClose } from "react-icons/io5"


export default function App() {

    return (
        <div className="min-h-dvh bg-orange-50">
            <Menu className="fixed inset-x-0 top-0 text-2xl">
                <Menu.Button className="px-3 py-2 fixed z-20">
                    {open => !open ? <IoMenu /> : <IoMenu className="text-white"/>}
                </Menu.Button>
                <Menu.Dropdown className="fixed inset-x-0 top-0 text-center bg-sky-700 grid gap-2 py-3 pb-4 text-white shadow-md">
                    <Menu.Item>Lista de compras</Menu.Item>
                    <Menu.Item>Recetas</Menu.Item>
                    <Menu.Button className="fixed top-0 right-0 px-3 py-2">
                        {open => <IoClose />}
                    </Menu.Button>           
                </Menu.Dropdown>
            </Menu>
            <Outlet />
        </div>
    )
}