import React, { useEffect, useRef } from "react";
import "./Header.css";

const Header = () => {
	return (
		<div className="container">
			<header className="header">
				<div className="logo">
					<img
						src="http://vignette1.wikia.nocookie.net/disney/images/8/8b/Starwars-logo.png/revision/latest?cb=20141129122237"
						alt="Star Wars Logo"
					/>
				</div>
			</header>
		</div>
	);
};

export default Header;
