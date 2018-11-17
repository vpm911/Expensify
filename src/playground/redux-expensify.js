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


    // this is an action generator - returns the desired action object based on the provided parameters and 
    // defaults 
  
// This is the actual reducer



//action generators:
//1 set text  





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