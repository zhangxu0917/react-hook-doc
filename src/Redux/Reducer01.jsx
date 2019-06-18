/**
 * @Author: Zhangxu
 * @Date: 2019-06-18 15:52
 * @LastEditors: Zhangxu
 * @LastEditTime: 2019-06-18 15:52
 * @description: 使用Reducer拆解数据更新
 */

import React, {useState, useCallback, useRef, useEffect, memo} from 'react';
import './App.css'
import {createAdd, createRemove, createSet, createToggle} from "./actions";

// FIXME: 创建全局的唯一标示位
let idSeq = Date.now();
// FIXME: localStorage的key
let LS_KEY = '_$_todos_';

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

		addTodo({
			id: ++idSeq,
			text: newText,
			completed: false
		});

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

	// FIXME: 创建reducer函数，接收当前的数据和一个action，返回通过这个函数更新之后的数据；
	function reducer(state, action) {
		const {type, payload} = action;
		const {todos, incrementCount} = state;

		switch (type) {
			case 'set':
				return {
					...state,
					todos: payload,
					incrementCount: incrementCount + 1
				};
			case 'add':
				return {
					...state,
					todos: [...todos, payload],
					incrementCount: incrementCount + 1
				};
			case 'remove':
				return {
					...state,
					todos: todos.filter(item => {
						return item.id !== payload
					})
				};
			case 'toggle':
				return {
					...state,
					todos: todos.map(todo => {
						return todo.id === payload ? {
								...todo,
								completed: !todo.completed
							}
							: todo;
					})
				};
			default:
				break;
		}
		return state
	}

	// FIXME: 创建一个dispatch函数，其参数为action，他的核心思想是让所有的数据更新操作都经过dispatch函数
	const dispatch = useCallback((action) => {
		const state = {
			todos,
			incrementCount
		};

		const setters = {
			todos: setTodos,
			incrementCount: setIncrementCount
		};

		const newState = reducer(state, action);
		for (let key in newState) {
			setters[key](newState[key])
		}
	}, [todos, incrementCount]);

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
