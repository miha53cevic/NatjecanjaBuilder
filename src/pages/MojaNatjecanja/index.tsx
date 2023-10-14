import { Container } from "react-bootstrap";

import AppBar from "../../components/AppBar";
import NatjecanjaList from "./NatjecanjaList";

function MojaNatjecanjaPage() {


    return (
        <main>
            <AppBar />
            <Container
                className="d-flex justify-content-center my-5"
            >
                <div className='bg-light p-5'>
                    <NatjecanjaList />
                </div>
            </Container>
        </main>
    );
}

export default MojaNatjecanjaPage;