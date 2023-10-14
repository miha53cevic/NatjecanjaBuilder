import { collection } from "firebase/firestore";
import { useCollection } from 'react-firebase-hooks/firestore';

import fireapp from "../../lib/fireapp";
import { FirebaseCollections, Natjecanje } from "../../types/custom";

function NatjecanjaList() {

    const [values, loading, error] = useCollection(
        collection(fireapp.firestore, 'natjecanja' as FirebaseCollections)
    );

    if (loading) return <p>Učitavanje...</p>;
    else if (error) return <p>Greška pri učitavanju {JSON.stringify(error)}</p>;
    else if (values) return (
        <>
            {values.docs.filter(doc => doc).map(doc => {
                const natjecanje = doc.data() as Natjecanje;
                return (
                    <div key={doc.id} className="mb-2">
                        <a href={`/natjecanje/${doc.id}`}>{natjecanje.naziv}</a>
                    </div>
                );
            })}
        </>
    );
    else return <p>Values not defined!</p>;
}

export default NatjecanjaList;