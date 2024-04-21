import { Outlet, Link } from "react-router-dom"
import Menu from "./components/Menu/Index"
import { IoMenu, IoClose } from "react-icons/io5"
import MainNavMenu from "./components/MainNavMenu"


export default function App() {

    return (
        <div className="min-h-dvh bg-orange-50">
            <MainNavMenu />
            <Outlet />
        </div>
    )
}