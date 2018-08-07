import React, { Component } from 'react';
import { empty } from '../../../../node_modules/rxjs';

class HealthProductsCompo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkboxes: {
                chbx0: '',
                chbx1: '',
                chbx2: '',
                chbx3: ''
            }
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
        console.log('30 -- relayObj: ', relayObj);
        this.setState({
            checkboxes: relayObj
        });
    }

    render () {
        return (
            <div className="row mx-3">
                <div>
                    1. multiple checkbox and modal callback  2. high Order Component show other component  3. realtime search, reselect and redux-form  4. translation  5. test  6.  recursion
                </div>
                <div className="col-12 col-sm-6 col-lg-3">
                    <ul className="list-group">
                        {
                            Object.keys(this.state.checkboxes).map((elem, idx) => {
                                return (
                                    <li className="list-group-item" key={elem+idx}>
                                        <label htmlFor="chbx0">Label{idx}</label>
                                        <input type="checkbox" value={this.state.checkboxes[elem]}
                                            id={elem} name={elem} 
                                            onChange={(event) => { this.handleCheckboxSelection(event) }} />
                                    </li>
                                );
                            })
                        }
                        <li className="list-group-item">
                            <button type="button" className="btn btn-primary">choose checkboxes</button>
                        </li>
                    </ul>
                </div>
                <div className="centered border border-danger">
                    Health Products... This postion is absolute center in browser
                </div>
                {/* <input type="checkbox" value="checkbox_val0" name="chkbox" defaultChecked="true" /> */}
            </div>
        )
    }
}

export default HealthProductsCompo;