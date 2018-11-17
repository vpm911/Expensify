// a more complex state with multiple reducer functions;
// a reducer functino defines what an action should do when dispatched.
// it ideally takes two arguments state and action.
// based on the passed arguments, a reducer will return A NEW FRESH state object.
// it should not modify the passed argument objects i.e. it should be a pure function

import { createStore, combineReducers} from 'redux';
import uuid from 'uuid';
import 'babel-plugin-transform-object-rest-spread';
import { create } from 'domain';
 
const demoState = {
    expense:[
        {
            id:'ddf',
            description:'January Rent',
            note: 'This is a payment for the rent of january 2018',
            amount:54000,
            createdAt:0
        }
    ],
    filters:{
        text:'rent',
        sortBy:'amount',
        startDate:undefined,
        endDate:undefined
    }
}

// reducer actions: 
// ADD_EXPENSE
// REMOVE_EXPENSE
// EDIT_EXPENSE
// SET_TEXT_FILTER
// SORT_BY_DATE
// SORT_BY_AMOUNT
// SET_START_DATE
// SET_END_DATE


//1. EXPENSE REDUCER
    // this is a default state - not sure what is the purpse of this
    const expenseReducerDefaultState = [];
    // this is an action generator - returns the desired action object based on the provided parameters and 
    // defaults 
    const addExpense=({
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
    const removeExpense=({id}={})=>{
        return{
            type:'REMOVE_EXPENSE',
            id:id
        }
    };

    const editExpense=(id,updates)=>{
        return{
            type:'EDIT_EXPENSE',
            id:id,
            updates:updates
        }
    };

// This is the actual reducer
    const expenseReducer=(state=expenseReducerDefaultState,action)=>{
        switch(action.type){
            case 'ADD_EXPENSE':
                return state.concat(action.expense);
            case 'REMOVE_EXPENSE':
                return state.filter(({id})=>{return id!=action.id});
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
    }


//2. FILETERS REDUCER
const filtersReducerDefaultState={
    text:'',
    sortBy:'date',
    startDate:undefined,
    endDate:undefined
};
//action generators:
//1 set text  
const setTextFilter=(text='')=>{
    return {
        type:'SET_TEXT_FILTER',
        text
    };
}

//2. set sortby 
const sortByAmount = () =>{
    return {
        type:'SORT_BY_AMUONT'
    }
};

const sortByDate = () =>{
    return {
        type:'SORT_BY_DATE'
    }
};

const setStartDate=(startDate)=>{
    return{
        type:'SET_START_DATE',
        startDate
    }
};

const setEndDate=(endDate)=>{
    return {
        type:'SET_END_DATE',
        endDate
    }
};

const filterReducer=(state=filtersReducerDefaultState, action)=>{
    switch(action.type){
        case 'SET_TEXT_FILTER':
            return {...state, text:action.text}
        case 'SORT_BY_AMOUNT':
            return {...state, sortBy:'amount'};
        case 'SORT_BY_DATE':
            return {...state,sortBy:'date'};
        case 'SET_START_DATE':
            return {...state,startDate:action.startDate};
        case 'SET_END_DATE':
            return {...state,endDate:action.endDate};
        default:
            return state;
    }
}
// store creation using the multiple reducers
// for this we use combineReducers function.
const store = createStore(
    combineReducers(
        {expenses:expenseReducer,
         filters:filterReducer
        }

        )
);

const getVisibleExpenses= (expenses,{text,sortBy, startDate,endDate})=>{
    return expenses.filter((expense)=>{
        const startDateMatcher = typeof startDate!=='number'|| expense.createdAt>=startDate;
        const endDateMatcher = typeof endDate!=='number' || expense.createdAt<=endDate;  
        const textMatcher = expense.description.toLowerCase().includes(text.toLowerCase()); 
        return startDateMatcher && endDateMatcher && textMatcher;
    }).sort((a,b)=>{
        if(sortBy==='amount'){
            return a.amount < b.amount? 1 : -1;
        }
        else if(sortBy==='date'){
            return a.createdAt > b.createdAt ? 1: -1;
        }
    });
};

store.subscribe( ()=>{
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses,state.filters);
    console.log(visibleExpenses);
});

//Add_expense 
console.log('Add : 2 expenses');
const expenseOne = store.dispatch(addExpense({description:'Rent for December',amount:100,createdAt:100}));
const expenseTwo = store.dispatch(addExpense({description:'Coffee',amount:10,createdAt:300}));
//Remove_expense 
console.log('Remove : rent expense');
store.dispatch(removeExpense({id:expenseOne.expense.id}));
console.log('Add : Rent expense back');
store.dispatch(addExpense({description:'Rent for December',amount:100,createdAt:50}));
//Edit_expense
    // spreading object babel plugin:
    // need to install babel-plugin-transform-object-rest-spread : allows us to use {...object,newProp:value} syntax
    // to add new properties to an existing object
    console.log('Edit : change amount of coffee to 30');
store.dispatch(editExpense(expenseTwo.expense.id,{amount:30}));

// FILTERS_CALLS
console.log('Filter: text contains T');
store.dispatch(setTextFilter('T'));
console.log('Filter: text reset');
store.dispatch(setTextFilter());
console.log('Sort: By Date');
store.dispatch(sortByDate());
console.log('Sort: By Amount');
store.dispatch(sortByAmount());
console.log('Filter: startDate 100')
store.dispatch(setStartDate(100));
console.log('Filter: Date reset')
store.dispatch(setStartDate(10));
console.log('Filter: endDate 200');
store.dispatch(setEndDate(200));

// we will break this file down into multiple files for convinience.