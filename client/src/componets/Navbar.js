import React from 'react';

// NavLink - change url
import { NavLink } from 'react-router-dom';

function Navbar(props) {
	return (
		<nav class="navbar navbar-expand-lg navbar-light bg-light">
			<NavLink className="navbar-brand" to="/">
				Rent me
			</NavLink>
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarSupportedContent"
				aria-controls="navbarSupportedContent"
				aria-expanded="false"
				aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav mr-auto">
					<li class="nav-item active">
						<NavLink to="/" className="nav-link">
							Home
						</NavLink>
					</li>
					<li class="nav-item">
						<NavLink to="/private" className="nav-link">
							Private
						</NavLink>
					</li>
					<li class="nav-item">
						<NavLink to="/messages" className="nav-link">
							Messages
						</NavLink>
					</li>
					<li class="nav-item">
						<NavLink to="/help" className="nav-link">
							Help
						</NavLink>
					</li>
				</ul>
			</div>
		</nav>
	);
}

export default Navbar;
