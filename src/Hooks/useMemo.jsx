import React, {useState, memo, useMemo, useCallback} from 'react';

const Counter = memo(function (props) {
	console.log(`Counter Render`);
	return (
		<h1 onClick={props.onClick}>Count: {props.count}</h1>
	)
});

function FuncApp() {
	const [count, setCount] = useState(0);
	const [clickCount, setClickCount] = useState(0);

	// FIXME: useEffect 执行的是副作用，是在渲染之后执行的；useMemo 是赋值行为，需要参与渲染，在渲染之前执行；
	const double = useMemo(() => {
		/**
		 * FIXME: count === 3 初始值为false，
		 *  当count === 3，useMemo发生改变，触发重新渲染，
		 *  当count + 1 再次不等于3，再次触发重新渲染，
		 *  再向后，不在触发重新计算
		 */
		return count * 2;
	}, [count === 3]);

	/*const onClick = () => {
		console.log('Click');
	}*/

	// FIXME: 使用useCallback优化代码
	/*const onClick = useCallback(() => {
		console.log('Click');
	}, [double]);*/

	// FIXME: Line32 等价于 Line38
	/*const onClick = useCallback(() => {
		console.log('Click');
		setClickCount(clickCount + 1);
	}, [clickCount]);*/

	const onClick = useCallback(() => {
		console.log('Click');
		setClickCount((clickCount) => clickCount + 1);
	});

	// FIXME: useMemo(() => fn) 等价于 useCallBack(fn)

	return (
		<div>
			<button type={'button'} onClick={() => {
				setCount(count + 1)
			}}>Add Count
			</button>
			<Counter count={double} onClick={onClick}/>
			<h1>Count: {count}</h1>
			<h1>Double: {double}</h1>
		</div>
	)
}

export default FuncApp;
