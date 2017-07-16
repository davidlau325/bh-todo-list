import React from 'react';
import ItemList from "../containers/item-list";
import ItemFuncBar from "../containers/item-func-bar";
import ItemNewEntry from "../containers/item-new-entry";
const bhLogo = require('../../img/bh-logo.png');

const App = () => (
    <div className="container-fluid">
        <div className="row">
            <div className="col-xs-4" id="top-bar-logo">
                <img src={bhLogo} width="100%"/>
            </div>
            <div className="col-xs-8" id="top-bar-app">
                <b>To-Do List</b>
            </div>
        </div>
        <br/>
        <div className="row">
            <div className="col-xs-10 col-xs-offset-1">
                <ItemNewEntry/>
            </div>
        </div>
        <div className="row">
            <div className="col-xs-10 col-xs-offset-1">
                <ItemList/>
            </div>
        </div>
        <div className="row">
            <div className="col-xs-10 col-xs-offset-1">
                <ItemFuncBar/>
            </div>
        </div>
    </div>
);

export default App;
