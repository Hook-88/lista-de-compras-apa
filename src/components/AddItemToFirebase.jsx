import Form from "./Form"
import { onSnapshot, doc, addDoc } from "firebase/firestore"
import { db, recipesCollection } from "../firebase"
import { useState } from "react"



export default function AddItemToFireBase({addFunction}) {
    const [formData, setFormData] = useState("")

    function handleChange(event) {
        setFormData(event.target.value)
    }

    function handleSubmit() {
        addFunction(formData)
        setFormData("")
    }

    return (
        <Form className="flex" onSubmit={handleSubmit}>
            <input 
                type="text" 
                className="rounded px-2 pt-2 flex-1 stretch" 
                placeholder="Nombre ingrediente"
                required
                autoFocus
                value={formData}
                onChange={handleChange}
            />
            <button className="px-3 py-2 bg-sky-700 text-white rounded-r">add</button>
        </Form>
    )
}