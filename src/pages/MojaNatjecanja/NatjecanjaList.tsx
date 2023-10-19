import { collection, query, where } from "firebase/firestore";
import { useCollection } from 'react-firebase-hooks/firestore';

import fireapp from "../../lib/fireapp";
import { FirebaseCollections, Natjecanje } from "../../types/custom";

export interface Props {
    userId: string,
}

function NatjecanjaList({ userId }: Props) {

    const [values, loading, error] = useCollection(
        query(collection(fireapp.firestore, 'natjecanja' as FirebaseCollections), where('ownerId', '==', userId))
    );

    if (loading) return <p>Učitavanje...</p>;
    else if (error) return <p>Greška pri učitavanju {JSON.stringify(error)}</p>;
    else if (values) {
        console.log(values.docs.length);
        if (!values.docs.length) return (
            <p>Korisnik nema napravljena natjecanja</p>
        );
        else return (
            <>
                {values.docs.map(doc => {
                    const natjecanje = doc.data() as Natjecanje;
                    return (
                        <div key={doc.id} className="mb-2">
                            <a href={`/natjecanje/${doc.id}`}>{natjecanje.naziv}</a>
                        </div>
                    );
                })}
            </>
        );
    }
    else return <p>Values not defined!</p>;
}

export default NatjecanjaList;