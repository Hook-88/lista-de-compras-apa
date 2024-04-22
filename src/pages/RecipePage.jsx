import { Link, useParams } from "react-router-dom"
import { onSnapshot, doc, updateDoc, getDoc } from "firebase/firestore"
import { db, recipesCollection } from "../firebase"
import { createContext, useEffect, useState } from "react"
import { nanoid } from "nanoid"
import Card from "../components/Card"
import Listitem from "../components/Listitem"
import Checkbox from "../components/Checkbox"
import AddItemToFireBase from "../components/AddItemToFirebase"
import { FaPlus, FaCheck } from "react-icons/fa6"
import useToggle from "../hooks/useToggle"

const RecipeContext = createContext()

export default function RecipePage() {
    const { id } = useParams()
    const [recipe, setRecipe] = useState(null)
    const [showAddIngredient, toggleShowAddIngredient] = useToggle(false)

    useEffect(() => {
        const docRef = doc(db, "recipes", id)
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

    async function addIngredient(value) {
        const docRef = doc(db, "recipes", id)
        const docSnap = await getDoc(docRef)
        const ingredientObj = {
            name: value,
            id: nanoid(),
            checked: false
        }
        const newIngredientsArray = [...docSnap.data().ingredients, ingredientObj]

        await updateDoc(docRef, { ingredients: newIngredientsArray})   
    }

    async function removeIngredient(ingredientId) {
        const docRef = doc(db, "recipes", id)
        const docSnap = await getDoc(docRef)

        const newIngredientsArray = docSnap.data().ingredients.filter(ingredient => ingredient.id !== ingredientId)

        await updateDoc(docRef, { ingredients: newIngredientsArray})   
    }

    async function removeSelection() {
        const docRef = doc(db, "recipes", id)
        const docSnap = await getDoc(docRef)

        const newIngredientsArray = docSnap.data().ingredients.filter(ingredient => ingredient.checked === false)

        await updateDoc(docRef, { ingredients: newIngredientsArray})   
    }

    async function checkIngredient(ingredientId, checkValue) {
        const docRef = doc(db, "recipes", id)
        const docSnap = await getDoc(docRef)

        const newIngredientsArray = docSnap.data().ingredients.map(ingredient => {
            if (ingredient.id === ingredientId) {
                
                return {...ingredient, checked: checkValue}
            } else {

                return ingredient
            }
        })

        await updateDoc(docRef, { ingredients: newIngredientsArray }) 
    }

    async function toggleChecked(ingredientId) {
        const docRef = doc(db, "recipes", id)
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
        recipe ?
            <RecipeContext.Provider value={{addIngredient}}>
            <div className="min-h-dvh bg-orange-50">
                <header className="text-center text-2xl border-b border-slate-300 py-2 mb-2">
                    <h1 className="">{recipe.name}</h1>
                    <button className="absolute top-0 right-0 p-3" onClick={toggleShowAddIngredient}>
                        { showAddIngredient ? <FaCheck /> : <FaPlus />}
                    </button>
                </header>
                <main 
                    className="px-2"
                    >
                    <Card className="pt-1">
                        <ul>
                            {
                                recipe.ingredients.map(ingredient => (
                                    <Listitem 
                                        key={ingredient.id}
                                        onClick={() => toggleChecked(ingredient.id)}
                                        className="cursor-pointer text-lg flex gap-2 items-center"
                                    >
                                        <Checkbox checked={ingredient.checked} />
                                        {ingredient.name}
                                    </Listitem>
                                ))
                            }
                            {
                                showAddIngredient ? <Listitem className="p-0"><AddItemToFireBase addFunction={addIngredient}/></Listitem> : null
                            } 
                            
                        </ul>
                    </Card>
                    <div className="flex gap-2 text-lg">
                        {/* <Card className="p-0 flex">
                            <Checkbox  
                                className="p-3 px-2"
                                checked={recipe.ingredients.every(ingredient => ingredient.checked)}
                            />
                        </Card> */}
                        <Card className="flex-1">
                            <button 
                                className="py-1 px-2 w-full bg-red-700 text-white rounded shadow-sm"
                                onClick={removeSelection}
                            >
                                Borrar
                            </button>
                        </Card>
                    </div>
                </main>
            </div> 
            </RecipeContext.Provider> : <h1>Loading...</h1>
    )
}

export { RecipeContext }