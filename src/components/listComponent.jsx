// @ts-nocheck
import React, { Component } from "react";
import { clientData } from '../dataset/clientData';
import { NavLink } from 'react-router-dom';

class ListComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <h1 className="leftPadding centered">Client Transactions</h1>
                {clientData.map((client, i) => (
                    <NavLink key={i} className="link" to={`/character/${i}`} onClick={this.props.listClick} id={i}>{client.name}</NavLink>
                ))}
            </>
        )
    };
}

export default ListComponent;