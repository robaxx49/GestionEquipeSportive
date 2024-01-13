import React, { Component } from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu';
import './css/Layout.css';

export class Layout extends Component {
    static displayName = Layout.name;

    render() {
        return (
            <div className="centered-container">
                <NavMenu className="nav-menu-full-width" />
                <Container className="container-three-quarters-width">
                    {this.props.children}
                </Container>
            </div>
        );
    }
}
