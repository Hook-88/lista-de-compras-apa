import { Link, useParams } from "react-router-dom"
import { onSnapshot, doc, updateDoc, getDoc } from "firebase/firestore"
import { db, recipesCollection } from "../firebase"
import { createContext, useEffect, useRef, useState } from "react"
import { nanoid } from "nanoid"
import Card from "../components/Card"
import Listitem from "../components/Listitem"
import Checkbox from "../components/Checkbox"
import AddItemToFireBase from "../components/AddItemToFirebase"
import { FaPlus, FaCheck } from "react-icons/fa6"
import useToggle from "../hooks/useToggle"
import getCapString from "../utility/getCapString"
import Ingredient from "../components/Ingredient"

import ItemsList from "../components/ItemsList"

const RecipeContext = createContext()

export default function RecipePage() {
    const { id } = useParams()
    const [recipe, setRecipe] = useState(null)
    const [showAddIngredient, toggleShowAddIngredient] = useToggle(false)
    const [ noneSelected, setNoneSelected ] = useState(true)
    const [ oneSelected, setOneSelected] = useState(false)
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

    useEffect(() => {
        const noneChecked = recipe?.ingredients.every(ingredient => ingredient.checked === false)
        const oneChecked = recipe?.ingredients.filter(ingredient => ingredient.checked === true).length === 1
        
        setNoneSelected(noneChecked)
        setOneSelected(oneChecked)
        
    }, [recipe])

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
        const docSnap = await getDoc(docRef)

        const newIngredientsArray = docSnap.data().ingredients.filter(ingredient => ingredient.id !== ingredientId)

        await updateDoc(docRef, { ingredients: newIngredientsArray})   
    }

    async function removeSelection() {
        const docSnap = await getDoc(docRef)

        const newIngredientsArray = docSnap.data().ingredients.filter(ingredient => ingredient.checked === false)

        await updateDoc(docRef, { ingredients: newIngredientsArray})   
    }

    async function checkIngredient(ingredientId, checkValue) {
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

    async function checkAllItems() {
        const docSnap = await getDoc(docRef)

        const newIngredientsArray = docSnap.data().ingredients.map(ingredient => ({
            ...ingredient,
            checked: true
        }))

        await updateDoc(docRef, { ingredients: newIngredientsArray })

    }

    async function unCheckAllItems() {
        const docSnap = await getDoc(docRef)

        const newIngredientsArray = docSnap.data().ingredients.map(ingredient => ({
            ...ingredient,
            checked: false
        }))

        await updateDoc(docRef, { ingredients: newIngredientsArray })

    }

    function toggleAllChecked() {
        const allChecked = recipe.ingredients.every(ingredient => ingredient.checked)
        
        if (allChecked) {
            unCheckAllItems()
        } else {
            checkAllItems()
        }
        
    }

    return (
        recipe ?
            <RecipeContext.Provider value={{addIngredient}}>
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
                        itemsArray={recipe?.ingredients} 
                        docRef={docRef} 
                        docProp="ingredients" 
                        showAddItem={showAddIngredient} 
                        addFunction={addIngredient}
                    />

                    <Card className="pt-1">
                        <ul>
                            {
                                recipe.ingredients.map(ingredient => (
                                    <Ingredient 
                                        key={ingredient.id}
                                        onClick={() => toggleChecked(ingredient.id)}
                                        ingredientObj={ingredient}
                                    />
                                ))
                            }
                            {/* {
                                showAddIngredient ? <Listitem className="p-0"><AddItemToFireBase addFunction={addIngredient}/></Listitem> : null
                            }  */}
                            
                        </ul>
                    </Card>
                    <div className="flex gap-2 text-lg">
                        <Card className="p-0 flex">
                            <Checkbox  
                                className="p-3 px-2"
                                checked={recipe.ingredients.every(ingredient => ingredient.checked)}
                                onClick={toggleAllChecked}
                            />
                        </Card>
                        <Card className="flex flex-1 gap-2">
                            <button 
                                className="py-1 px-2 w-full bg-sky-600 text-white rounded shadow-sm disabled:opacity-50"
                                onClick={() => {}}
                                disabled={!oneSelected}
                            >
                                Edit
                            </button>
                            <button 
                                className="py-1 px-2 w-full bg-red-600 text-white rounded shadow-sm disabled:opacity-50"
                                onClick={removeSelection}
                                disabled={noneSelected}
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