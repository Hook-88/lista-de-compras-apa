import Listitem from "./Listitem"
import getCapString from "../utility/getCapString"
import { twMerge } from "tailwind-merge"
import Checkbox from "./Checkbox"

export default function ItemsListItem({itemObj, className, onClick, ...rest}) {
    const ListItemCSS = twMerge(
        "cursor-pointer text-lg flex gap-2 items-center",
        className
    )
    
    return (
        <Listitem 
            className={ListItemCSS}
            onClick={() => onClick(itemObj.id)}
            {...rest}
        >
            <Checkbox checked={itemObj.checked} />
            {getCapString(itemObj.name)}
        </Listitem>
    )
}