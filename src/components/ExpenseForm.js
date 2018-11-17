import React from 'react';
import moment from 'moment';
import {SingleDatePicker} from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
const now = moment();

console.log(now.format('MMM Do'));

export default class ExpenseForm extends React.Component {
   constructor(props){
       super(props);
        this.state={
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? (props.expense.amount/100).toString() : 0,
            createdAt: props.expense ? moment(props.expense.createdAt) :moment(),
            dateFocused: false,
            error:''
    }
   }
    
    
    onDescriptionChange=(e)=>{
        const description = e.target.value;
        this.setState(()=>{ 
        return {description:description};
        }); 
    };

    onNoteChange = (e)=>{
        const note = e.target.value;
        this.setState(()=>({note}));
    };

    onAmountChange = (e) => {
        const amount = e.target.value;
        if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/))
        {
            this.setState(()=>({amount}));
        }
    };

    onDateChange = (createdAt) =>{
        if(createdAt)
            this.setState(()=>({createdAt:createdAt}));
    };

    onDateFocusChange = ({ focused }) =>{
        this.setState(()=>( { dateFocused : focused }));
    };

    onSubmit = (e) =>{
        e.preventDefault();
        if(!this.state.description || !this.state.amount){
            // show error message : please provide desc
            this.setState(()=>{
                return {error:'Please enter description and amount'};
            });
            
        }
        else{
            // Now we are using ExpenseForm in both : AddExpense and EditExpense ;
            // therefore we do not define action dispatch in this component , instead we will pass this as prop 
            // from the parent component that uses ExpenseForm.
            // we will pass the action editExpense() if we are using ExpenseForm in EditExpense component
            // and we will pass action addExpense() if we are using ExpenseForm in AddExpense component.

            this.setState(()=>({error:undefined}));
            this.props.actionOnSubmit({
                description:this.state.description,
                amount: parseFloat(this.state.amount,10) * 100 , // storing in paise
                createdAt: this.state.createdAt.valueOf(), // valueOf gives back unix timestamp .. we want to store as it
                note:this.state.note

            });

        }

    }

    render(){
        return(
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit}>
                    <input 
                        type="text" 
                        placeholder="Description" 
                        autoFocus
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                        ></input>
                    <input 
                        type="text" 
                        placeholder="Amount"
                        value={this.state.amount}
                        onChange={this.onAmountChange}></input>
                    <SingleDatePicker
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.dateFocused}
                        onFocusChange={this.onDateFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={()=> (false)}
                    />
                    <textarea 
                        value={this.state.note}
                        placeholder="Add a note for your expense"
                        onChange={this.onNoteChange}
                        ></textarea>
                    <button>Add Expense</button>
                </form>
            </div>
        );
    }
}