import React from 'react';

const Dancer = (props) => {
	let cn = 'dancer';

	if (props.isDancing) {
		cn += ' dancing' 
	}

	return(
		<div className={cn}>
					<div className="head">
						<div className="hair left"/>
						<div className="hair right"/>
						<div className="face">
							<div className="glasses left">
								
								<div className="glasses-inner">
									<div className="eye outer">
										<div className="eye inner">
											<div className="iris"></div>
										</div>
									</div>
								</div>
								<div className="ear-bar"/>
								<div className="glasses-bar"/>
							</div>
							<div className="glasses right">
								<div className="glasses-inner">
									<div className="eye outer">
										<div className="eye inner">
											<div className="iris"></div>
										</div>
									</div>
								</div>
								<div className="ear-bar"/>
							</div>
							<div className="nose">
								<div className="nosteral left"/>
								<div className="nosteral right"/>
							</div>
							<div className="mouth"></div>
							
						</div>
					</div>
					<div className="neck">
					</div>
					<div className="torso">
						<div className="belly"></div>
						<div className="upper-arm left">
							<div className="lower-arm left">
								<div className="hand left">
									<div className="thumb left"/>
								</div>
							</div>
						</div>
						<div className="upper-arm right">
							<div className="lower-arm right">
								<div className="hand right">
									<div className="thumb right"/>
								</div>
							</div>
						</div>
					</div>
					<div className="legs">
						<div className="trousers-top"></div>
						<div className="thigh left">
							<div className="lower-leg left">
								<div className="foot left"></div>
								<div className="foot-mask left"></div>
							</div>
						</div>
						<div className="thigh right">
							<div className="lower-leg right">
								<div className="foot right"></div>
								<div className="foot-mask right"></div>
							</div>
						</div>
					</div>
						
				</div>
	);

}

export default Dancer;