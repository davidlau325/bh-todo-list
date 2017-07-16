import React from 'react';
import ItemList from "../containers/item-list";
import ItemFuncBar from "../containers/item-func-bar";
import ItemNewEntry from "../containers/item-new-entry";

const App = () => (
    <div>
        <h1>Brevan Howard | To-Do List</h1>
        <ItemNewEntry/>
        <ItemList/>
        <ItemFuncBar/>
    </div>
);

export default App;
