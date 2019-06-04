import './SpeechBubble.css';
import React from 'react';

class SpeechBubble extends React.Component {
	constructor(props) {
		super(props);
		console.log("in speech bubble constructor");
	}
	componentWillUpdate() {
		console.log("in speech bubbble will update");
			}

	getText() {
		
	}

	render() {
		return (
			<div className="speech-bubble">{this.props.message.substr(0, this.props.messageIndex)}</div>
			);
	} 
}

export default SpeechBubble;