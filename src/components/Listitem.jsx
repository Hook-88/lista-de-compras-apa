import { twMerge } from "tailwind-merge"

export default function Listitem({children, className, ...rest}) {
    const liCSS = twMerge(
        "border-b pb-1 pt-3",
        className
    )

    return (
        <li 
            className={liCSS}
            {...rest}
        >
            {children}
        </li>
    )
}