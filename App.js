
//const heading =  React.createElement('h1', {id: "heading"}, "Hello World from React")


{/* <div id="parent">
        <div id="child">
            <h1>I am an H1</h1>
            <h2>I am an H2</h2>
        </div>
         <div id="child2">
            <h1>I am an H1</h1>
            <h2>I am an H2</h2>
        </div>
    </div> 
*/}


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

root.render(parent);
