import React from 'react';
import {setTextFilter} from '../actions/filters';
import {connect} from 'react-redux';
import 'react-dates/initialize';
import {sortByAmount,sortByDate,setStartDate, setEndDate} from '../actions/filters';
import {DateRangePicker} from 'react-dates';

class ExpenseListFilter extends React.Component {
    state = {
        dateFocused: null   // this is required by react-dates
    };

    render(){
        return (
        <div>
            <input type="text" defaultValue={this.props.filters.text}
                onChange={
                    (e)=>{
                        this.props.dispatch(setTextFilter(e.target.value));
                        console.log(e.target.value);
                    }
                }/>
            <select 
                defaultValue={this.props.filters.sortBy}
                onChange={(e)=>{
                        if(e.target.value==='date'){
                            console.log('Sort by date dispatched');
                            this.props.dispatch(sortByDate());
                            
                        }
                        else{
                            console.log('sort by amount dispatched');
                            this.props.dispatch(sortByAmount());
                        }
                    }   
                    }
                >
                <option value="date">Date</option>
                <option value="amount">Amount</option>
            </select>
            
            <DateRangePicker 
                startDateId='startDate'
                startDate={this.props.filters.startDate}
                endDateId='endDate'
                endDate={this.props.filters.endDate}
                onDatesChange={this.onDatesChange}
                focusedInput={this.state.dateFocused}
                onFocusChange={this.onFocusChange}
                isOutsideRange={()=>(false)}
                numberOfMonths={1}
                showClearDates={true}
            />
        </div>
        );
    };

    onDatesChange = ({startDate,endDate}) =>{
        this.props.dispatch(setStartDate(startDate));
        this.props.dispatch(setEndDate(endDate)); 
    };

    onFocusChange = (dateFocused) =>{
        this.setState(()=>({dateFocused}));
    } 
}


const mapStateToProps = (state) =>{
    return {
        filters: state.filters
    };
};

export default connect(mapStateToProps)(ExpenseListFilter);