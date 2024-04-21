import { onSnapshot } from "firebase/firestore"
import { db, recipesCollection } from "../firebase"
import { useEffect, useState } from "react"
import Card from "../components/Card"

export default function RecipesPage() {
    const [recipes, setRecipes] = useState(null)

    useEffect(() => {
        const unsub = onSnapshot(recipesCollection, snapshot => {
            //sync with local state
            const recipesArray = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))

            setRecipes(recipesArray)
        })

        return unsub
    }, [])


    return (
        <div className="min-h-dvh bg-orange-50">
            <header className="text-center text-2xl border-b border-slate-300 py-2 mb-2">
                <h1>Recetas</h1>
            </header>
            <main 
                className="px-2"
            >
                <ul>
                    {
                        recipes.map(recipe => <Card key={recipe.id}>{recipe.name}</Card>)
                    }
                </ul>
            </main>
        </div>
    )
}