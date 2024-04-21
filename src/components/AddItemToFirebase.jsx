import Form from "./Form"

export default function AddItemToFireBase() {

    return (
        <Form className="flex">
            <input 
                type="text" 
                className="bg-gray-100 rounded px-2 pt-2 flex-1 stretch" 
                placeholder="Nombre ingrediente"
                required
                autoFocus
            />
            <button className="px-3 py-2 bg-sky-700 text-white ">add</button>
        </Form>
    )
}