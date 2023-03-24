import React from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "../Button";
import './NavBar.css';

const NavBar = ({ notificationCount, buttonTitle, onClickButton, btnIcon }) => {
    const location = useLocation();

    return (
        <div className="header">
            <div className="container">
                <div className="navbar-main">
                    <div className="navbar-left">
                        <Link to={"/"} className="navbar-heading">{location.pathname === "/" ? "Inbox" : location.pathname === "/archived" ? "Archived Calls" : location.pathname}</Link>
                    </div>
                    <div className="navbar-right">
                        <Button
                            onClick={onClickButton}
                            title={buttonTitle}
                            icon={btnIcon}
                            btnStyle={"outlined"}
                            btnType={"primary"}
                        />
                        <span href="/" className="notification-count">{notificationCount}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default NavBar;