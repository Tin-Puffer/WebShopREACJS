import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';





function HeaderAdmin({ children }) {
    return (
        <div>
            <header>

            <div style={{width:'1320px'}}>
        
        <Navbar bg="dark" variant="dark" style={{width: '100%'}}>
    <Container>
      <Navbar.Brand href="#home">Navbar</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#features">Features</Nav.Link>
        <Nav.Link href="#pricing">Pricing</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
    </div>
            </header>
            
           

            <div className="container">
                <div className="content">{children}</div>
            </div>
            
        </div>
    );
}

export default HeaderAdmin;