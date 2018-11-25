"Used template from https://reactstrap.github.io/components/navbar/"
import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';

import MenuButton from './MenuButton.js';
import styled from 'styled-components';
import logo from '../img/logo.svg';

const LogoStyle = styled.div`
margin: 10px auto;
img {
    height: 60px;
    max-width: 100%;
}
`;

const AccountIconStyle = styled.div`
padding: 10px;
`;

class Header extends React.Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div>
                {/*Setting the color and setting display adjustments*/}
                <Navbar color="warning" light expand="md">
                    {/*Logo; redirects back to main page*/}
                    <LogoStyle className="col-md-2">
                        <a href="/"><img src={logo} alt='CineScope' /></a>
                    </LogoStyle>
                    {/*Compresses navbar buttons into a toggler if the window is too small*/}
                    <NavbarToggler onClick={this.toggle}/>
                    {/*Navbar contents*/}
                    <Collapse className="col-md-8" isOpen={this.state.isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem style={{fontSize: 20, fontWeight: 'bold'}}>
                                <NavLink href="/">Home</NavLink>
                            </NavItem>
                            <NavItem style={{fontSize: 20, fontWeight: 'bold'}}>
                                <NavLink href="/all-movies">All Movies</NavLink>
                            </NavItem>
                            <NavItem style={{fontSize: 20, fontWeight: 'bold'}}>
                                <NavLink href="/Comparitron">Comparitron</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                    {/*User profile picture*/}
                    <AccountIconStyle className="col-md-2">
                        <MenuButton name={"account"} link={"/profile"} />
                    </AccountIconStyle>
                </Navbar>
            </div>
        );
    }
}

export default Header;
