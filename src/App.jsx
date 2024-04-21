import { Outlet } from "react-router-dom"
import Menu from "./components/Menu/Index"
import { IoMenu } from "react-icons/io5"


export default function App() {

    return (
        <div className="min-h-dvh bg-orange-50">
            <Menu>
                <Menu.Button>
                    <IoMenu />
                </Menu.Button>
                <Menu.Dropdown>
                    <Menu.Item>Lista de compras</Menu.Item>
                    <Menu.Item>Recetas</Menu.Item>
                </Menu.Dropdown>
            </Menu>
            <Outlet />
        </div>
    )
}