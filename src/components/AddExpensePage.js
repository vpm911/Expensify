import React, { Component } from 'react';
import ExpenseForm from './ExpenseForm';
import {addExpense} from '../actions/expenses';
import {connect} from 'react-redux';

const AddExpensePage = (props) => {
    return (
    <ExpenseForm 
        actionOnSubmit={(expense)=>{
            // this function will be executed by the ExpenseForm to add the expense
            console.log(expense);
            console.log('AddExpense dispatching addExpense action');
            props.dispatch(addExpense(expense));
            props.history.push('/'); // to redirect to dashboard after expense is added
        }} />
    );
};


export default connect()(AddExpensePage);