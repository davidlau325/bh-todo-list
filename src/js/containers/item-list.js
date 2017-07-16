import React, {Component} from 'react';
import {connect} from 'react-redux';
const remote = require('electron').remote;
const {ipcRenderer} = require('electron');

class ItemList extends Component {

    handleMarkItemCompleted(target){
        var itemList = remote.getGlobal('sharedData').itemList;
        var updatedItemList = itemList.map((item) => {
            if(item === target){
                item.isCompleted = !item.isCompleted;
            }
            return item;
        });

        remote.getGlobal('sharedData').itemList = updatedItemList;
        ipcRenderer.send('item-list-update');
    }

    handleDeleteItem(target){
        var itemList = remote.getGlobal('sharedData').itemList;
        var updatedItemList = itemList.filter((item) => {
            return item != target;
        });

        remote.getGlobal('sharedData').itemList = updatedItemList;
        ipcRenderer.send('item-list-update');
    }

    renderItemList(){
        if(!this.props.itemList){
            return(<li></li>)
        }
        return this.props.itemList.map((item) => {
            return(
                <li className="list-group-item" key={item.id}>
                    <input type="checkbox" checked={item.isCompleted} onChange={() => this.handleMarkItemCompleted(item)}/> {item.text}
                    <button type="button" className="close" onClick={() => this.handleDeleteItem(item)}><span aria-hidden="true">&times;</span></button>
                </li>
            )
        });
    }

    render() {
        return (
            <ul className="list-group">
                {this.renderItemList()}
            </ul>
        );
    }
}

function mapStateToProps(state){
    return {
        itemList: state.itemList
    };
}

export default connect(mapStateToProps)(ItemList);
