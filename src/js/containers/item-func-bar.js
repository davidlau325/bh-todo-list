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
            <div>
                <span>{this.props.itemList.length} items left</span>
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
            </div>
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

