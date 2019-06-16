/**
 * @Author: Zhangxu
 * @Date: 2019-06-16 07:27
 * @LastEditors: Zhangxu
 * @LastEditTime: 2019-06-16 07:27
 * @description: 05.lazy&Suspense
 */

// FIXME: 1.从react中引入lazy和Suspense
import React, {Component, lazy, Suspense} from 'react';

// FIXME: 2.使用lazy动态导入组件
const About = lazy(() => import(/* webpackChunkName: "about" */'./about.jsx'));

// FIXME: Suspense 无法处理加载错误，react中有一个概念Errorboundry，错误边界。他利用了react组件的一个生命周期函数componentDidCatch
class App extends Component {
	state = {
		hasError: false
	};

	// FIXME: ErrorBoundry声明方式1
	componentDidCatch(error, errorInfo) {
		this.setState({
			hasError: true
		})
	}

	// FIXME: ErrorBoundry声明方式2
	/*static getDerivedStateFromError () {
		 // FIXME: 一旦遇到错误，都会返回一个新的数据，合并到当前的state对象中
		return {
			hasError: true
		}
	}*/

	render() {
		if (this.state.hasError) {
			return <div>Error</div>
		}
		return (
			// FIXME: 3.使用Suspense包裹动态导入的组件。Suspense是React提供的一个组件，用来在动态到入模块加载之前生成展示的占位符
			// FIXME: 4.fallback需要传入一段jsx
			<Suspense fallback={<div>loading</div>}>
				<About/>
			</Suspense>
		)
	}
}

App.propTypes = {};

export default App;
