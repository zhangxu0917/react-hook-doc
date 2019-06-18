/**
 * @Author: Zhangxu
 * @Date: 2019-06-18 16:25
 * @LastEditors: Zhangxu
 * @LastEditTime: 2019-06-18 16:25
 * @description: 构造actionCreator 将action创建的方式过程化
 */

export function createSet(payload) {
	return {
		type: 'set',
		payload
	}
}

// FIXME: 创建全局的唯一标示位
let idSeq = Date.now();
export function createAdd(payload) {
	return (dispatch, getState)  => {
		setTimeout(() => {
			const { todos } = getState();
			if (!todos.find(todo => todo.text === payload)) {
				dispatch({
					type: 'add',
					payload: {
						id: ++idSeq,
						text: payload,
						completed: false
					}
				})
			}
		}, 3000);
	}
}

export function createRemove(payload) {
	return {
		type: 'remove',
		payload
	}
}

export function createToggle(payload) {
	return {
		type: 'toggle',
		payload
	}
}
