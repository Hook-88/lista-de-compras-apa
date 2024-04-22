import Listitem from "./Listitem"
import getCapString from "../utility/getCapString"
import { twMerge } from "tailwind-merge"
import Checkbox from "./Checkbox"

export default function Ingredient({ingredientObj, className, ...rest}) {
    const ListItemCSS = twMerge(
        "cursor-pointer text-lg flex gap-2 items-center",
        className
    )
    
    return (
        <Listitem 
            className={ListItemCSS}
            {...rest}
        >
            <Checkbox checked={ingredientObj.checked} />
            {getCapString(ingredientObj.name)}
        </Listitem>
    )
}