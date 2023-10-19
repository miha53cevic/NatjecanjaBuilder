import { Container } from "react-bootstrap";

function NotFoundPage() {
    return (
        <Container className='bg-light justify-content-center align-items-center d-flex' style={{ minHeight: '100vh', flexDirection: 'column' }}>
            <h1>404 not found</h1>
            <a href={'/'}>Natrag na početnu</a>
        </Container>
    );
}

export default NotFoundPage;