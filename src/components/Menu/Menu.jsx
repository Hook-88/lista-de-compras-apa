import { createContext } from "react"

const MenuContext = createContext()

export default function Menu({children}) {

    return (
        <MenuContext.Provider>
            <div></div>
        </MenuContext.Provider>
    )
}

export { MenuContext }