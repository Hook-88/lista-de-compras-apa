import { getDoc, updateDoc } from "firebase/firestore"
import Card from "./Card"
import Checkbox from "./Checkbox"

export default function ItemsListActions({itemsArray, docRef, docProp}) {
    const oneChecked = itemsArray.filter(item => item.checked === true).length === 1

    async function checkAllItems() {
        const docSnap = await getDoc(docRef)

        const newItemsArray = docSnap.data()[docProp].map(item => ({
            ...item,
            checked: true
        }))

        await updateDoc(docRef, { [docProp]: newItemsArray })

    }

    async function unCheckAllItems() {
        const docSnap = await getDoc(docRef)

        const newItemsArray = docSnap.data()[docProp].map(item => ({
            ...item,
            checked: false
        }))

        await updateDoc(docRef, { [docProp]: newItemsArray })

    }

    function toggleAllChecked() {
        const allChecked = itemsArray.every(item => item.checked)
        
        if (allChecked) {
            unCheckAllItems()
        } else {
            checkAllItems()
        }
        
    }

    async function removeSelection() {
        const docSnap = await getDoc(docRef)

        const newItemsArray = docSnap.data()[docProp].filter(item => item.checked === false)

        await updateDoc(docRef, { [docProp]: newItemsArray})   
    }

    
    return (
        <div className="flex gap-2 text-lg">
            <Card className="p-0 flex">
                <Checkbox  
                    className="p-3 px-2"
                    checked={itemsArray.every(item => item.checked)}
                    onClick={toggleAllChecked}
                />
            </Card>
            <Card className="flex flex-1 gap-2">
                <button 
                    className="py-1 px-2 w-full bg-sky-600 text-white rounded shadow-sm disabled:opacity-50"
                    onClick={() => {}}
                    disabled={!oneChecked}
                >
                    Edit
                </button>
                <button 
                    className="py-1 px-2 w-full bg-red-600 text-white rounded shadow-sm disabled:opacity-50"
                    onClick={removeSelection}
                    disabled={itemsArray.every(item => item.checked === false)}
                >
                    Borrar
                </button>
                
            </Card>
        </div>
    )
}