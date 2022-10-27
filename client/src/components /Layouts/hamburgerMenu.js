import React from "react";
import '../../styles/Layouts/navbar.css';

function HamburgerMenu() {
    return ( 
        <div className="demo">
			<div className="menu-icon">
				<input className="menu-icon__cheeckbox" type="checkbox" />
				<div>
					<span></span>
					<span></span>
				</div>
			</div>
		</div>
     );
}

export default HamburgerMenu;