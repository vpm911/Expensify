import React from 'react';
import {removeExpense} from '../actions/expenses';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeraljs';


const ExpenseListItem=({id, description,amount,createdAt}) =>(
    <div>
        <Link to={`/edit/${id}`}>
            <h4>Item: {description}</h4>
        </Link>
        <p>Amount: {numeral(amount/100).format('$0.,0.00')}</p>
        <p>Created at:{moment(createdAt).format('do MMM YYYY')}</p>
    </div>  
);


export default connect()(ExpenseListItem);