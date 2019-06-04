import './App.css';
import React, {useState} from 'react';
import Bouncer from './Bouncer.js';
/*(?<!\d)\d{2}(?!\d)*/ /* look aheads*/
/*/(?:\D|\b)([1-9][0-9])(?:\D|\b)/*/

const App = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [password, setPassword] = useState('');
	const [savedPasswords, setSavedPasswords] = useState([]);
	const [bouncerMessage, setBouncerMessage] = useState('Choose your password!');
	const [round, setRound] = useState(1); 
	const [bouncerHasBlownIt, setBouncerHasBlownIt] = useState(false);

	const conditions2 = [
		{f: ()=>alphaOrder(2),
			message: 'Are you just going through the alphabet? If 3 or more letters are in alphabetical order, a child could guess it!'}
	]

	const conditions = [
		{f: () => hadThisPassword(), message: 'You\'ve already had that password. Can\'t use it again!'},
	   	{f: ()=> regex(/^\s*$/), 
			message: 'Well write something then!'},
		{f: ()=> regex(/fuck|shit|cock|cunt|bloody|twat|piss|tits|bastard|bellend|dick|prick|pussy|bitch|damn/i), 
			message: 'LANGUAGE! There\'s no need for that mate! Clean it up this is a family place!'},
		{f: ()=> regex(/hello.*world/i), message:'Well hello programmer with no imagination! Try something more original please!'},
		{f: ()=> regex(/password/i), 
			message: 'Is that supposed to be funny? No, you muppet, you can\'t have password for a PASSWORD!'},
		{f: ()=> regex(/\$/), message: 'We\'ll have none of these $ signs. We use pound signs round here mate! Bloody foreigners!'},
		{f: ()=>alphaOrder(2),
			message: 'Are you just going through the alphabet? If three or more letters are in alphabetical order, a child could guess it!'},
		{f: ()=> regex(/#/), 
			message: 'What do you think this is...TWITTER? No hashtags!'},
		{f: ()=> regex(/\?/),
			message: 'Are you asking me or telling me? Be more sure of yourself. No questions!'},
		{f: ()=> regex(/[%\-+=]/), 
			message: 'I HATE maths! It\'s a personal taste thing...but no % - + = YUCK!'},
		{f: ()=> regex(/\s/), 
			message: 'No spaces mate!'},
		{f: ()=> tooMany(5),
			message: 'Variety is the spice of life mate. You\'ve used the same character too many times'},
		{f: ()=> regex(/123/), 
			message: 'Wow! You are stupid 123...How will anyone be able to crack that! No!'},
		{f: ()=> regex(/1234/), 
			message: 'Wow! You are stupid. 1234...How will anyone be able to crack that! No!'},
		{f: ()=> regex(/^.{0,7}$/), 
			message: 'Got to be at least 8 characters mate!'},
		{f: ()=> regex(/^[^a-zA-Z]+$/), 
			message: 'Well put some letters in there mate! It is called a passWORD after all!'},
		{f: ()=> regexIsBelowMin(/[a-zA-Z]/g, 4),
			message: 'I need to see at least 4 letters. It is passWORD after all!'},
		{f: () => regexInverse(/[A-Z]/), 
			message: "Did you never learn how to write the big letters in school? Put a capital letter in there!"},
		{f: ()=> regexInverse(/[1-9]/),
			message: 'Gotta have some numbers in there mate!'},
		{f: ()=> regex(/(?:\D|\b)([1-9][0-9])(?:\D|\b)/), message: 'Don\'t use your age as the number you plonker! No two digit numbers'},
		{f: ()=> regexIsBelowMin(/\d/g, 2),
			message: 'One measly digit! And you think that\'s good enough to stop a hacker? No!'},
		{f: ()=>numbersInOrder(),
			message: 'I\'m pleased that you\'ve learned how to count...But we don\'t want any adjacent numbers going up and down in the right order mate!'},
		{f: ()=> regex(/(?:\D|\b)(\d{4})(?:\D|\b)/), 
			message: 'Don\'t use your pin number you idiot! No four digit numbers'},
		{f: ()=> regex(/\d{5,}/), 
			message: 'I don\'t want you\'re phone number mate! You\'re not my type. Keep numbers shorter than that'},
		{f: ()=> regexIsAboveMax(/[e]/gi, 2), 
			message: 'E is the most common letter mate. Don\'t be so obvious. 2 Es max'},
		{f: ()=> regexInverse(/[^A-Za-z0-9]/), 
			message: 'Put some special symbols in their mate. Letters and numbers are too obvious these days!'},
		{f: ()=> regexIsBelowMin(/[^A-Za-z0-9]/g, 2), 
			message: 'Well that\'s hardly enough special symbols is it? I\'ll need to see at least 2.'},
		{f: ()=> regex(/[^A-Za-z0-9]{2,}/, 2), 
			message: 'Well don\'t put the special symbols next to each other! Split \'em up!'},
		{f: ()=> regexIsAboveMax(/[a|e|i|o|u]/gi, 5), message: 'Woah! Vowel city over here! Want to buy another vowel? Tough! 5 vowels max!'},
		{f: ()=> regex(/^.{8,11}$/),
			message: 'Did I say at least 8 characters? I meant 12 mate!'},
		{f: ()=> regex(/^.{15,}$/), 
			message: 'Now you\'re being silly. You\'ll never remember all that! Max 14 characters'}
		];

	const regex = (pattern) => {
		return pattern.test(password);
	};

	const regexInverse = (pattern) => {
		return !pattern.test(password);
	}

	const regexIsAboveMax = (pattern, max) => {
		let match = password.match(pattern);
		return !(match === null) && match.length > max;
	};

	const regexIsBelowMin = (pattern, min) => {
		let match = password.match(pattern);
		return (match === null) || match.length < min;
	};

	const tooMany = (max) => {
		const counter ={}

		for (let i=0; i < password.length; i++) {
			let c = password.charAt(i);
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

	const numbersInOrder = () => {
		let lastN = undefined;

		for (let i=0; i < password.length; i++) {
			let c = password.charAt(i);
			
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
	* converts them to numbers to make it easy to compare. Note a678b787c would still be class as alphabeical order even
	* thought numbers break them up*/
	const alphaOrder =  (maxAllowed) => {
		let match = password.match(/[A-z]/g);

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

			/* Why isn't this just > maxAllowed. Because if 'abc', 'a' would not increase sameCount only 'bc' would, because
			/* the previous letter was the one before
			*/
			if (sameCount >= maxAllowed) {
				return true;
			}
		}
		
		return false;
	}
	
	const hadThisPassword = () => {
		return savedPasswords.indexOf(password) > -1;
	};

	const onPasswordChange = (event) => {
		setPassword(event.target.value)
	};

	const toggleShowPassword = (event) => {
		setShowPassword(event.target.checked);
	};

	const onSubmit = (event) => {
		
		if (round === 1) {
			onRound1Submit();

		} else if (round === 2) {
			onRound2Submit();
			
		} 
	};

	const onRound1Submit = () => {
		const testResults = testAll();

			if (testResults.passed) {
				setBouncerMessage('Okay then, I suppose that is good enough...But just so I know that it\'s really memorable...type it out again exactly the same!');
				savedPasswords.push(password);
				setSavedPasswords(savedPasswords);
				setPassword('');
				setRound(2);
			} else {
				setBouncerMessage(testResults.failedMessage);
			}
	};


	const onRound2Submit = () => {
		const savedPassword = savedPasswords[savedPasswords.length - 1];

		if (password === savedPassword) {
				if (!bouncerHasBlownIt) {
					setBouncerMessage(`Well done you have successfully created a password....Mmmh ${savedPassword} is a pretty good choice....Ooops I've only gone and said your password out loud! You are gonna have to pick another one mate. Sorry. I hold my hands up. My fault. I promise I won't do it next time!`)
					setBouncerHasBlownIt(true);
					setRound(1);
					setPassword('');
				} else {
					setBouncerMessage('Well done! Come on in mate! The party is just getting started. We\'ve been waiting for you!');
				}
			} else {
				setBouncerMessage('Sorry! They didn\'t match. Must not be memorable enough. Pick another one!');
				setRound(1);
				setPassword('');
			}
	};

	const testAll = () => {
		let passed = true;
		let failedMessage;

		for (let i=0; i < conditions.length; i++) {
			let condition = conditions[i];

			if (condition.f()) { //matches expression so user has failed. 
				failedMessage = condition.message;
				passed = false;
				break;
			}
		}

		return {passed: passed, failedMessage: failedMessage}
	}


	/*Not in form elememt because that makes browsers ask if you want to save password which is annoying. So input looks
	* for enter key to submit
	*/
	return (
		<div className="app">
				<Bouncer/>
				<label>Choose password:</label>
				<br/>
				<input type={showPassword ? "text" : "password"} onChange={onPasswordChange} onKeyUp={ (e)=>{if(e.keyCode === 13) onSubmit()}} value={password}/>
				<div>
					
					<label>
						<input type="checkbox" onChange={toggleShowPassword}/>
						Show Password
					</label>
				</div>
				<div>
					<button onClick={onSubmit}>Submit</button>
				</div>
				<div>
					{bouncerMessage}
				</div>
		</div>

	);
	
}

export default App;