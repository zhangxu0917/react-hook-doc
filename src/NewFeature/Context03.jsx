/**
 * @Author: Zhangxu
 * @Date: 2019-06-15 18:28
 * @LastEditors: Zhangxu
 * @LastEditTime: 2019-06-15 18:28
 * @description: 03.使用多个Context
 */

// FIXME: 1.从react中引入createContext
import React, {Component, createContext} from 'react';

// FIXME: 2.调用createContext方法，创建上下文对象
const BatteryContext = createContext();
const OnlineContext = createContext();

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
					// FIXME: 多个Consumer，需要相互嵌套，顺序不重要
					battery => (
						<OnlineContext.Consumer>
							{
								online => (
									<div>
										<h1>Battery: {battery}</h1>
										<h1>Online: {String(online)}</h1>
									</div>
								)
							}
						</OnlineContext.Consumer>
					)
				}
			</BatteryContext.Consumer>
		)
	}
}

class App extends Component {
	state = {
		battery: 60,
		online: false
	};

	render() {
		// FIXME：使用解构赋值的语法，获取battery的值
		let {
			battery,
			online,
		} = this.state;
		return (
			// FIXME: 如果存在多个Provider，只需要把他们相互嵌套起来即可，顺序并不重要。
			<BatteryContext.Provider value={battery}>
				<OnlineContext.Provider value={online}>
					<button type={"button"} onClick={() => {
						this.setState({
							battery: battery - 1
						})
					}}>Reduce</button>
					<button type={'button'} onClick={() => {
						this.setState({
							online: !online
						})
					}}>Toggle Online</button>
					<Middle/>
				</OnlineContext.Provider>
			</BatteryContext.Provider>
		);
	}
}

App.propTypes = {};

export default App;
