import './EndingScene.css';
import React, {useState} from 'react';
import Dancer from './Dancer';


const EndingScene = (props) => {
	console.log("in ending scene " + props.inFront);
	const [isDancing, setIsDancing] = useState(false);

	const onClick = () => {
		setIsDancing(!isDancing);
	};

	return (

		<div onClick={onClick}className={'ending-scene ' + (props.inFront ? ' in-front' : '')}>
			<div className="dance-instructions">{isDancing ? "Tap to stop dancing!" : "Tap to see Gilbert dance!"}</div>
			<Dancer isDancing={isDancing}/>
			<div className="music-player-instructions">Press play on music player below!</div>
			
		</div>
	);
};



export default EndingScene;