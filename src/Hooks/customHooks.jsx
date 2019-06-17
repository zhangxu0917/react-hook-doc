import React, {useState, useEffect, useRef, useCallback} from 'react';

function useCounter(count) {
	const size = useSize()
	return (
		<div>
			<h1>Count: {count}</h1>
			<h2>Size: {size.width} * {size.height}</h2>
		</div>

	)
}

// FIXME: 创建自定义Hook（useCount）
function useCount(defaultCount) {
	const [count, setCount] = useState(0);

	/**
	 * FIXME: useRef的第二个作用，用来同步需要在不同生命周期中共享的数据
	 *  执行两个逻辑
	 *  1. 在组件渲染是，绑定一个定时器，每秒钟count加1
	 *  2. 当count >= 10 以后，就不在自动增加
	 */
	let it = useRef();
	useEffect(() => {
		it.current = setInterval(() => {
			setCount(count => count + 1);
		}, 1000)
	}, []);

	useEffect(() => {
		if (count >= 10) {
			clearInterval(it.current);
			it = null;
		}
	}, [count]);

	return [count, setCount];
}

function useSize () {
	const [size, setSize] = useState({
		width: document.documentElement.clientWidth,
		height: document.documentElement.clientHeight,
	});

	const onResize = useCallback(() => {
		setSize({
			width: document.documentElement.clientWidth,
			height: document.documentElement.clientHeight,
		});
		console.log(`size: ${size.width} * ${size.height}`)
	}, []);

	useEffect(() => {
		window.addEventListener('resize', onResize, false);

		return () => {
			window.removeEventListener('resize', onResize, false);
		}
	}, []);

	return size;
}

function FuncApp() {
	const [count, setCount] = useCount(0);
	// FIXME: Hook是可以直接返回一段jsx来参与渲染的
	const Counter = useCounter(count);
	const size = useSize();

	return (
		<div>
			<button type={'button'} onClick={() => {
				setCount(count + 1)
			}}>Add Count</button>
			{/*<Counter count={count}/>*/}
			{Counter}
			<h3>Size: {size.width} * {size.height}</h3>
		</div>
	)
}

export default FuncApp;
