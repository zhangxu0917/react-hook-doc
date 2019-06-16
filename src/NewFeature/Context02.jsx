/**
 * @Author: Zhangxu
 * @Date: 2019-06-15 18:28
 * @LastEditors: Zhangxu
 * @LastEditTime: 2019-06-15 18:28
 * @description: 02.修改上层组件的state，自动响应给Context的基础实例
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
	render() {
		return (
			<BatteryContext.Consumer>
				{
					// FIXME: 通过函数调用，消费形参的形式，读取到Context的值
					battery => (
						<h1>Battery: {battery}</h1>
					)
				}
			</BatteryContext.Consumer>
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
