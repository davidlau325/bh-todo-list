window.jQuery = require('jquery');
require('bootstrap');
require('bootstrap/dist/css/bootstrap.css');
import './index.html';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import UserDetail from './components/user-detail';
import AddEntry from './components/add-entry';

const App = () => {

    return (
        <div><h1>Hello World</h1>
    <UserDetail/><br/>
    <AddEntry/>
    </div>
);
};

ReactDOM.render(<App />, document.getElementById('root'));
