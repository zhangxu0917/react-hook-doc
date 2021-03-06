import React, {Component, useState, useEffect} from 'react';

class App extends Component {
	state = {
		count: 0,
		size: {
			width: document.documentElement.clientWidth,
			height: document.documentElement.clientHeight,
		}
	};

	onResize = () => {
		this.setState({
			size: {
				width: document.documentElement.clientWidth,
				height: document.documentElement.clientHeight,
			}
		})
	};

	// FIXME: 在componentDidMount声明周期函数中，将state.count 赋值给 document.title
	componentDidMount() {
		document.title = this.state.count;
		// FIXME: 在componentDidMount中为window绑定resize事件
		window.addEventListener('resize', this.onResize, false);
	}
	// FIXME: 在componentDidUpdate声明周期函数中，同步document.title的state.count的变化
	componentDidUpdate(prevProps, prevState, snapshot) {
		document.title = this.state.count
	}
	// FIXME: 在componentWillUnmount中为resize解绑resize事件
	componentWillUnmount() {
		window.removeEventListener('resize', this.onResize)
	}

	render() {
		let {count, size} = this.state;
		return (
			<div>
				<button type={'button'} onClick={() => {
					this.setState({
						count: count + 1
					})
				}}>Add Count</button>
				<h1>Count: {count}</h1>
				<h1>Size: {size.width} * {size.height}</h1>
			</div>
		);
	}
}

function FuncApp () {
	const [count, setCount] = useState(0);
	const [size, setSize] = useState({
		width: document.documentElement.clientWidth,
		height: document.documentElement.clientHeight,
	});

	const onResize = () => {
		setSize({
			width: document.documentElement.clientWidth,
			height: document.documentElement.clientHeight,
		});
	};

	const onClick = () => {
		let {width, height} = size;
		console.log(`size: ${width} * ${height}`)
	};

	// FIXME: useEffect需要传入一个函数参数，在函数内部为document.title赋值
	// FIXME: 相比于类组件，不需要是关心componentDidMount还是componentDidUpdate，统一在useEffect中调用
	// FIXME: document.title 和设置 resize的逻辑分隔在两个useEffect中，这就是关注点分离
	useEffect(() => {
		document.title = count + '';
	}, [count]);

	useEffect(() => {
		console.log(count)
	}, [count]);

	useEffect(() =>{
		window.addEventListener('resize', onResize, false);
		// FIXME: useEffect返回一个函数返回值，在函数中，对resize进行解绑（消除副作用）
		return () => {
			window.removeEventListener('resize', onResize, false);
		}
		// FIXME: useEffect的第二个参数是一个数组，只有数组中的每一项都不变的情况下，useEffect才会阻止useEffect重新执行
		// FIXME: 两个特例：不传第二个参数 - 每次都重新执行，传递第二个参数为一个空数组`[]` - useEffect只会执行一次
	}, []);

	useEffect(() => {
		document.getElementById('size').addEventListener('click', onClick, false);
		return () => {
			document.getElementById('size').removeEventListener('click', onClick, false);
		}
	});

	return (
		<div>
			<button type={'button'} onClick={() => {
				setCount(count+1)
			}}>Add Count</button>
			<h1>Count: {count}</h1>
			{
				count % 2 ?
					<h2 id={"size"}>Size: {size.width} * {size.height}</h2>
				:
					<h3 id={"size"}>Size: {size.width} * {size.height}</h3>
			}
		</div>
	)
}

// export default App;
export default FuncApp;
