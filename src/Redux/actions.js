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

export function createAdd(payload) {
	return {
		type: 'add',
		payload
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
