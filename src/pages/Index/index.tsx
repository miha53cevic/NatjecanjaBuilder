import { useAuth0 } from "@auth0/auth0-react";
import { Container } from "react-bootstrap";

import AppBar from "../../components/AppBar";
import StvoriNatjecanjeForm from "./StvoriNatjecanjeForm";

function IndexPage() {

    const { isAuthenticated } = useAuth0();

    return (
        <main>
            <AppBar />
            <Container
                className="d-flex justify-content-center my-5"
            >
                <div className='bg-light p-5'>
                    {isAuthenticated ?
                        <StvoriNatjecanjeForm />
                        :
                        <p className='text-danger'>Za izradu natjecanja potrebno se prijaviti!</p>
                    }
                </div>
            </Container>
        </main>
    );
}

export default IndexPage;