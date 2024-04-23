import Form from "./Form"
import { onSnapshot, doc, addDoc } from "firebase/firestore"
import { db, recipesCollection } from "../firebase"
import { useState, useRef } from "react"
import getCapString from "../utility/getCapString"



export default function ChangeItemInFirebase({onSubmit = () => {}, changeFunction, initialValue = ""}) {
    const [formData, setFormData] = useState(initialValue)
    const inputRef = useRef()

    function handleChange(event) {
        setFormData(event.target.value)
    }

    function handleSubmit() {
        changeFunction(formData)
        onSubmit()
    }

    return (
        <Form className="flex flex-1" onSubmit={handleSubmit}>
            <input 
                type="text" 
                className="rounded flex-1 stretch text-center" 
                placeholder="Nombre ingrediente"
                required
                autoFocus
                value={getCapString(formData)}
                onChange={handleChange}
                ref={inputRef}
            />
        </Form>
    )
}