import { Navbar, Image, Stack, Button, Nav } from "react-bootstrap";

function AppBar() {

    const handlePrijava = () => {
    };

    return (
        <Navbar expand="lg" bg='success' data-bs-theme="dark" className="px-2">
            <Navbar.Brand href="/">
                <Stack direction='horizontal' gap={1}>
                    <Image src="/logo.svg" width={'48px'} roundedCircle />
                    <h3>Natjecanja Builder</h3>
                </Stack>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Nav className="flex-grow-1">
                    <Nav.Link href='/'>Stvori natjecanje</Nav.Link>
                    <Nav.Link href='/moja-natjecanja'>Moja natjecanja</Nav.Link>
                </Nav>
                <div>
                    <Button variant="light" onClick={handlePrijava}>Prijava</Button>
                </div>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default AppBar;