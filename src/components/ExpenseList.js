import React from 'react';
import {connect} from 'react-redux';
import ConnectedExpenseListItem from './ExpenseListItem';
import {getVisibleExpenses} from '../selectors/expenses';
import ConnectedExpenseListFilter from '../components/ExpenseListFilter';

const ExpenseList = (props) => (
    <div>
        <h2>Expense List Component</h2>
        <ConnectedExpenseListFilter />
        <p>{props.expense_array.length}</p>
        {props.expense_array.map((expense,index)=>{
            return <ConnectedExpenseListItem 
                         {...expense}
                        key={index}
                        />
        })}
    </div>
);

const mapStateToProps = (state)=>{
    return {
        expense_array: getVisibleExpenses(state.expenses,state.filters)
        };
};

// connect() returns a function and we need to call that function.
// the argument to connect(*arg*) is a function that determines what things we want from the state object
// it picks it up from state and returns as a new object - mapStateToProps fucntion in this case

const ConnectedExpenseList = connect(mapStateToProps)(ExpenseList);

export default ConnectedExpenseList;

// instead of exporting 