import { useContext } from "react"
import { MenuContext } from "./Menu"

export default function MenuDropdown({children, className}) {
    const { open } = useContext(MenuContext)
    
    return (
        open ? 
            <ul className={className}>{children}</ul> 
            : null
    )
}