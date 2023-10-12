import { useParams } from "react-router-dom";

function NatjecanjePage() {
    const { id } = useParams();

    return (
        <p>{id}</p>
    );
}

export default NatjecanjePage;