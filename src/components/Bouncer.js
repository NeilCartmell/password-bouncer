import './Bouncer.css';
import React from 'react';

const Bouncer = (props)=> {
  let nameOfClass = 'bouncer';
  if (props.talking) {
    nameOfClass += ' talking';
  }

  if (props.eyesDown) {
    nameOfClass += ' eyes-down';
  }

  if (props.fadeOut) {
    nameOfClass += ' fade';
  }
  /*<div className={props.talking ? "bouncer talking" : "bouncer"}>*/
	return (
		<div className={nameOfClass}>
			<div className="face">
    			<div className="forehead-line forehead-line-1"></div>
    			<div className="forehead-line forehead-line-2"></div>
    			<div className="eyebrow left"></div>
    			<div className="eye left">
      				<div className="inner-eye"></div>
    			</div>
    			<div className="eyebrow right"></div>
    			<div className="eye right">
      				<div className="inner-eye"></div>
    			</div>
   			    <div className="ear left">
      				<div className="ear-mask left"></div>
		      		<div className="ear-line left">
		        		<div className="ear-line-mask ear-line-mask left"></div>
	      			</div>
    			</div>
    			<div className="ear right">
      				<div className="ear-mask right"></div>
       				<div className="ear-line right">
        				<div className="ear-line-mask ear-line-mask right"></div>
      				</div>
    			</div>
    			<div className="nose">
      				<div className="nosteral left"></div>
      				<div className="nosteral right"></div>
    			</div>
    			<div className="mouth talking"></div>
  			</div>
  		<div className="neck"></div>
  		<div className="collar left"></div>
  		<div className="collar right"></div>
      <div className="torso"></div>
  		<div className="shirt-button"></div>
	</div>

	)
}

export default Bouncer;