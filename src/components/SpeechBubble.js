import './SpeechBubble.css';
import React from 'react';

class SpeechBubble extends React.Component {
	
	getVisibleText() {
		return this.props.message.substring(0, this.props.messageIndex);
	}

	getInvisibleText() {
		return this.props.message.substring(this.props.messageIndex, this.props.messageIndex.length)
	}

	

	render() {

		return (
			<div className={'speech-bubble-container ' + (this.props.fadeOut ? ' fade' : '')}>
				<div className="speech-bubble">
					<span>{this.getVisibleText()}</span><span className="invisible-text">{this.getInvisibleText()}</span>
				</div>
			</div>
			);
	} 
}

export default SpeechBubble;