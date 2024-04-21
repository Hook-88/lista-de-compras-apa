import { useState } from "react"
import { Link } from "react-router-dom"
import { onSnapshot, doc, addDoc } from "firebase/firestore"
import { db, recipesCollection } from "../firebase"
import Card from "../components/Card"

export default function AddNewRecipePage() {
    const [formData, setFormData] = useState("")

    function handleChange(event) {
        setFormData(event.target.value)
    }

    async function addNewRecipe() {
        const docRef = await addDoc(recipesCollection, {
            name: formData
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        addNewRecipe()
        setFormData("")
    }

    return (
        <div className="min-h-dvh bg-orange-50">
            <header className="text-center text-2xl border-b border-slate-300 py-3 mb-2">
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
                    />
                </Card>
                <Card>
                    <Link className="">
                        <h4 className="py-1 text-center">Siguiente</h4>
                    </Link>
                </Card>
            </form>
            </main>
        </div>
    )
}