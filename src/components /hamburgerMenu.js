import React from "react";
import '../styles/navbar.css';

function HamburgerMenu() {
    return ( 
        <div class="demo">
	<div class="menu-icon">
		<input class="menu-icon__cheeckbox" type="checkbox" />
		<div>
			<span></span>
			<span></span>
		</div>
	</div>
</div>
     );
}

export default HamburgerMenu;