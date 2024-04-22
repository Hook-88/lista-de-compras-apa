import { createContext } from "react"
import { getDoc, updateDoc } from "firebase/firestore"
import Card from "./Card"
import ItemsListItem from "./ItemsListItem"

const ItemsListContext = createContext()

export default function ItemsList({itemsArray, docRef}) {

    async function toggleChecked(ingredientId) {
        const docSnap = await getDoc(docRef)

        const newIngredientsArray = docSnap.data().ingredients.map(ingredient => {
            if (ingredient.id === ingredientId) {
                
                return {...ingredient, checked: !ingredient.checked}
            } else {

                return ingredient
            }
        })

        await updateDoc(docRef, { ingredients: newIngredientsArray }) 
        
    }

    return (
        <ItemsListContext.Provider value={{}}>
            <Card className="pt-1">
                <ul>
                    {
                        itemsArray.map(ingredient => (
                            <ItemsListItem key={ingredient.id} itemObj={ingredient} onClick={toggleChecked}/>
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