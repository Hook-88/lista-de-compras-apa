import Form from "./Form"

import { onSnapshot, doc, addDoc } from "firebase/firestore"
import { db, recipesCollection } from "../firebase"



export default function AddItemToFireBase() {

    // TODO add function to add ingredient

    return (
        <Form className="flex">
            <input 
                type="text" 
                className="rounded px-2 pt-2 flex-1 stretch" 
                placeholder="Nombre ingrediente"
                required
                autoFocus
            />
            <button className="px-3 py-2 bg-sky-700 text-white rounded-r">add</button>
        </Form>
    )
}