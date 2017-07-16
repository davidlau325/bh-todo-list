import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {filterItemList} from '../actions/index';
const {ipcRenderer} = require('electron');

class ItemFuncBar extends Component {
    constructor(props) {
        super(props);
        this.state = {filterType: "All"};
    }

    componentDidMount(){
        ipcRenderer.on('refresh-item-data',() => {
            const currentFilterType = this.state.filterType;
            this.props.filterItemList(currentFilterType);
        });
    }

    handleOnClickItemFilter(filterType) {
        this.setState({filterType: filterType});
        this.props.filterItemList(filterType);
    }

    render() {
        return(
            <table className="item-box-table">
                <tbody>
                <tr><td width="30%"><span className="item-count">{this.props.itemList.length} item{ this.props.itemList.length < 2 ? "" : "s"} left</span>
                </td><td width="70%">
                    <ul className="nav nav-pills">
                        <li className={this.state.filterType === "All" ? "active" : ""}>
                            <a href="#" onClick={() => this.handleOnClickItemFilter("All")}>All</a>
                        </li>
                        <li className={this.state.filterType === "Active" ? "active" : ""}>
                            <a href="#" onClick={() => this.handleOnClickItemFilter("Active")}>Active</a>
                        </li>
                        <li className={this.state.filterType === "Completed" ? "active" : ""}>
                            <a href="#" onClick={() => this.handleOnClickItemFilter("Completed")}>Completed</a>
                        </li>
                    </ul>
                </td></tr>
                </tbody>
            </table>
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

export default connect(mapStateToProps,matchDispatchToProps)(ItemFuncBar);

