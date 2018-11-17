import uuid from 'uuid';

export const addExpense=({
    description='',
    note='',
    amount=0,
    createdAt=0
})=>{
    return {
        type:'ADD_EXPENSE',
        expense:{
            id:uuid(),
            description:description,
            note:note,
            amount:amount,
            createdAt:createdAt
        }
    };
}
// action generator to remove expense
export const removeExpense=(id={})=>{
    return{
        type:'REMOVE_EXPENSE',
        id:id
    }
};

export const editExpense=(id,updates)=>{
    return{
        type:'EDIT_EXPENSE',
        id:id,
        updates:updates
    }
};
