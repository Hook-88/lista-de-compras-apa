import { Link, useParams } from "react-router-dom"
import { onSnapshot, doc } from "firebase/firestore"
import { db, recipesCollection } from "../firebase"
import { useEffect, useState } from "react"
import Card from "../components/Card"
import Listitem from "../components/Listitem"

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


    return (
        recipe ?
            <div className="min-h-dvh bg-orange-50">
                <header className="text-center text-2xl border-b border-slate-300 py-2 mb-2">
                    <h1>{recipe.name}</h1>
                </header>
                <main 
                    className="px-2"
                >
                    <Card className="pt-1">
                        <ul>
                            <Listitem>kaas</Listitem>
                            <Listitem>ham</Listitem>
                            <Listitem>sla</Listitem>
                        </ul>
                    </Card>
                </main>
            </div> : <h1>Loading...</h1>
    )
}