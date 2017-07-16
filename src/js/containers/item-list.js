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
                <li className="list-group-item item-box" key={item.id}>
                    <table className="item-box-table">
                        <tbody>
                        <tr><td width="15%">
                        <div className="item-checkbox">
                            <input type="checkbox" id={"itemCheckbox" + item.id} checked={item.isCompleted} onChange={() => this.handleMarkItemCompleted(item)}/>
                            <label htmlFor={"itemCheckbox" + item.id} />
                            </div>
                        </td>
                        <td width="75%">{item.text}</td>
                        <td width="10%">
                            <button type="button" className="close pull-right" onClick={() => this.handleDeleteItem(item)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </td></tr>
                        </tbody>
                    </table>
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
