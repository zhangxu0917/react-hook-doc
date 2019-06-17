// FIXME: 从React中导入useState
import React, {Component, useState} from 'react';

class ClassApp extends Component {
	state = {
		count: 0
	};

	render() {
		const {
			count
		} = this.state;

		return (
			<div>
				<button type={'button'} onClick={() => {
					this.setState({
						count: count + 1
					})
				}}>Add Count</button>
				<h1>{count}</h1>
			</div>
		);
	}
}

function FuncApp (props) {
	// FIXME: useState的返回值是一个包含两个成员的数组，
	// FIXME: useState是按照第一次运行的顺序，来返回特定的state的。务必每次要按照同样的顺序
	// FIXME: React要求每次渲染useState是按照稳定的顺序和稳定的数量被调用的，不能多也不能少
	// let [count, setCount] = useState(0);

	// FIXME: 通过props的值，设置state的初始值
	// FIXME: useState 支持传入一个函数，通过传入函数的返回值，来设置useState的初始值。
	let [count, setCount] = useState(() => {
		console.log('initial count');
		return props.defaultCount || 0
	});

	return (
		<div>
			<button type={'button'} onClick={() => {setCount(count + 1)}}>Add Count</button>
			<h1>{count}</h1>
		</div>
	)
}

// export default ClassApp;
export default FuncApp;
