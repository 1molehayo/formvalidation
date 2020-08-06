import React from 'react';
import {
  Nav,
  Navbar,
  NavDropdown,
  NavItem,
  NavbarBrand,
  Container
} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useAuth } from 'utility/useAuth';

export const Navigation = () => {
  const { user, logout } = useAuth();

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

            {user?.name ? (
              <NavDropdown title={user.name} id="nav-dropdown">
                <NavDropdown.Item>Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={() => logout()}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavItem>
                <span className="nav-link">Login</span>
              </NavItem>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
