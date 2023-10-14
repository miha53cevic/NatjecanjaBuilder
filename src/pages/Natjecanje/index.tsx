import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

import AppBar from "../../components/AppBar";
import NatjecanjeInfo from "./NatjecanjeInfo";

function NatjecanjePage() {
    const { id } = useParams();

    return (
        <main>
            <AppBar />
            <Container
                className="d-flex justify-content-center my-5"
            >
                <div className='bg-light p-5 w-100'>
                    <NatjecanjeInfo id={id ?? ''} />
                </div>
            </Container>
        </main>
    );
}

export default NatjecanjePage;