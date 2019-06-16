/**
 * @Author: Zhangxu
 * @Date: 2019-06-15 18:28
 * @LastEditors: Zhangxu
 * @LastEditTime: 2019-06-15 18:28
 * @description: 04.使用ContextType改造代码
 */

// FIXME: 1.从react中引入createContext
import React, {Component, createContext} from 'react';

// FIXME: 2.调用createContext方法，创建上下文对象
const BatteryContext = createContext();

// FIXME: 3.创建一个Middle组件，并且不传递任何参数
class Middle extends Component {
	render() {
		return <Leaf />
	}
}

// FIXME: 4.创建一个消费Context的组件Left
class Leaf extends Component {
	static contextType = BatteryContext;
	render() {
		// FIXME 设置了contextType，组件就可以在运行时获取到一个新的属性 `this.context`
		const battery = this.context;
		return (
			// FIXME: 使用contextType 改造jsx
			<h1>Battery: {battery}</h1>
		)
	}
}

class App extends Component {
	state = {
		battery: 60
	};

	render() {
		// FIXME：使用解构赋值的语法，获取battery的值
		let {battery} = this.state;
		return (
			<BatteryContext.Provider value={battery}>
				<button type={"button"} onClick={() => {
					this.setState({
						battery: battery - 1
					})
				}}>Reduce</button>
				<Middle/>
			</BatteryContext.Provider>
		);
	}
}

App.propTypes = {};

export default App;
