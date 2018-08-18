import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import NestedModalContainer from '../modal/nested-modal';
import { GeneratesCheckboxes } from '../../helpers/generates-chks';
import { grabMissChildren, getObjForPropValue } from '../../actions';

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

	componentWillMount() {
		this.props.grabMissChildren();
		this.props.getObjForPropValue();
	}

	handleCheckboxSelection(e) {
		const name = e.target.name;
		const relayObj = Object.keys(
			this.state.checkboxes
		).reduce((tmpObj, currentItem) => {
			if (currentItem === name) {
				tmpObj[currentItem] = (e.target.value === '') ? name : '';
			} else if (
				currentItem !== name && this.state.checkboxes[currentItem] !== ''
			) {
				tmpObj[currentItem] = this.state.checkboxes[currentItem];
			} else {
				tmpObj[currentItem] = '';
			}
			return tmpObj;
		}, {});
		console.log('46 -- relayObj: ', relayObj);
		this.setState({
			checkboxes: relayObj
		});
	}

	toggleFirstModal() {
		console.log('53 -- kai...');
		this.setState({
			firstModal: !this.state.firstModal
		});
	}

	toggleNestedModal() {
		console.log('60 -- 2kai...');
		this.setState({
			nestedModal: !this.state.nestedModal,
			closeAll: false
		});
	}

	closeAllModals() {
		console.log('68 -- 3kai...');
		this.setState({
			nestedModal: !this.state.nestedModal,
			closeAll: true
		});
	}

	calculate5To1() {
		// const arr = Array.from(Array(5).keys(), elem => elem+1).reverse();
		function recursion5To1(val) {
			if (val === 0) {
				return 1;
			}
			return val * recursion5To1(val-1);
		}
		return recursion5To1(5);
	}

	findYoungestChildInArray() {
		const childrenArray = [
			{
				age: 2,
				name: 'name5',
				children: [
					{
						age: 3, name: 'name6',
						children: [
							{ age: 2, name: 'name33' }
						]
					},
					{
						age: 8, name: 'name7',
						children: [
							{ age: 1, name: 'name20' }
						]
					}
				]
			},
			{
				age: 6,
				name: 'name9',
				children: [
					{
						age: 2, name: 'name10',
						children: [
							{ age: 7, name: 'name19' }
						]
					},
					{
						age: 6, name: 'name11',
						children: [
							{ age: 1, name: 'name18' }
						]
					}
				]
			}
		];

		let rz = [];
		const findYoungestChild = (arr) => {
			for (let i = 0; i < arr.length; i++) {
				let tmp;
				for (const key in arr[i]) {
					if (arr[i].hasOwnProperty(key) && key === 'children') {
						tmp = findYoungestChild(arr[i].children);
					} else {
						rz.push({
							age: arr[i].age,
							name: arr[i].name
						});
					}
				}
			}
		};

		findYoungestChild(childrenArray);

		const lo = rz.reduce((res, elem, idx, currArr) => {
			if (idx === 0) {
				return res;
			} else {
				if (elem.age === currArr[idx - 1].age && elem.name === currArr[idx - 1].name) {
					return res;
				} else if (elem.age < currArr[idx - 1].age && elem.name !== currArr[idx - 1].name) {
					return [...res, elem];
				} else {
					return res;
				}
			}
		}, []);
		console.log('147 ha -- ', lo);

		rz.sort((a, b) => {
			// console.log('a is: ', a, 'b is: ', b);
			return a.age - b.age;
		});

		console.log('148 use sort to find the youngest child -- ', rz);
		console.log('159 -- ', rz);
	}

	grabInsFrom2To9() {
		const range = function(start_num, end_num)
		{
			if (end_num - start_num === 2) {
				return [start_num + 1];
			} else {
				const list = range(start_num, end_num - 1);
				list.push(end_num - 1);
				return list;
			}
		};
		return range(2, 9);
	}

	sum1To6() {
		const recursivAdd = (val) => {
			if (val === 1) {
				return 1;
			}
			let nextAdd = recursivAdd(val-1);
			// console.log('191 -- nextAdd: ', nextAdd, ' val: ', val);
			return val + nextAdd;
		};
		return recursivAdd(6);
	}

	exponentOneNum() {
		const exponseOneNumber = (num, exponent) => {
			if (exponent === 0) {
				return 1;
			} else {
				exponent = exponent - 1;
				let nextExponent = exponseOneNumber(num, exponent);
				return num * nextExponent;
			}
		};
		return exponseOneNumber(3, 2);
	}

	recursionObjIncludesHitN2ndDeepthChildren() {
		const origObj = this.props.missChildren;

		const resObj = origObj.filter(function f(eachObj) {
			if (eachObj.value.includes('Hit')) return true;

			if (eachObj.children) {
				return (eachObj.children = eachObj.children.filter(f)).length;
			}
		});
		console.log('202 -- : ', JSON.stringify(resObj, null, 2));
	}

	searchByIdInNestedObj() {
		const data = {
			item: [
				{
					itemNested: [
						{
							itemNested2: [
								{ id: '2', name: 'name0' }
							]
						}
					]
				}
			]
		};
		const targetIdVal = '2';
		function recursionSearchById(obj, idVal) {
			if (obj.id === idVal) {
				return obj;
			}
			let tElem = {};
			for (const key in obj) {
				if (obj.hasOwnProperty(key) && typeof obj[key] === 'object') {
					tElem = recursionSearchById(obj[key], targetIdVal);
					if (tElem) {
						return tElem;
					}
				}
			}
			return tElem;
		}
		console.log('235 -- targetObj is: ', recursionSearchById(data, targetIdVal));
	}

	getPropVal() {
		const propName = 'progress';
		function recursionGetPropVal(obj, pn) {
			let tpVal;
			Object.keys(obj).some((eachKey) => {
				if (eachKey === pn) {
					tpVal = obj[eachKey];
					return true;
				}
				if (obj.hasOwnProperty(eachKey) && typeof obj[eachKey] === 'object') {
					tpVal = recursionGetPropVal(obj[eachKey], pn);
					return tpVal !== 'undefined';
				}
				return {};
			});
			return tpVal;
		}
		return recursionGetPropVal(this.props.propValObj, propName);
	}

	getAllKeys() {
		const data = {
			check_id: 12345,
			check_name: 'Name of HTTP check',
			check_type: 'HTTP',
			tags: ['example_tag'],
			check_params: {
				basic_auth: false,
				params: ['size'],
				encryption: {
					enabled: true,
					testNull: null
				}
			}
		};
		const getallkeysAsArr = (obj, prefix = '') => {
			Object.keys(obj).reduce((res, el) => {
				// console.log('274 -- el: ', el);
				if (Array.isArray(obj[el])) {
					return res;
				} else if (typeof obj[el] === 'object' && obj[el] !== null) {
					return [...res, ...getallkeysAsArr(obj[el], `${prefix}${el}.`)];
				} else {
					return [...res, prefix + el];
				}
			}, []);
			return getallkeysAsArr(data);
		};
	}

	findObjBySmallestId() {
		const treeDataSource = [{
			id: 1,
			Name: 'Test1',
			items: [{
				id: 2,
				Name: 'Test2',
				items: [{
					id: 3,
					Name: 'Test3'
				}]
			}]
		}];
		const idValue = 3;
		const recursionFindSmallestId = (data, idVal) => {
			if (data.id === idVal) {
				return {
					id: data.id,
					Name: data.Name
				};
			}
			let tObj;
			// for (const key in data) {
			// 	if (data.hasOwnProperty(key) && typeof data[key] === 'object') {
			// 		tObj = recursionFindSmallestId(data[key], idVal);
			// 		if (tObj.hasOwnProperty('id')) {
			// 			return tObj;
			// 		}
			// 	}
			// }
			Object.keys(data).forEach((keyElem) => {
				if (typeof data[keyElem] === 'object') {
					tObj = recursionFindSmallestId(data[keyElem], idVal);
					if (tObj.hasOwnProperty('id')) {
						return tObj;
					}
				}
				return {};
			});
			return tObj;
		};
		return recursionFindSmallestId(treeDataSource, idValue).id;
	}

	render() {
		return (
			<div className="row mx-3">
				<div>
					1. multiple checkbox and Nested modal callback (Yes)<br />
					2. high Order Component show other component<br />
					3. realtime search, reselect and redux-form<br />
					4. translation<br />
					5. test<br />
					6.  recursion (Yes)<br />
					7. route to dispath and fetch data.
				</div>
				<div className="col-12 col-sm-6 col-lg-3">
					<ul className="list-group">
						<GeneratesCheckboxes chksState={this.state.checkboxes}
							handleSelect={
								(evt) => { return this.handleCheckboxSelection(evt); }
							} />
						<li className="list-group-item">
							<button type="button" className="btn btn-primary"
								onClick={() => this.toggleFirstModal()}>
								Choose_Checkboxes
							</button>
						</li>
					</ul>
				</div>
				<div className="col-12 col-sm-6 col-lg-3">
					<ul className="list-group">
						<li className="list-group-item bg-secondary text-white">
							(recursion) Calculate: 5 x 4 x 3 x 2 x 1 = 120
						</li>
						<li className="list-group-item">
							result: {this.calculate5To1()}
						</li>
						<li className="list-group-item bg-secondary text-white">
							(recursion) The youngest child's age is 1.
						</li>
						<li className="list-group-item">
							result(age): {this.findYoungestChildInArray()}
						</li>
						<li className="list-group-item bg-secondary text-white">
							(recursion) Get Intergers from 2 to 9
						</li>
						<li className="list-group-item">
							result: {this.grabInsFrom2To9()}
						</li>
						<li className="list-group-item bg-secondary text-white">
							(recursion) Sum 1 to 6
						</li>
						<li className="list-group-item">
							result: {this.sum1To6()}
						</li>
						<li className="list-group-item bg-secondary text-white">
							(recursion) Exponent of a number:
						</li>
						<li className="list-group-item">
							result: {this.exponentOneNum()}
						</li>
						<li className="list-group-item bg-secondary text-white">
							(recursion) keep Obj value includes 'Hit' and obj has&nbsp;
							2nd deep (children) -- Check in Console.
						</li>
						<li className="list-group-item">
							result (in console 221):
							{this.recursionObjIncludesHitN2ndDeepthChildren()}
						</li>
					</ul>
				</div>
				<div className="col-12 col-sm-6 col-lg-3">
					<ul className="list-group">
						<li className="list-group-item bg-secondary text-white">
							(recursion) Search Obj by Id in Nested Object
						</li>
						<li className="list-group-item">
							result(check console 251): {this.searchByIdInNestedObj()}
						</li>
						<li className="list-group-item bg-secondary text-white">
							(recursion) Get Value by Prop in Obj
						</li>
						<li className="list-group-item">
							result -- progress is: {this.getPropVal()}
						</li>
						<li className="list-group-item bg-secondary text-white">
							(recursion) Get Value by Prop in Obj
						</li>
						<li className="list-group-item">
							result -- progress is: {this.getPropVal()}
						</li>
						<li className="list-group-item bg-secondary text-white">
							(recursion) Get All keys (as obj path) in Nested Obj
						</li>
						<li className="list-group-item">
							result (all keys are:) {this.getAllKeys()}
						</li>
						<li className="list-group-item bg-secondary text-white">
							(recursion) Get Obj by smallest id
						</li>
						{/* <li className="list-group-item">
							result (smallest id is): {this.findObjBySmallestId()}
						</li> */}
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
					handleChkboxSelection = {
						(evt) => { return this.handleCheckboxSelection(evt); }
					} />
				<div className="centered border border-danger">
                    Health Products... This postion is absolute center in browser
				</div>
			</div>
		);
	}
};

const mapStateToProps = (state) => {
	return ({
		missChildren: state.missChildren.missChildren,
		propValObj: state.propvalObj.propvalObj
	});
};

/* const mapDispatchToProps = (dispatch) => {
} */

export default connect(
	mapStateToProps, { grabMissChildren, getObjForPropValue }
)(HealthProductsCompo);
