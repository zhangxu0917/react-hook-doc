/**
 * @Author: Zhangxu
 * @Date: 2019-06-15 18:28
 * @LastEditors: Zhangxu
 * @LastEditTime: 2019-06-15 18:28
 * @description: 01.Context的基础用法
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
	render() {
		return (
			<BatteryContext.Provider value={60}>
				<Middle/>
			</BatteryContext.Provider>
		);
	}
}

App.propTypes = {};

export default App;
