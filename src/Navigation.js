import { Navbar,Container, Nav } from "react-bootstrap";
import {NavLink,Link} from 'react-router-dom'
const Navigation = () => {
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} className="me-auto issue-brand" to='/'>Issue Tracker</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link as={NavLink} to='/'>Home</Nav.Link>
                            <Nav.Link as={NavLink} to='/issues'>Issues</Nav.Link>
                            <Nav.Link as={NavLink} to='/add'>Add Issues</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default Navigation;
