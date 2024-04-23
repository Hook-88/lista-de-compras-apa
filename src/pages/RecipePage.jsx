import { Link, useParams } from "react-router-dom"
import { onSnapshot, doc, updateDoc, getDoc } from "firebase/firestore"
import { db, recipesCollection } from "../firebase"
import { createContext, useEffect, useRef, useState } from "react"
import { FaPlus, FaCheck } from "react-icons/fa6"
import useToggle from "../hooks/useToggle"
import getCapString from "../utility/getCapString"
import ChangeItemInFirebase from "../components/ChangeItemInFirebase"


import ItemsList from "../components/ItemsList"
import ItemsListActions from "../components/ItemListActions"

const RecipeContext = createContext()

export default function RecipePage() {
    const { id } = useParams()
    const [recipe, setRecipe] = useState(null)
    const [editRecipeName, toggleEditRecipeName] = useToggle(false)
    const [showAddIngredient, toggleShowAddIngredient] = useToggle(false)
    // ref to document in firebase
    const docRef = doc(db, "recipes", id)

    useEffect(() => {
        const unsub = onSnapshot(docRef, snapshot => {
            // sync with local state
            const recipeObj = {
                ...snapshot.data(),
                id: id,
            }
            setRecipe(recipeObj)
        })

        return unsub
    },[])

    async function editRecipeNameInFirebase(value) {
        await updateDoc(docRef, {name: value.trim().toLowerCase()})
    }

    function handleNameChange() {
        toggleEditRecipeName()
    }

    return (
        recipe ?
            <div className="min-h-dvh bg-orange-50">
                {/*  */}
                {
                    editRecipeName ? 
                    <header className="text-2xl border-b border-slate-300 py-2 px-2 mb-2 flex justify-between items-center">
                        <ChangeItemInFirebase initialValue={recipe.name} changeFunction={editRecipeNameInFirebase} onSubmit={handleNameChange}/>
                    </header> :
                    
                    <header className="text-2xl border-b border-slate-300 py-2 mb-2 flex justify-between items-center">
                        <FaCheck className="text-transparent px-3"/>
                        <h1 className="">{getCapString(recipe.name)}</h1>
                        <button className="px-3" onClick={toggleShowAddIngredient}>
                            { showAddIngredient ? <FaCheck /> : <FaPlus />}
                        </button>
                    </header>
                }
                
                <main 
                    className="px-2"
                    >
                    <ItemsList 
                        itemsArray={recipe?.ingredients} 
                        docRef={docRef} 
                        docProp="ingredients" 
                        showAddItem={showAddIngredient} 
                    />
                    {
                        recipe.ingredients?.length > 0 &&
                            <ItemsListActions 
                                itemsArray={recipe?.ingredients} 
                                docRef={docRef} 
                                docProp="ingredients"
                                toggleEditRecipeName={toggleEditRecipeName}
                            />
                    }
                </main>
            </div>  : <h1>Loading....</h1>
    )
}

export { RecipeContext }