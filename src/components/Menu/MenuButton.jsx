import { useContext } from "react"
import { MenuContext } from "./Menu"


export default function MenuButton({children, onClick = () => {}, className}) {
    const {toggleOpen} = useContext(MenuContext)
    
    function handleClick() {
        toggleOpen()
        onClick()
    }

    return (
        <button 
            onClick={handleClick} 
            className={className}
        >
            {children}
        </button>
    )
}