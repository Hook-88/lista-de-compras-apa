import Card from "./Card"
import Ingredient from "./Ingredient"
import Listitem from "./Listitem"
import AddItemToFireBase from "./AddItemToFirebase"

export default function IngredientsList({ingredientsArray, toggleChecked}) {

    return (
        <Card className="pt-1">
            <ul>
                {
                    ingredientsArray.map(ingredient => (
                        <Ingredient 
                            key={ingredient.id}
                            onClick={() => toggleChecked(ingredient.id)}
                            ingredientObj={ingredient}
                        />
                    ))
                }
                {
                    showAddIngredient ? <Listitem className="p-0"><AddItemToFireBase addFunction={() => {}}/></Listitem> : null
                } 
                
            </ul>
        </Card>
    )
}