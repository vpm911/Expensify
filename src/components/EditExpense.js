import React, { Component } from 'react';
import {connect} from 'react-redux';
import ExpenseForm from './ExpenseForm';
import {editExpense,removeExpense} from '../actions/expenses';

const EditExpense =(props) =>{
    console.log(props);
    return (<div>
            <ExpenseForm 
                expense ={props.expense}
                actionOnSubmit={(expense)=>{
                    console.log('Editing expense');
                    props.dispatch(editExpense(props.expense.id, expense));
                    props.history.push('/');
                }}
            />
            <button onClick={(e)=>{
           // console.log('props: id = '+ props.expense.id);
            props.dispatch(removeExpense(props.expense.id));
            props.history.push('/');
        }}>Remove</button>
        </div>);
};

const mapStateToProps = (state,props) =>{
    return {
        expense: state.expenses.find((expense)=>{
            return expense.id === props.match.params.id;
        })
    }
};

export default connect(mapStateToProps)(EditExpense);