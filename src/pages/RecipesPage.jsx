import { Link } from "react-router-dom"
import { onSnapshot } from "firebase/firestore"
import { db, recipesCollection } from "../firebase"
import { useEffect, useState } from "react"
import Card from "../components/Card"
import { FaPlus } from "react-icons/fa6"
import getCapString from "../utility/getCapString"

export default function RecipesPage() {
    const [recipes, setRecipes] = useState(null)

    useEffect(() => {
        const unsub = onSnapshot(recipesCollection, snapshot => {   
            //sync with local state
            const recipesArray = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            })).sort((a, b) => a.name.localeCompare(b.name))

            setRecipes(recipesArray)
        })

        return unsub
    }, [])


    return (
        <div className="min-h-dvh bg-orange-50">
            <header className="text-2xl border-b border-slate-300 py-2 mb-2 flex justify-between items-center">
                <FaPlus className="text-transparent"/>
                <h1>Recetas</h1>
                <Link to="/add-new-recipe">
                    <button className="pr-2 flex">
                        <FaPlus />
                    </button>
                </Link>
            </header>
            <main 
                className="px-2"
            >
                <ul>
                    {
                        recipes?.map(recipe => (
                            <Link to={recipe.id} key={recipe.id}>
                                <Card>{getCapString(recipe.name)}</Card>
                            </Link>
                        ))
                    }
                </ul>
            </main>
        </div>
    )
}