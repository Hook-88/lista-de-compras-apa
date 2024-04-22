import { FaSquareCheck, FaRegSquare } from "react-icons/fa6";

export default function CheckBox({checked, ...rest}) {
    
    return (
        <button {...rest}>
            {checked ? <FaSquareCheck /> : <FaRegSquare /> }
        </button>
    )
}