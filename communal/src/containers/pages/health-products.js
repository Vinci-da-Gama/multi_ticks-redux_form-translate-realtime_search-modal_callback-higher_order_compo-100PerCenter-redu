import React, { Component } from 'react';

import NestedModalContainer from '../modal/nested-modal';
import { GeneratesCheckboxes } from '../../helpers/generates-chks';

class HealthProductsCompo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkboxes: {
                chbx0: '',
                chbx1: '',
                chbx2: '',
                chbx3: ''
            },
            firstModal: false,
            nestedModal: false,
            closeAll: false,
            modalClass: 'modal-dialog rounded-0 modal-dialog-centered'
        };
    }

    handleCheckboxSelection(e) {
        const name = e.target.name;
        const relayObj = Object.keys(this.state.checkboxes).reduce((tmpObj, currentItem) => {
            if (currentItem === name) {
                tmpObj[currentItem] = (e.target.value === '')? name : '';
            } else if (currentItem !== name && this.state.checkboxes[currentItem] !== '') {
                tmpObj[currentItem] = this.state.checkboxes[currentItem];
            } else {
                tmpObj[currentItem] = '';
            }
            return tmpObj;
        }, {});
        console.log('35 -- relayObj: ', relayObj);
        this.setState({
            checkboxes: relayObj
        });
    }

    toggleFirstModal() {
        console.log('42 -- kai...');
        this.setState({
            firstModal: !this.state.firstModal
        });
    }

    toggleNestedModal() {
        console.log('49 -- 2kai...');
        this.setState({
            nestedModal: !this.state.nestedModal,
            closeAll: false
        });
    }

    closeAllModals() {
        console.log('57 -- 3kai...');
        this.setState({
            nestedModal: !this.state.nestedModal,
            closeAll: true
        });
    }

    render () {
        return (
            <div className="row mx-3">
                <div>
                    1. multiple checkbox and Nested modal callback  2. high Order Component show other component  3. realtime search, reselect and redux-form  4. translation  5. test  6.  recursion
                </div>
                <div className="col-12 col-sm-6 col-lg-3">
                    <ul className="list-group">
                        <GeneratesCheckboxes chksState={this.state.checkboxes} handleSelect={(evt) => this.handleCheckboxSelection(evt)} />
                        <li className="list-group-item">
                            <button type="button" className="btn btn-primary" onClick={() => this.toggleFirstModal()}>
                                Choose_Checkboxes
                            </button>
                        </li>
                    </ul>
                </div>
                <NestedModalContainer 
                    isShowFirstModal={this.state.firstModal} 
                    isShowNestedModal={this.state.nestedModal} 
                    isCloseAllModal={this.state.closeAll} 
                    toggleFirstModal = {() => this.toggleFirstModal()}
                    toggleNestedModal = {() => this.toggleNestedModal()}
                    closeAllModals = {() => this.closeAllModals()}
                    dialogModalClasses = {this.state.modalClass} 
                    chkContext = {this.state.checkboxes} 
                    handleChkboxSelection = {(evt) => this.handleCheckboxSelection(evt) }
                    />
                <div className="centered border border-danger">
                    Health Products... This postion is absolute center in browser
                </div>
            </div>
        )
    }
}

export default HealthProductsCompo;