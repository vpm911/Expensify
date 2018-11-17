import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import './styles/style.scss';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import {addExpense,removeExpense,editExpense} from './actions/expenses';
import {setTextFilter,setEndDate,setStartDate,sortByAmount,sortByDate} from './actions/filters';
import {getVisibleExpenses}   from './selectors/expenses';
import {Provider,Connect} from 'react-redux';

const store = configureStore();

store.subscribe(()=>{
    const state = store.getState();
    console.log(getVisibleExpenses(state.expenses,state.filters));
});

console.log('Add: Rent');
store.dispatch(addExpense({description:'Rent',amount:100,createdAt:500,note:'This is a test'}));

console.log('Add: Food');
const food = store.dispatch(addExpense({description:'Food',amount:200,createdAt:200,note:'This is a test'}));

console.log('Add: Water');
const water = store.dispatch(addExpense({description:'Water',amount:600,createdAt:300,note:'This is a test'}));

console.log('Remove : Water ')
console.log(water.expense.id);
store.dispatch(removeExpense(water.expense.id));

console.log('Add: Water');
store.dispatch(addExpense({description:'Water',amount:600,createdAt:300,note:'This is a test'}));

console.log('Edit: Food->Amount=300, note: food bill');
store.dispatch(editExpense(food.expense.id,{amount:300,note:'Food Bill'}));

console.log('Filter: text contains oo');
store.dispatch(setTextFilter('oo'));

console.log('Filter: reset')
store.dispatch(setTextFilter());

console.log('Sort: By Amount');
store.dispatch(sortByAmount());

console.log('Sort: By date');
store.dispatch(sortByDate());

const jsx = (
    <div>
        <Provider store={store}>
            <AppRouter></AppRouter>
        </Provider>
    </div>
);

ReactDOM.render(jsx,document.getElementById("app"));