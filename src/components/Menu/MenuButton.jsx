import { useContext } from "react"
import { MenuContext } from "./Menu"


export default function MenuButton({
        children = () => {}, 
        onClick = () => {}, 
        ...rest
    }) {
        const {open, toggleOpen} = useContext(MenuContext)
        
        function handleClick(event) {
            event.stopPropagation()
            toggleOpen()
            onClick()
        }

        return (
            <button 
                onClick={handleClick} 
                {...rest}
            >
                {typeof children === "function" ? children(open): children}
            </button>
        )
}