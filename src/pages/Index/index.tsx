import { Container } from "react-bootstrap";
import AppBar from "../../components/AppBar";
import StvoriNatjecanjeForm from "./StvoriNatjecanjeForm";

function IndexPage() {

    const user = true;

    return (
        <main>
            <AppBar />
            <Container
                className="d-flex justify-content-center my-5"
            >
                <div className='bg-light p-5'>
                    {user ?
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