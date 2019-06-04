import './Bouncer.css';
import React from 'react';

const Bouncer = ()=> {
	return (
		<div className="bouncer">
			<div className="face">
    			<div className="hair-left-container">
     			</div>
    			<div className="forehead-line forehead-line-1"></div>
    			<div className="forehead-line forehead-line-2"></div>
    			<div className="eyebrow eyebrow-left"></div>
    			<div className="eye eye-left">
      				<div className="inner-eye"></div>
    			</div>
    			<div className="eyebrow eyebrow-right"></div>
    			<div className="eye eye-right">
      				<div className="inner-eye"></div>
    			</div>
   			    <div className="ear left">
      				<div className="ear-mask left"></div>
		      		<div className="ear-line ear-line-left">
		        		<div className="ear-line-mask ear-line-mask-left"></div>
	      			</div>
    			</div>
    			<div className="ear right">
      				<div className="ear-mask right"></div>
       				<div className="ear-line ear-line-right">
        				<div className="ear-line-mask ear-line-mask-right"></div>
      				</div>
    			</div>
    			<div className="nose">
      				<div className="nosteral left-nosteral"></div>
      				<div className="nosteral right-nosteral"></div>
    			</div>
    			<div className="mouth talking"></div>
  			</div>
  		<div className="neck"></div>
  		<div className="collar collar-left"></div>
  		<div className="collar collar-right"></div>
  		<div className="shirt-button"></div>
	</div>

	)
}

export default Bouncer;