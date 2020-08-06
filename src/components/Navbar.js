import React, { useEffect, useState } from 'react';
import {
  Nav,
  Navbar,
  NavDropdown,
  NavItem,
  NavbarBrand,
  Container
} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export const Navigation = () => {
  const [name, setName] = useState('');

  useEffect(() => {
    const data = localStorage.getItem('name');
    if (data) {
      setName(data);
    }
  }, []);

  return (
    <Navbar className="nav" color="light" sticky="top" bg="light" expand="md">
      <Container>
        <NavbarBrand href="/">Logo</NavbarBrand>
        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse id="navbar-nav">
          <Nav className="ml-auto">
            <NavItem>
              <NavLink className="nav-link" exact to="/">
                Home
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink className="nav-link" to="/page">
                Page
              </NavLink>
            </NavItem>

            {name ? (
              <NavDropdown title={name} id="nav-dropdown">
                <NavDropdown.Item>Dropdown1</NavDropdown.Item>
                <NavDropdown.Item>Dropdown2</NavDropdown.Item>
                <NavDropdown.Item>Dropdown3</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavItem>
                <span className="nav-link" onClick={() => localStorage.clear()}>
                  Logout
                </span>
              </NavItem>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
