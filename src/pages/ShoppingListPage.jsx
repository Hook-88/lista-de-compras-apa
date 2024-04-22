import { Link, useParams } from "react-router-dom"
import { onSnapshot, doc, updateDoc, getDoc } from "firebase/firestore"
import { db, recipesCollection } from "../firebase"
import { createContext, useEffect, useRef, useState } from "react"
import { FaPlus, FaCheck } from "react-icons/fa6"
import useToggle from "../hooks/useToggle"
import getCapString from "../utility/getCapString"
import Card from "../components/Card"
import Checkbox from "../components/Checkbox"

import ItemsList from "../components/ItemsList"
import ItemsListActions from "../components/ItemListActions"

const RecipeContext = createContext()

export default function ShoppingListPage() {
    const [recipe, setRecipe] = useState(null)
    const [showAddIngredient, toggleShowAddIngredient] = useToggle(false)
    // ref to document in firebase
    const docRef = doc(db, "shoppingList", "hcxXIfLt1QQeuwwbuJBo")

    useEffect(() => {
        const unsub = onSnapshot(docRef, snapshot => {
            // sync with local state
            const recipeObj = {
                ...snapshot.data(),
                id: "hcxXIfLt1QQeuwwbuJBo",
            }
            setRecipe(recipeObj)
        })

        return unsub
    },[])

    return (
        recipe ?
            <div className="min-h-dvh bg-orange-50">
                <header className="text-2xl border-b border-slate-300 py-2 mb-2 flex justify-between items-center">
                    <FaCheck className="text-transparent"/>
                    <h1 className="">{getCapString(recipe.name)}</h1>
                    <button className="px-3" onClick={toggleShowAddIngredient}>
                        { showAddIngredient ? <FaCheck /> : <FaPlus />}
                    </button>
                </header>
                <main 
                    className="px-2"
                    >
                    <ItemsList 
                        itemsArray={recipe.items} 
                        docRef={docRef} 
                        docProp="items" 
                        showAddItem={showAddIngredient} 
                    />
                    {/* {
                        recipe.items?.length > 0 &&
                            <ItemsListActions 
                                itemsArray={recipe?.items} 
                                docRef={docRef} 
                                docProp="items"
                            />
                    } */}

                <>
                    <div className="flex gap-2 text-lg">
                        <Card className="p-0 flex">
                            <Checkbox  
                                className="p-3 px-2"
                                checked={recipe.items.every(item => item.checked)}
                                // onClick={toggleAllChecked}
                                />
                        </Card>
                        
                        <Card className="flex flex-1 gap-2">
                            <button 
                                className="py-1 px-2 w-full bg-red-600 text-white rounded shadow-sm disabled:opacity-50"
                                // onClick={removeSelection}
                                disabled={recipe.items.every(item => item.checked === false)}
                                >
                                Borrar
                            </button>
                        </Card>

                        
                    </div>
                </>

                </main>
            </div>  : <h1>Loading...</h1>
    )
}

export { RecipeContext }