import React, { FC, ReactNode } from 'react';



import {
    Container,
    Dropdown,
    Form,
    Nav,
    Navbar,

} from 'react-bootstrap';


function NavbarTest() {

    return (
        <Nav defaultActiveKey="/home" as="ul">
            <Nav.Item as="li">
                <Nav.Link href="/home">Active</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
                <Nav.Link eventKey="link-1">Link</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
                <Nav.Link eventKey="link-2">Link</Nav.Link>
            </Nav.Item>
        </Nav>
    );
};

export default NavbarTest;
