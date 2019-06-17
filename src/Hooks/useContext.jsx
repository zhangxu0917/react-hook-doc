import React, {Component, useState, createContext, useContext} from 'react';

const CountContext = createContext();

class Foo extends Component {
	render() {
		return (
			<CountContext.Consumer>
				{
					count => <h1>Count: {count}</h1>
				}
			</CountContext.Consumer>
		)
	}
}

// FIXME: 使用contextType
class Bar extends Component {
	static contextType = CountContext;
	render() {
		const count = this.context;
		return (
			<h1>Count: {count}</h1>
		)
	}
}

function Counter () {
	const count = useContext(CountContext);
	return (
		<h1>Count: {count}</h1>
	)
}

function FuncApp () {
	const [count, setCount] = useState(0);

	return (
		<div>
			<button type={'button'} onClick={() => {
				setCount(count+1)
			}}>Add Count</button>
			<CountContext.Provider value={count}>
				<Foo/>
				<Bar/>
				<Counter/>
			</CountContext.Provider>
		</div>
	)
}

// export default App;
export default FuncApp;
