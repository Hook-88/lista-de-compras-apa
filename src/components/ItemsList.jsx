import { createContext, useRef } from "react"
import { getDoc, updateDoc } from "firebase/firestore"
import Card from "./Card"
import ItemsListItem from "./ItemsListItem"
import Listitem from "./Listitem"
import AddItemToFireBase from "./AddItemToFirebase"
import { nanoid } from "nanoid"

const ItemsListContext = createContext()

export default function ItemsList({itemsArray, docRef, docProp, showAddItem}) {

    async function toggleChecked(itemId) {
        const docSnap = await getDoc(docRef)

        const newItemsArray = docSnap.data()[docProp].map(item => {
            if (item.id === itemId) {
                
                return {...item, checked: !item.checked}
            } else {

                return item
            }
        })

        await updateDoc(docRef, { [docProp]: newItemsArray }) 
        
    }

    async function addItem(value) {
        const docSnap = await getDoc(docRef)

        const itemObj = {
            name: value,
            id: nanoid(),
            checked: false
        }
        const newItemsArray = [...docSnap.data()[docProp], itemObj]

        await updateDoc(docRef, { [docProp]: newItemsArray})   
    }

    return (
        <ItemsListContext.Provider value={{}}>
            {
                itemsArray.length > 0 ?
                    <Card className="pt-1">
                        <ul>
                            {
                                itemsArray.map(ingredient => (
                                    <ItemsListItem key={ingredient.id} itemObj={ingredient} onClick={toggleChecked}/>
                                ))
                            }
                            {
                                showAddItem ? <Listitem className="p-0"><AddItemToFireBase addFunction={addItem}/></Listitem> : null
                            } 
                        </ul>
                    </Card> : 
                    showAddItem && itemsArray.length === 0 ?
                        <Card className="pt-1">
                            <ul>
                                {
                                    showAddItem ? <Listitem className="p-0"><AddItemToFireBase addFunction={addItem}/></Listitem> : null
                                } 
                            </ul>
                        </Card> : null
            }
        </ItemsListContext.Provider>
    )
}

export { ItemsListContext }