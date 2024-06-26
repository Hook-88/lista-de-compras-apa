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
import ShoppingListActions from "../components/ShoppingListActions"

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
            <div className="min-h-dvh bg-orange-50 flex flex-col">
                <header className="text-2xl border-b border-slate-300 py-2 mb-2 flex justify-between items-center">
                    <FaCheck className="text-transparent ml-3"/>
                    <h1 className="">{getCapString(recipe.name)}</h1>
                    <button 
                        className="px-3" 
                        onClick={toggleShowAddIngredient}
                    >
                        { showAddIngredient ? <FaCheck /> : <FaPlus />}
                    </button>
                </header>
                {
                    recipe?.items.length === 0 && !showAddIngredient ?
                    <main className="px-2 flex-1 flex flex-col justify-center items-center text-3xl">
                        <button
                        className="flex gap-2 items-center"
                            onClick={toggleShowAddIngredient}
                        >
                            Add items <FaPlus />
                        </button>
                    </main> : 
                
                
                <main 
                    className={`px-2 flex-1`}
                    >
                        <ItemsList 
                            itemsArray={recipe.items} 
                            docRef={docRef} 
                            docProp="items" 
                            showAddItem={showAddIngredient} 
                        />
                    {
                        recipe.items.length > 0 &&
                            <ShoppingListActions 
                                itemsArray={recipe.items} 
                                docRef={docRef} 
                            />
                    }

                </main>
                }
            </div>  : <h1>Loading...</h1>
    )
}

export { RecipeContext }