import { useContext, useEffect, useRef } from "react"
import { MenuContext } from "./Menu"

export default function MenuDropdown({children, className}) {
    const { open, toggleOpen } = useContext(MenuContext)
    const menuRef = useRef()

    useEffect(() => {
        function handler(event) {
            if (menuRef.current) {
                
                if (!menuRef.current.contains(event.target)) {
                    toggleOpen()
                }
            }
            
        }

        document.addEventListener("mousedown", handler)

    })
    
    return (
        open ? 
            <ul 
                className={className}
                ref={menuRef}
                onClick={toggleOpen}
            >
                {children}
            </ul> 
            : null
    )
}