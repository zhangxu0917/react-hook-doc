import React, {Component} from 'react';

class MyComponent extends Component {
	state = {
		statusList: [{
			id: 1,
			name: 'warning',
			status: 1
		}, {
			id: 2,
			name: 'error',
			status: 2
		}, {
			id: 3,
			name: 'info',
			status: 3
		}, {
			id: 4,
			name: 'success',
			status: 4
		}]
	};


	render() {
		let {statusList} = this.state;
		return (
			<div>
				<ul>
					{
						statusList.map(item => {
							switch (item.status) {
								case 1:
									return (
										<li>
											<span style={{color: 'orange'}}>warning</span>
										</li>
									);
								case 2:
									return (
										<li>
											<span style={{color: 'red'}}>error</span>
										</li>
									);
								case 3:
									return (
										<li>
											<span style={{color: 'blue'}}>info</span>
										</li>
									);
								case 4:
									return (
										<li>
											<span style={{color: 'green'}}>success</span>
										</li>
									);
								default:
									break;
							}
						})
					}
				</ul>
			</div>
		);
	}
}

export default MyComponent;
