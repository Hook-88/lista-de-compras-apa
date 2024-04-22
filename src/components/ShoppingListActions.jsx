import { getDoc, updateDoc } from "firebase/firestore"
import Card from "./Card"
import Checkbox from "./Checkbox"

export default function ShoppingListActions({itemsArray, docRef}) {

    function toggleAllChecked() {
        const allChecked = itemsArray.every(item => item.checked)
        
        if (allChecked) {
            unCheckAllItems()
        } else {
            checkAllItems()
        }  
    }

    async function checkAllItems() {
        const docSnap = await getDoc(docRef)

        const newItemsArray = docSnap.data().items.map(item => ({
            ...item,
            checked: true
        }))

        await updateDoc(docRef, { items: newItemsArray })

    }

    async function unCheckAllItems() {
        const docSnap = await getDoc(docRef)

        const newItemsArray = docSnap.data().items.map(item => ({
            ...item,
            checked: false
        }))

        await updateDoc(docRef, { items: newItemsArray })

    }
    
    async function removeSelection() {
        const docSnap = await getDoc(docRef)

        const newItemsArray = docSnap.data().items.filter(item => item.checked === false)

        await updateDoc(docRef, { items: newItemsArray})   
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