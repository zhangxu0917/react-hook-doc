/**
 * @Author: Zhangxu
 * @Date: 2019-06-16 20:17
 * @LastEditors: Zhangxu
 * @LastEditTime: 2019-06-16 20:17
 * @description: React中memo的使用02 - PureComponent的缺点
 */

import React, {Component, PureComponent} from 'react';

// FIXME: PureComponent的局限性 - 只有传入属性本身的对比，如果传入的属性是引用类型，只有属性的内部的属性值发生了变化的情况下，通过PureComponent就不行了。
class Foo extends PureComponent{
	render() {
		console.log(this.props.person);
		return (
			<div>Person.age: {this.props.person.age}</div>
		)
	}
}

class App extends Component {
	state = {
		count: 0,
		person: {
			age: 30
		}
	};

	// FIXME: Link43问题的解决方案
	callback = () => {
		console.log('console.log')
	};

	render() {
		const {person} = this.state;
		return (
			<div>
				{/* FIXME: 每次点击button，Foo都会重新渲染，及时Foo组件所依赖的属性并未发生变化。这个地方就是一个可以优化的点 */}
				<button type={"button"} onClick={() => {
					person.age++;
					this.setState({
						person
					})
				}}>Add</button>
				{/* FIXME: PureComponent的另一个缺点 - 如果用这种方式传入一个函数的话，由于每次传入的都是一个新的函数，所以PureComponent每次都会重新渲染 */}
				<Foo person={person} cb={this.callback}/>
			</div>
		);
	}
}

export default App;
