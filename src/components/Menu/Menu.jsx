import { createContext } from "react"
import useToggle from "../../hooks/useToggle"

const MenuContext = createContext()

export default function Menu({children, className}) {
    const [open, toggleOpen] = useToggle(false)

    return (
        <MenuContext.Provider value={{open, toggleOpen}}>
            <div className={className}>{children}</div>
        </MenuContext.Provider>
    )
}

export { MenuContext }