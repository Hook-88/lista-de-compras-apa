import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { onSnapshot, doc, addDoc } from "firebase/firestore"
import { db, recipesCollection } from "../firebase"
import Card from "../components/Card"

export default function AddNewRecipePage() {
    const [formData, setFormData] = useState("")
    const [recipeId, setRecipeId] = useState(null)
    const navigate = useNavigate()

    function handleChange(event) {
        setFormData(event.target.value)
    }

    async function addNewRecipe() {
        const docRef = await addDoc(recipesCollection, {
            name: formData,
            ingredients: []
        })
        setRecipeId(docRef.id)
        navigate(`/recipes/${docRef.id}`) 
    }

    function handleSubmit(event) {
        event.preventDefault()
        addNewRecipe()
        setFormData("")
    }

    return (
        <div className="min-h-dvh bg-orange-50">
            <header className="text-center text-2xl border-b border-slate-300 py-2 mb-2">
                <h1>Agregar Receta</h1>
            </header>
            <main
                className="px-2"
            >
            <form onSubmit={handleSubmit}>
                <Card>
                    <input 
                        type="text" 
                        name="" 
                        className="bg-gray-100 rounded py-1 px-2 w-full" 
                        placeholder="Nombre receta"
                        value={formData}
                        onChange={handleChange}
                        required
                        autoFocus
                    />
                </Card>
                <Card>
                    <button className="py-1 px-2 w-full bg-sky-700 text-white rounded shadow-sm">
                        Agregar
                    </button>
                </Card>
            </form>
            </main>
        </div>
    )
}