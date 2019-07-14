import './App.css';
import React from 'react';
import Bouncer from './Bouncer.js';
import SpeechBubble from './SpeechBubble.js';
import Doors from './Doors.js';
import EndingScene from './EndingScene.js';


class App extends React.Component {
	
	constructor(props) {
		super(props);

		this.state = {
			showPassword: false,
			password: '', 
			savedPasswords: [],
			bouncerMessage: 'I\'m going to need you to choose a password before you can come in mate!',
			messageIndex: 0,
			talking: false,
			eyesDown: false,
			round: 1,
			bouncerHasBlownIt: false,
			haveWon: false ,
			doorsOpened: false
		}

		this.conditions = [
			{f: () => this.hadThisPassword(), message: 'You\'ve already had that password. Can\'t use it again!'},
	   	{f: ()=> this.regex(/^\s*$/), 
			message: 'Well write something then!'},
		{f: ()=> this.regex(/fuck|shit|cock|cunt|bloody|twat|piss|tits|bastard|bellend|dick|prick|pussy|bitch|damn/i), 
			message: 'LANGUAGE! There\'s no need for that mate! Clean it up this is a family place!'},
		{f: ()=> this.regex(/hello.*world/i), message:'Well hello programmer with no imagination! Try something more original please!'},
		{f: ()=> this.regex(/password/i), 
			message: 'Is that supposed to be funny? No, you muppet, you can\'t have password for a PASSWORD!'},
		{f: ()=> this.regex(/\$/), message: 'We\'ll have none of these $ signs. We use pound signs round here mate! Bloody foreigners!'},
		{f: ()=> this.alphaOrder(2),
			message: 'Are you just going through the alphabet? If three or more letters are in alphabetical order, a child could guess it!'},
		{f: ()=> this.regex(/#/), 
			message: 'What do you think this is...TWITTER? No hashtags!'},
		{f: ()=> this.regex(/\?/),
			message: 'Are you asking me or telling me? Be more sure of yourself. No questions!'},
		{f: ()=> this.regex(/[%\-+=]/), 
			message: 'Think you\'re clever do ya? Well Maths confuses me mate! No % - + = allowed!'},
		{f: ()=> this.regex(/@/), 
			message: 'You must be confused! I don\'t want your email address silly! What are you like?'},
		{f: ()=> this.regex(/\s/), 
			message: 'No spaces mate!'},
		{f: ()=> this.tooMany(5),
			message: 'Variety is the spice of life mate! You\'ve used the same character too many times!'},
		{f: ()=> this.regex(/123/), 
			message: 'Wow! You are stupid 123...How will anyone be able to crack that? No!'},
		{f: ()=> this.regex(/1234/), 
			message: 'Wow! You are stupid. 1234...How will anyone be able to crack that? No!'},
		{f: ()=> this.regex(/^.{0,7}$/), 
			message: 'Got to be at least 8 characters mate!'},
		{f: ()=> this.regex(/^[^a-zA-Z]+$/), 
			message: 'Well put some letters in there mate! It is called a passWORD after all!'},
		{f: ()=> this.regexIsBelowMin(/[a-zA-Z]/g, 4),
			message: 'I need to see at least 4 letters. It is passWORD after all!'},
		{f: () => this.regexInverse(/[A-Z]/), 
			message: 'Did you never learn how to write the big letters in school? Put a capital letter in there!'},
		{f: ()=> this.regexInverse(/[a-z]/),
			message: 'Alright, I ain\'t deaf! Don\'t shout EVERY letter!'
		},
		{f: ()=> this.regexInverse(/[1-9]/),
			message: 'Gotta have some numbers in there mate!'},
		{f: ()=> this.regex(/(?:\D|\b)([1-9][0-9])(?:\D|\b)/), message: 'Don\'t use your age as the number you plonker! No two digit numbers'},
		{f: ()=> this.regexIsBelowMin(/\d/g, 2),
			message: 'One measly digit! And you think that\'s good enough to stop a hacker? No!'},
		{f: ()=> this.numbersInOrder(),
			message: 'I\'m pleased that you\'ve learned how to count...But we don\'t want any adjacent numbers going up and down in the right order mate!'},
		{f: ()=> this.regex(/(?:\D|\b)(\d{4})(?:\D|\b)/), 
			message: 'Don\'t use your pin number you idiot! No four digit numbers'},
		{f: ()=> this.regex(/\d{5,}/), 
			message: 'I don\'t want you\'re phone number mate! You\'re not my type. Keep numbers shorter than that'},
		{f: ()=> this.regexIsAboveMax(/[e]/gi, 2), 
			message: 'E is the most common letter mate. Don\'t be so obvious. 2 Es max'},
		{f: ()=> this.regexInverse(/[^A-Za-z0-9]/), 
			message: 'Put some special symbols in their mate. Letters and numbers are too obvious these days!'},
		{f: ()=> this.regexIsBelowMin(/[^A-Za-z0-9]/g, 2), 
			message: 'Well that\'s hardly enough special symbols is it? I\'ll need to see at least 2.'},
		{f: ()=> this.regex(/[^A-Za-z0-9]{2,}/, 2), 
			message: 'Well don\'t put the special symbols next to each other! Split \'em up!'},
		{f: ()=> this.regexIsAboveMax(/[a|e|i|o|u]/gi, 5), message: 'Woah! Vowel city over here! Want to buy another vowel? Tough! 5 vowels max!'},
		{f: ()=> this.regex(/^.{8,11}$/),
			message: 'Did I say at least 8 characters? I meant 12 mate!'},
		{f: ()=> this.regex(/^.{15,}$/), 
			message: 'Now you\'re being silly. You\'ll never remember all that! 14 characters max!'}
		];
	}

	componentDidMount() {
		this.startSpeech();
	}

	regex (pattern) {
		return pattern.test(this.state.password);
	};

	regexInverse (pattern) {
		return !pattern.test(this.state.password);
	}

	regexIsAboveMax(pattern, max) {
		let match = this.state.password.match(pattern);
		return !(match === null) && match.length > max;
	};

	regexIsBelowMin(pattern, min){
		let match = this.state.password.match(pattern);
		return (match === null) || match.length < min;
	};

	tooMany(max) {
		const counter ={}

		for (let i=0; i < this.state.password.length; i++) {
			let c = this.state.password.charAt(i);
			if (counter['_' + c] === undefined) {
				counter['_' + c] = 1;
			} else {
				counter['_' + c] ++;

				if (counter['_' + c] >= max) {
					return true;
				}
			}
		}
		return false;
	};

	numbersInOrder() {
		let lastN = undefined;

		for (let i=0; i < this.state.password.length; i++) {
			let c = this.state.password.charAt(i);
			
			if (!isNaN(c)) {
				c = parseInt(c);
			
				if ((c - 1) === lastN || (c + 1) === lastN) {
					return true;
				}
				lastN = c;
			} else {
				lastN = undefined;
			}
		}
		return false;
	};

	/*Matches if characters that are in alphabetical order are above max allowed
	/* There MUST be an easier way of doing this! I know I'm being  stupid. But it basically matches the letters
	* converts them to numbers to make it easy to compare. Note a678b787c would still be classed as alphabeical order even
	* thought numbers break them up*/
	alphaOrder(maxAllowed){
		let match = this.state.password.match(/[A-z]/g);

		if (match === null || match.length <= maxAllowed) {
			return false;
		}
		
		let alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
		let matchConverted = match.map((c)=> alphabet.indexOf(c.toLowerCase()));
		let last = undefined;
		let sameCount = 0;
		for (let i=0; i < matchConverted.length; i++) {
			let current = matchConverted[i];
			
			if (current === (last + 1)) {
				sameCount++;
			} else {
				sameCount = 0;
			}

			last = current;

			if (sameCount >= maxAllowed) {
				return true;
			}
		}
		
		return false;
	}
	
	hadThisPassword() {
		return this.state.savedPasswords.indexOf(this.state.password) > -1;
	};

	onPasswordChange = (event) => {
		/*Bouncer looks down whenever you type something. After one second of not typing
		/*he looks back up. This resets the timer every time you type something.
		*/
		clearTimeout(this.eyesDownTimerId);
		this.eyesDownTimerId = setTimeout(()=>{this.setState({eyesDown: false})}, 1000);
		this.setState({password: event.target.value, eyesDown: true});
	};


	toggleShowPassword = (event) => {
		this.setState({showPassword: event.target.checked});
	};

	onSubmit = (event) => {
		if (this.state.haveWon) {
			return;
		}

		this.startSpeech();
		
		if (this.state.round === 1) {
			this.onRound1Submit();

		} else if (this.state.round === 2) {
			this.onRound2Submit();
			
		} 
	};

	incrementMessageIndex = () => {
		
		this.setState((prevState)=>{
			let talking = true;
			let index = prevState.messageIndex + 1;
			if (prevState.bouncerMessage.charAt(index) === ' ') {
				index++;
			}

			if (index === prevState.bouncerMessage.length) {
				clearInterval(this.intervalId);
				talking = false;
				//this.stopSpeech(); /*can't call stop speech because update function should be pure apparently!*/
			}
			return {messageIndex: index, talking: talking};
		});

	};

	startSpeech() {
		clearInterval(this.intervalId);
		this.setState({messageIndex: 0, talking: true});
		this.intervalId = setInterval(()=>{this.incrementMessageIndex()}, 20);
	}

	stopSpeech() {
		clearInterval(this.intervalId);
		this.setState({talking: false});
	}

	onRound1Submit() {
		const testResults = this.testAll();

			if (testResults.passed) {
				this.setState((prevState)=> {
					prevState.savedPasswords.push(prevState.password);/* double check all this*/
					
					return {bouncerMessage: 'Okay then, I suppose that is good enough...But just so I know that it\'s really memorable...type it out again exactly the same!',
							savedPasswords: prevState.savedPasswords,
							password: '',
							round: 2
							};
				});
			} else {
				this.setState({bouncerMessage: testResults.failedMessage});
			}
	};


	onRound2Submit() {
		const savedPassword = this.state.savedPasswords[this.state.savedPasswords.length - 1];

		if (this.state.password === savedPassword) {
				if (!this.state.bouncerHasBlownIt) {
					this.setState({bouncerMessage: `Mmmh ${savedPassword}...I like it! Ooops I've only gone and said it out loud! You'll have to pick another one now mate. Sorry! I promise I won't do it again!`,
								   bouncerHasBlownIt: true,
								   round: 1,
								   password: ''
					});
					
				} else {
					this.onWin();
				}
			} else {
				this.setState({bouncerMessage: 'Sorry! They didn\'t match. Must not be memorable enough. Pick another one!',
								round: 1,
								password: ''
							 });
			}
	};

	onWin() {
		this.setState({haveWon: true, bouncerMessage: 'Come on in mate! The party is in full swing. Gilbert will be so pleased you came!'});
	}

	onDoorsOpened = () => {
		this.setState({doorsOpened: true});
	};

	testAll() {
		let passed = true;
		let failedMessage;

		for (let i=0; i < this.conditions.length; i++) {
			let condition = this.conditions[i];

			if (condition.f()) { //matches expression so user has failed. 
				failedMessage = condition.message;
				passed = false;
				break;
			}
		}

		return {passed: passed, failedMessage: failedMessage}
	}

	render() {
	/*Not in form elememt because that makes browsers ask if you want to save password which is annoying. So input looks
	* for enter key to submit
	*/
		return (
			<div className="app">

				{this.state.haveWon &&
					<EndingScene inFront={this.state.doorsOpened}/>
				}
				<Doors open={this.state.haveWon} onDoorsOpened={this.onDoorsOpened}/>
				<SpeechBubble message={this.state.bouncerMessage} messageIndex={this.state.messageIndex} fadeOut={this.state.haveWon}/>
				<Bouncer talking={this.state.talking} eyesDown={this.state.eyesDown} fadeOut={this.state.haveWon}/>
				

				{this.state.haveWon && //congratulations, you now get to hear me rap
					<div className="music-player">
						<iframe title="music-player" width="100%" height="100" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/632633979&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
					</div>
				}

				{!this.state.haveWon &&
				<div className={'input-wrap' + (this.state.haveWon ? ' fade' : '')}>
					<label className="password">Password:</label>
					<input placeholder="Enter Password" type={this.state.showPassword ? "text" : "password"} onChange={this.onPasswordChange} onKeyUp={ (e)=>{if(e.keyCode === 13) this.onSubmit()}} value={this.state.password}/>
					<div>
						<label className="show-password">
							<input type="checkbox" onChange={this.toggleShowPassword}/>
							Show password
						</label>
					</div>
					<div>
					<button onClick={this.onSubmit}>Submit</button>
					</div>

				</div>
				}
			</div>

		);
	}
}

export default App;