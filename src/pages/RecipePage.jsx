import { Link, useParams } from "react-router-dom"
import { onSnapshot, doc, updateDoc, getDoc } from "firebase/firestore"
import { db, recipesCollection } from "../firebase"
import { createContext, useEffect, useState } from "react"
import { nanoid } from "nanoid"
import Card from "../components/Card"
import Listitem from "../components/Listitem"
import AddItemToFireBase from "../components/AddItemToFirebase"

const RecipeContext = createContext()

export default function RecipePage() {
    const { id } = useParams()
    const [recipe, setRecipe] = useState(null)

    useEffect(() => {
        const docRef = doc(db, "recipes", id)
        const unsub = onSnapshot(docRef, snapshot => {
            // sync with local state
            const recipeObj = {
                ...snapshot.data(),
                id: id
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
            id: nanoid()
        }
        const newIngredientsArray = [...docSnap.data().ingredients, ingredientObj]

        await updateDoc(docRef, { ingredients: newIngredientsArray})   
    }

    return (
        recipe ?
            <RecipeContext.Provider value={{addIngredient}}>
            <div className="min-h-dvh bg-orange-50">
                <header className="text-center text-2xl border-b border-slate-300 py-2 mb-2">
                    <h1>{recipe.name}</h1>
                </header>
                <main 
                    className="px-2"
                    >
                    <Card className="pt-1">
                        <ul>
                            {
                                recipe.ingredients.map(ingredient => (
                                    <Listitem key={ingredient.id}>{ingredient.name}</Listitem>
                                ))
                            }
                            <Listitem className="p-0"><AddItemToFireBase addFunction={addIngredient}/></Listitem>
                        </ul>
                    </Card>
                </main>
            </div> 
            </RecipeContext.Provider> : <h1>Loading...</h1>
    )
}

export { RecipeContext }