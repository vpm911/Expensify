import React from 'react';
import {removeExpense} from '../actions/expenses';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const ExpenseListItem=({id, description,amount,createdAt}) =>(
    <div>
        <Link to={`/edit/${id}`}>
            <h4>Item: {description}</h4>
        </Link>
        <p>Amount: {amount}</p>
        <p>Created at:{ createdAt}</p>
    </div>  
);


export default connect()(ExpenseListItem);