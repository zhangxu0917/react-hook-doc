import React, {useState, useCallback, useRef, useEffect, memo} from 'react';
import './App.css'

// FIXME: 创建全局的唯一标示位
let idSeq = Date.now();
// FIXME: localStorage的key
let LS_KEY = '_$_todos_';

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
		toggleTodo
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
		todos
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

	const addTodo = useCallback((todo) => {
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
	}, []);

	useEffect(() => {
		const todos = JSON.parse(localStorage.getItem(LS_KEY) || '{}');
		setTodos(todos);
	}, []);

	useEffect(() => {
		localStorage.setItem(LS_KEY, JSON.stringify(todos))
	}, [todos]);

	return (
		<div className={'todo-list'}>
			<Control addTodo={addTodo}/>
			<Todos
				removeTodo={removeTodo}
				toggleTodo={toggleTodo}
				todos={todos}
			/>
		</div>
	);
}

export default BasicTodo;
