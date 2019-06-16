/*
 * @Author: Zhangxu
 * @Date: 2019-06-16 20:16
 * @LastEditors: Zhangxu
 * @LastEditTime: 2019-06-16 20:16
 * @description: React中memo的使用01
 */

import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';

// FIXME: 优化方式1 - 使用生命周期函数 shouldComponentUpdate
/*class Foo extends Component {
	shouldComponentUpdate(nextProps, nextState, nextContext) {
		// FIXME: 在Foo组件中，我们认为只要传入的name属性没有发生变化，就不需要重新渲染
		if (nextProps.name === this.props.name) {
			return false
		}
		return true
	}

	render() {
		console.log("Foo Render!");
		return null;
	}
}*/

// FIXME: 优化方式2 - 继承PureComponent类
// FIXME: PureComponent的局限性 - 只有传入属性本身的对比，如果传入的属性是引用类型，属性的内部的属性值发生了变化的情况下，通过PureComponent就不行了。
class Foo extends PureComponent {
	render() {
		console.log("Foo Render!");
		return null;
	}
}

Foo.propTypes = {
	name: PropTypes.string.isRequired
};

class App extends Component {
	state = {
		count: 0
	};

	render() {
		return (
			<div>
				{/* FIXME: 每次点击button，Foo都会重新渲染，及时Foo组件所依赖的属性并未发生变化。这个地方就是一个可以优化的点 */}
				<button type={"button"} onClick={() => {
					this.setState({
						count: this.state.count + 1
					})
				}}>Add</button>
				<Foo name={"David"}/>
			</div>
		);
	}
}

App.propTypes = {};

export default App;
