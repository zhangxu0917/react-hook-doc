/**
 * @Author: Zhangxu
 * @Date: 2019-06-18 15:50
 * @LastEditors: Zhangxu
 * @LastEditTime: 2019-06-18 15:50
 * @description: 使用dispatch统一数据处理行为
 */

import React, {useState, useCallback, useRef, useEffect, memo} from 'react';
import './App.css'

// FIXME: 创建全局的唯一标示位
let idSeq = Date.now();
// FIXME: localStorage的key
let LS_KEY = '_$_todos_';

let Control = memo(function (props) {
	const {dispatch} = props;
	let inputRef = useRef();

	const onSubmit = (e) => {
		e.preventDefault();
		let newText = inputRef.current.value.trim();

		if (newText.length === 0) {
			return;
		}

		dispatch({
			type: 'add',
			payload: {
				id: ++idSeq,
				text: newText,
				completed: false
			}
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
		dispatch,
	} = props;

	const onChange = () => {
		dispatch({type: 'toggle', payload: id});
	};

	const onRemove = () => {
		dispatch({type: 'remove', payload: id});
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
		dispatch,
		todos,
	} = props;
	console.log(todos)
	return (
		<ul>
			{
				todos.map(todo => {
					return (
						<TodoItem
							todo={todo}
							dispatch={dispatch}
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

	/*const addTodo = useCallback((todo) => {
		setTodos(todos => [...todos, todo])
	}, []);

	const removeTodo = useCallback((id) => {
		setTodos(todos => todos.filter(item => {
			return item.id !== id
		}))
	}, []);

	const toggleTodo = useCallback((id) => {
		setTodos(todos => todos.map(todo => {
			return todo.id === id ? {
					...todo,
					completed: !todo.completed
				}
				: todo;
		}))
	}, []);*/

	// FIXME: 创建一个dispatch函数，其参数为action，他的核心思想是让所有的数据更新操作都经过dispatch函数
	const dispatch = useCallback((action) => {
		// FIXME: 从action中解构出type和payload
		const {type, payload} = action;
		switch (type) {
			case 'set':
				console.log(payload);
				setTodos(payload);
				break;
			case 'add':
				setTodos(todos => [...todos, payload]);
				break;
			case 'remove':
				setTodos(todos => todos.filter(item => {
					return item.id !== payload
				}));
				break;
			case 'toggle':
				setTodos(todos => todos.map(todo => {
					return todo.id === payload ? {
							...todo,
							completed: !todo.completed
						}
						: todo;
				}));
				break;
			default:
				break;
		}
	}, []);

	useEffect(() => {
		const todos = JSON.parse(localStorage.getItem(LS_KEY) || '[]');
		dispatch({type: 'set', payload: todos})
	}, []);

	useEffect(() => {
		localStorage.setItem(LS_KEY, JSON.stringify(todos))
	}, [todos]);

	return (
		<div className={'todo-list'}>
			<Control dispatch={dispatch}/>
			<Todos
				dispatch={dispatch}
				todos={todos}
			/>
		</div>
	);
}

export default BasicTodo;
