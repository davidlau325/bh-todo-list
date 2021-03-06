import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {filterItemList} from '../actions/index';
const remote = require('electron').remote;
const {ipcRenderer} = require('electron');

class ItemNewEntry extends Component {

    constructor(props) {
        super(props);
        this.handleInputKeyPress = this.handleInputKeyPress.bind(this);
    }

    handleInputKeyPress(target){
        if(target.charCode == 13){
            var itemList = remote.getGlobal('sharedData').itemList;
            var itemLatestID = remote.getGlobal('sharedData').itemLatestID;
            var itemLatestID = ++itemLatestID;

            itemList.push({
                id: itemLatestID,
                text: this.itemInput.value,
                isCompleted: false
            });

            remote.getGlobal('sharedData').itemList = itemList;
            remote.getGlobal('sharedData').itemLatestID = itemLatestID;
            ipcRenderer.send('item-list-update');

            this.itemInput.value = "";
        }
    }

    render() {
        return(
            <ul className="list-group">
                <li className="list-group-item">
                <table className="item-box-table">
                    <tbody>
                    <tr><td>
                        <span className="glyphicon glyphicon-chevron-down" />
                    </td><td>
                    <input id="item-new-entry-input" type="text" placeholder="What needs to be done?" onKeyPress={this.handleInputKeyPress}
                        ref={(input) => {this.itemInput = input;}} />
                    </td></tr>
                    </tbody>
                </table>
                </li>
            </ul>
        );
    }
}

function mapStateToProps(state) {
    return {
        itemList: state.itemList
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({filterItemList: filterItemList}, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(ItemNewEntry);

