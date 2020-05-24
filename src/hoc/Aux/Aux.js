const aux = props => props.children;

export default aux;

 // my own logic for addIngredientHandler ->
        // this.setState(( prevState, prevProps ) => {
            
        //     const ingredients = { ...prevState.ingredients};
        //     ingredients[type] += 1;
            
        //     return {
        //         ingredients,
        //         totalPrice: prevState.totalPrice + INGREDIENT_PRICES[type]
        //     }
        // });