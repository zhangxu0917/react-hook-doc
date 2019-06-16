/**
 * @Author: Zhangxu
 * @Date: 2019-06-16 20:35
 * @LastEditors: Zhangxu
 * @LastEditTime: 2019-06-16 20:35
 * @description: memo的使用
 */

import React, {Component, memo} from 'react';

const Foo = memo(function Foo(props) {
	console.log('Foo Render');
	return (
		<div>{props.name}</div>
	)
});

class App extends Component {
	state = {
		count: 0
	};

	render() {
		let {count} = this.state;
		return (
			<div>
				<button type={'button'} onClick={() => {
					this.setState({
						count: count + 1
					})
				}}>Add Count</button>
				<Foo name={"David"}/>
			</div>
		);
	}
}

export default App;
