import {NavLink} from "react-router-dom";
import React from "react";

export const ButtonElem = (props) => {
    return (
        <a className="buttons" onClick={props.fun}>
            {props.text}
        </a>
    )
}

export const ButtonNav = (props) => {
    return (
        <NavLink to={props.link} className="buttons">
            <p>{props.text}</p>
        </NavLink>
    )
}

export const ButtonRep = (props) =>{
    return (
        <button
            className="user_button"
            id={props.id}
            onClick={props.fun}
        >
            {props.text}
        </button>
    )
}
