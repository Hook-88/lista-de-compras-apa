import { Outlet } from "react-router-dom"

export default function App() {

    return (
        <div className="min-h-dvh bg-orange-50">
            <Outlet />
        </div>
    )
}