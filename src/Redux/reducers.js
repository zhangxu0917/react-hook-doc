/**
 * @Author: Zhangxu
 * @Date: 2019-06-18 19:16
 * @LastEditors: Zhangxu
 * @LastEditTime: 2019-06-18 19:16
 * @description: 单独整理保存reducers
 */

// FIXME: Reducers 对象
const reducers = {
	todos(state, action) {
		const {type, payload} = action;
		switch (type) {
			case 'set':
				return payload;
			case 'add':
				return [...state, payload];
			case 'remove':
				return state.filter(item => {
					return item.id !== payload
				});
			case 'toggle':
				return state.map(todo => {
					return todo.id === payload ? {
							...todo,
							completed: !todo.completed
						}
						: todo;
				});
			default:
				break;
		}
		return state
	},
	incrementCount(state, action) {
		const {type} = action;
		switch (type) {
			case 'set':
			case 'add':
				return state + 1;
			default:
				return state;
		}
	},
};

// FIXME: 定义一个新的函数，combineReducers来辅助使用reducers
function combineReducers(reducers) {
	return function reducer(state, action) {
		const changed = {};
		for(let key in reducers) {
			if (reducers.hasOwnProperty(key)) {
				changed[key] = reducers[key](state[key], action)
			}
		}
		return {
			...state,
			...changed
		}
	}
}

export default combineReducers(reducers);
