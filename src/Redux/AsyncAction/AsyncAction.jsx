/**
 * @Author: Zhangxu
 * @Date: 2019-06-18 19:35
 * @LastEditors: Zhangxu
 * @LastEditTime: 2019-06-18 19:35
 * @description: 异步Action
 */

import React, {useState, useRef, useEffect, memo} from 'react';
import '../App.css'
import {createAdd, createRemove, createSet, createToggle} from "./actions";
import reducer from './reducers.js'

// FIXME: localStorage的key
let LS_KEY = '_$_todos_';

// FIXME: 声明全局的store统一管理状态
let store = {
	todos: [],
	incrementCount: 0
}

function bindActionCreators(actionCreators, dispatch) {
	const ret = {};

	for (let key in actionCreators) {
		if (actionCreators.hasOwnProperty(key)) {
			ret[key] = function (...args) {
				const actionCreator = actionCreators[key];
				const action = actionCreator(...args);
				dispatch(action);
			}
		}
	}

	return ret;
}

let Control = memo(function (props) {
	const {addTodo} = props;
	let inputRef = useRef();

	const onSubmit = (e) => {
		e.preventDefault();
		let newText = inputRef.current.value.trim();

		if (newText.length === 0) {
			return;
		}

		addTodo(newText);

		inputRef.current.value = '';
	};

	return (
		<div className={'control'}>
			<h1>Todos</h1>
			<form onSubmit={onSubmit}>
				<input ref={inputRef} type={'text'} className={'new-todo'} placeholder={'What need tobe done'}/>
			</form>
		</div>
	)
});

let TodoItem = memo(function (props) {
	let {
		todo: {
			id,
			text,
			completed,
		},
		removeTodo,
		toggleTodo,
	} = props;

	const onChange = () => {
		toggleTodo(id);
	};

	const onRemove = () => {
		removeTodo(id);
	};

	return (
		<li className={'todo-item'}>
			<input
				type={'checkbox'}
				onChange={onChange}
				defaultChecked={completed}
			/>
			<label className={completed ? 'complete' : ''}>{text}</label>
			<button type={'button'} onClick={onRemove}>&times;</button>
		</li>
	)
});

const Todos = memo(function (props) {
	let {
		removeTodo,
		toggleTodo,
		todos,
	} = props;

	return (
		<ul>
			{
				todos.map(todo => {
					return (
						<TodoItem
							todo={todo}
							removeTodo={removeTodo}
							toggleTodo={toggleTodo}
							key={todo.id}
						/>
					)
				})
			}
		</ul>
	)
});

function BasicTodo(props) {
	const [todos, setTodos] = useState([]);
	const [incrementCount, setIncrementCount] = useState(0);
	// FIXME: 使用副作用来更新全局状态store
	useEffect(() => {
		Object.assign(store, {
			todos,
			incrementCount
		})
	}, [todos, incrementCount]);

	// FIXME: 创建一个dispatch函数，其参数为action，他的核心思想是让所有的数据更新操作都经过dispatch函数
	const dispatch = (action) => {
		const setters = {
			todos: setTodos,
			incrementCount: setIncrementCount
		};

		if ('function' === typeof action) {
			action(dispatch, () => store);
			return;
		}

		const newState = reducer(store, action);
		for (let key in newState) {
			setters[key](newState[key])
		}
	};

	useEffect(() => {
		const todos = JSON.parse(localStorage.getItem(LS_KEY) || '{}');
		dispatch(createSet(todos));
	}, []);

	useEffect(() => {
		localStorage.setItem(LS_KEY, JSON.stringify(todos))
	}, [todos]);

	return (
		<div className={'todo-list'}>
			<Control
				{
					...bindActionCreators({
						addTodo: createAdd,
					}, dispatch)
				}
			/>
			<Todos
				dispatch={dispatch}
				{
					...bindActionCreators({
						toggleTodo: createToggle,
						removeTodo: createRemove
					}, dispatch)
				}
				todos={todos}
			/>
		</div>
	);
}

export default BasicTodo;

