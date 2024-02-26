import React from "react";
import ReactDOM from "react-dom/client";

// Using Reacte create element -----------------
/*//const heading =  React.createElement('h1', {id: "heading"}, "Hello World from React")

const parent = React.createElement('div',{id: "parent"}, 
                [React.createElement('div',{id: "child"}, 
                    [React.createElement('h1',{}, 'I am an H1'), React.createElement('h2',{}, 'I am an H2')]
                )],
                React.createElement('div',{id: "child2"}, 
                    [React.createElement('h1',{}, 'I am an H1'), React.createElement('h2',{}, 'I am an H2')]
                )

)

const root = ReactDOM.createRoot(document.getElementById("root"));
//root.render(heading);
root.render(parent); */


//Using JSX Element-----------------
/*const jsxHeading = (<h1 className="head" tabIndex="1">Namaste React from JSX</h1>);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(jsxHeading)*/


//Using React Functional component 

/*const Title = () => (
    <h1>React Title from functional Component</h1>
)

// Component composition
const Heading = () => (
    <div id="container">
        <Title />
        <h1>React Heading from Functional Component</h1>
    </div>
    
)

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(< Heading />)*/