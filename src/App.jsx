import { Outlet } from "react-router-dom"
import Card from "./components/Card"

export default function App() {

    return (
        <div className="min-h-dvh bg-orange-50">
            <Outlet />
        </div>
    )
}