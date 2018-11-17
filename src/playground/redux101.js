// Redux is a state container that allows all the components to use a common state object
// we create a redux-store using createStore from redux;
// this store allows storing an object, and we can define valid actions on that object 
// then the actions can be called using 'dispatch' method with the type as argument.

import {createstore, createStore} from 'redux';

const store = createStore((state = {count:0},action)=>{
    switch(action.type){
        case 'INCREMENT':
            const increment= typeof action.incrementBy ==='number' ? action.incrementBy :1;
            return {count: state.count+increment};
        case 'DECREMENT':
            const decrement = typeof action.decrementBy === 'number' ? action.decrementBy : 1;
            return {count: state.count - decrement };
        case 'RESET':
            return {count:0};
        case 'SET':
            return {count:action.setto};
        default:
            return state;
    }
});

// the provided function gets called every time the state of store changes
store.subscribe(()=>{
    console.log(store.getState());
});

// HOW TO UNSUBSCRIBE : 
//const unsubscribe = store.subscribe(()=>{
//    console.log(store.getState());
//});
// unsubscribe();


// Dispatching actions : 
store.dispatch({type: 'INCREMENT'});
store.dispatch({type:'INCREMENT', incrementBy:4});
store.dispatch({type:'DECREMENT'});
store.dispatch({type:'DECREMENT',decrementBy:3});
 store.dispatch({type:'RESET'});
 

 // Action Generators: These are arrow functions that return the action object. 
 // this is useful because we can trace back errors that may go un-detected if we misspelled the action 
 // name while calling store.dispatch like above
// example below:

const incrementCount =({incrementBy=1}={})=>{
    return {
        type:'INCREMENT',
        incrementBy : incrementBy
    }
};


const decrementCount =({decrementBy=1}={})=>{
    return {
        type:'DECREMENT',
        decrementBy:decrementBy
    }
}

const resetCount =()=>{
    return {
        type: 'RESET'
    }
}

const setCount=({count})=>{
    return {
        type:'SET',
        setto:count
    };
}

store.dispatch(resetCount());
store.dispatch(setCount({count: 111}));
store.dispatch(incrementCount());
store.dispatch(incrementCount({incrementBy: 9}));
store.dispatch(decrementCount());
store.dispatch(decrementCount({decrementBy:4}));
