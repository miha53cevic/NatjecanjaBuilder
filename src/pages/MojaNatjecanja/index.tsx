import { Container } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

import AppBar from "../../components/AppBar";
import NatjecanjaList from "./NatjecanjaList";

function MojaNatjecanjaPage() {

    const { user } = useAuth0();

    return (
        <main>
            <AppBar />
            <Container
                className="d-flex justify-content-center my-5"
            >
                <div className='bg-light p-5'>
                    <NatjecanjaList userId={user?.sub ?? ''} />
                </div>
            </Container>
        </main>
    );
}

export default MojaNatjecanjaPage;