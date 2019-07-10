import React from 'react';
import './Doors.css';

const Doors = (props) => {

	const renderDoor = (side) => {
		return(
			<div  className={"door " + side}>
				<div className="large-panel">
					<div className="little-panel top left"/>
					<div className="little-panel top right"/>
					<div className="little-panel bottom left"/>
					<div className="little-panel bottom right"/>
				</div>

			</div>

		);
	};

	let count = 0;

	const onDoorsOpened = ()=> {
		count++;

		if (count === 2) {
			props.onDoorsOpened();
		}
	};


	return (
		<div onAnimationEnd={onDoorsOpened} className={props.open ? 'door-container open' : 'door-container'}>
			{renderDoor('left')}
			{renderDoor('right')}

		</div>

		);
}

export default Doors;