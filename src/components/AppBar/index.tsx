import { useAuth0 } from "@auth0/auth0-react";
import { Navbar, Image, Stack, Button, Nav } from "react-bootstrap";

function AppBar() {

    const { loginWithPopup, isAuthenticated, user, logout } = useAuth0();

    const handlePrijava = async () => {
        await loginWithPopup();
    };

    const handleLogout = async () => {
        await logout({
            logoutParams: {
                returnTo: window.location.origin,
            }
        });
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
                    {isAuthenticated ?
                        <>
                            <Nav.Link href='/'>Stvori natjecanje</Nav.Link>
                            <Nav.Link href='/moja-natjecanja'>Moja natjecanja</Nav.Link>
                        </>
                        :
                        null
                    }
                </Nav>
                <div>
                    {isAuthenticated ?
                        <Stack direction='horizontal' gap={3}>
                            <h5 className='text-white'>Pozdrav, {user?.name}</h5>
                            <Button variant="light" onClick={handleLogout}>Logout</Button>
                        </Stack>
                        :
                        <Button variant="light" onClick={handlePrijava}>Prijava</Button>
                    }
                </div>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default AppBar;