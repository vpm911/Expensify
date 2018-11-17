//1. EXPENSE REDUCER
    // this is a default state - not sure what is the purpse of this
const expenseReducerDefaultState = [];

const expenseReducer=(state=expenseReducerDefaultState,action)=>{
    switch(action.type){
        case 'ADD_EXPENSE':
            return state.concat(action.expense);
        case 'REMOVE_EXPENSE':
            return state.filter(({id})=>{
                return id!==action.id });
        case 'EDIT_EXPENSE':
        //This is a complex syntax, ... is the spread operation.
        // this syntax will update the existing properties in expense with new values from action.expense
            return state.map((expense)=>{
                if(expense.id===action.id){
                    console.log('found a match-- updating')
                    return {
                        ...expense,
                        ...action.updates 
                    };
                }
                else 
                    return expense;
            });
        default: 
            return state;
    }
};

export default expenseReducer;