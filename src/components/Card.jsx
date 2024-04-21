import { twMerge } from "tailwind-merge"

export default function Card({children, className}) {
    const cardCSS = twMerge(
        "bg-white shadow p-2 mb-2 rounded",
        className
    )
    
    return (
        <div
            className={cardCSS}
        >
            {children}
        </div>
)
}