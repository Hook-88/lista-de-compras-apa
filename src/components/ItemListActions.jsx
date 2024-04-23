import { db } from "../firebase"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import Card from "./Card"
import Checkbox from "./Checkbox"
import ItemsList from "./ItemsList"
import { FaAngleDown, FaAngleUp} from "react-icons/fa6"
import Menu from "./Menu/Index"

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

    async function addToShoppingList() {
        const shoppingListDocRef = doc(db, "shoppingList", "hcxXIfLt1QQeuwwbuJBo")
        const docSnap = await getDoc(shoppingListDocRef)
        const itemsToAddArray = 
            itemsArray.filter(item => item.checked === true)
                .map(filteredItem => (
                    {
                        ...filteredItem,
                        checked: false
                    }
                ))

        const newItemsArray = 
            [...docSnap.data().items, ...itemsToAddArray]
            //merge array 
                .reduce((uniqueArray, item) => {
                    // if itemObj is not in both arrays
                    if (!uniqueArray.map(obj => obj.name).includes(item.name)) {
                        //add itemObj to unbique array
                        uniqueArray.push(item)
                    }
                    return uniqueArray
                }, [])

        await updateDoc(shoppingListDocRef, { items: newItemsArray})

        unCheckAllItems()
    }

    return (
        <>
        <div className="flex gap-2 text-lg">
            <Card className="p-0 flex">
                <Checkbox  
                    className="p-3 px-2"
                    checked={itemsArray.every(item => item.checked)}
                    onClick={toggleAllChecked}
                    />
            </Card>
            
            <Card className="flex flex-1">
                <button 
                    className="py-1 px-2 w-full bg-emerald-600 text-white rounded-l shadow-sm disabled:opacity-50 flex-grow border-r-2 border-white"
                    onClick={addToShoppingList}
                    disabled={itemsArray.every(item => item.checked === false)}
                >
                    Add to Shopping list
                </button>
                <Menu
                    className="flex relative"
                >
                    <Menu.Button
                        className="bg-emerald-600 px-2 text-white rounded-r shadow-sm disabled:opacity-50 flex items-center"
                    >
                        {open => open ? <FaAngleUp /> : <FaAngleDown />}
                    </Menu.Button>
                    <Menu.Dropdown
                        className="absolute top-10 right-0 bg-white z-10 rounded shadow text-nowrap"
                    >
                        <Menu.Item><button className="py-1 px-2">Edit recipe name</button></Menu.Item>
                        {   
                            oneChecked ?
                            <Menu.Item><button className="py-1 px-2">Edit selected</button></Menu.Item> : null
                        }
                        {
                            itemsArray.some(item => item.checked === true) ?
                            <Menu.Item>
                                <button 
                                    className="py-1 px-2"
                                    onClick={removeSelection}
                                    // disabled={itemsArray.every(item => item.checked === false)}
                                >
                                    Remove selected
                                </button>
                            </Menu.Item> : null
                            }
                        
                    </Menu.Dropdown>
                </Menu>

                
            </Card>

            
        </div>
        </>
        
    )
}