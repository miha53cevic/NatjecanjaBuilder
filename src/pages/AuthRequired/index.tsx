import { useAuth0 } from "@auth0/auth0-react";
import { Button, Container } from "react-bootstrap";

function AuthRequiredPage() {

    const { loginWithRedirect } = useAuth0();

    const handlePrijava = async () => {
        await loginWithRedirect();
    };

    return (
        <Container className='bg-light justify-content-center align-items-center d-flex' style={{ minHeight: '100vh', flexDirection: 'column' }}>
            <h1>401 Auth Required</h1>
            <Button variant="primary" onClick={handlePrijava}>Prijava</Button>
        </Container>
    );
}

export default AuthRequiredPage;