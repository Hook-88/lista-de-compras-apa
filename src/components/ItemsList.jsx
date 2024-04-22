import { createContext } from "react"
import Card from "./Card"
import ItemsListItem from "./ItemsListItem"

const ItemsListContext = createContext()

export default function ItemsList({itemsArray}) {

    return (
        <ItemsListContext.Provider value={{}}>
            <Card className="pt-1">
                <ul>
                    {
                        itemsArray.map(ingredient => (
                            <ItemsListItem key={ingredient.id} itemObj={ingredient}/>
                        ))
                    }
                    {/* {
                        showAddIngredient ? <Listitem className="p-0"><AddItemToFireBase addFunction={() => {}}/></Listitem> : null
                    }  */}
                </ul>
            </Card>
        </ItemsListContext.Provider>
    )
}

export { ItemsListContext }