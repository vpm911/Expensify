// Higher order component - a component that renders other component
// it is a design-pattern like thing
// used to :
// facilitate Reuse of code
// Render Highjacking
// Prop manipulation
// Abstract state

import React from 'react';
import ReactDOM from 'react-dom';

const Info=(props)=>{
    return(<div>
        <h2>Info</h2>
        <p>The info is : {props.info}</p>
    </div>);
};

const withAdminWarning =(WrappedComponent)=> {
    // :::: NOTE THIS RETURN SYNTAX::::
    return (props)=>(
        <div>
            {props.isAdmin && <p>This is Admin-only info. Please don't share!</p>}
            <WrappedComponent {...props}/>
        </div>
    );
};

const AdminInfo = withAdminWarning(Info);

const requireAuthentication=(WrappedComponent)=>{
    return(props)=>(
    <div>
      {props.isAuthenticated ? <WrappedComponent {...props} /> : <p>Please login to see the info</p>}
    </div> 
    );
};

const AuthInfo =  requireAuthentication(Info);

ReactDOM.render(
<div>
    <AdminInfo isAdmin={false} info="These are the details"/> 
    <br></br><hr></hr>
    <AdminInfo isAdmin={true} info="These are the details"/>
    <br></br><hr></hr>
    <AuthInfo isAuthenticated={true} info='These are the details'/>
    <br></br><hr></hr>
    <AuthInfo isAuthenticated={false} info='These are the details'/>
</div>,document.getElementById('app'));


