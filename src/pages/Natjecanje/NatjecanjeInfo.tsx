import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc, setDoc } from "firebase/firestore";

import fireapp from "../../lib/fireapp";
import { FirebaseCollections, Natjecanje } from "../../types/custom";
import { Col, Form, Row, Stack } from "react-bootstrap";

export interface Props {
    id: string,
}

function StvoriLeaderboard(natjecanje: Natjecanje) {
    const leaderboard = new Map<string, number>();
    for (const natjecatelj of natjecanje.natjecatelji) {
        leaderboard.set(natjecatelj, 0);
    }

    for (const kolo of natjecanje.kola) {
        for (const igra of kolo.igre) {
            if (igra.rezultat === '') continue;
            if (igra.rezultat === 'pobjeda') {
                const pobjednik = igra.natjecatelji[0];
                const pobjednikBodovi = natjecanje.bodovanje['pobjeda'];
                leaderboard.set(pobjednik, (leaderboard.get(pobjednik) ?? 0) + pobjednikBodovi);

                const gubitnik = igra.natjecatelji[1];
                const gubitnikBodovi = natjecanje.bodovanje['poraz'];
                leaderboard.set(gubitnik, (leaderboard.get(gubitnik) ?? 0) + gubitnikBodovi);
            } else if (igra.rezultat === 'poraz') {
                const pobjednik = igra.natjecatelji[1];
                const pobjednikBodovi = natjecanje.bodovanje['pobjeda'];
                leaderboard.set(pobjednik, (leaderboard.get(pobjednik) ?? 0) + pobjednikBodovi);

                const gubitnik = igra.natjecatelji[0];
                const gubitnikBodovi = natjecanje.bodovanje['poraz'];
                leaderboard.set(gubitnik, (leaderboard.get(gubitnik) ?? 0) + gubitnikBodovi);
            } else if (igra.rezultat === 'remi') {
                for (const natjecatelj of igra.natjecatelji) {
                    const remiBodovi = natjecanje.bodovanje['remi'];
                    leaderboard.set(natjecatelj, (leaderboard.get(natjecatelj) ?? 0) + remiBodovi);
                }
            }
        }
    }
    return Array.from(leaderboard).sort((a, b) => b[1] - a[1]);
}


function NatjecanjeInfo({ id }: Props) {

    const [value, loading, error] = useDocumentData(
        doc(fireapp.firestore, 'natjecanja' as FirebaseCollections, id)
    );

    const updateScore = async (koloIndex: number, igraIndex: number, score: string) => {
        if (!value) return;
        // Check if matches format
        if (!(new RegExp(/^(\d+:\d+)?$/).test(score))) return;

        const natjecanje = value as Natjecanje;
        const igra = natjecanje.kola[koloIndex].igre[igraIndex];
        igra.score = score;

        // Saznaj rezultat iz score
        const bodovi = score.split(':').map(i => i.trim()) as [string, string];
        if (bodovi[0] === bodovi[1]) {
            igra.rezultat = 'remi';
        } else if (Number.parseInt(bodovi[0]) > Number.parseInt(bodovi[1])) {
            igra.rezultat = 'pobjeda';
        } else if (Number.parseInt(bodovi[0]) < Number.parseInt(bodovi[1])) {
            igra.rezultat = 'poraz';
        } else {
            igra.rezultat = "";
        }
        console.log("Rezultat: " + igra.rezultat);

        try {
            await setDoc(doc(fireapp.firestore, 'natjecanja' as FirebaseCollections, id), natjecanje);
            console.log(`Updated score for kolo: ${koloIndex}, igra: ${igraIndex}, score: ${score}`);
        } catch (err) {
            console.error(error);
        }
    };

    if (loading) return <p>Učitavanje...</p>;
    else if (error) return <p>Greška pri učitavanju {JSON.stringify(error)}</p>;
    else if (value) {
        const natjecanje = value as Natjecanje;
        return (
            <div>
                <h1>Natjecanje: {natjecanje.naziv}</h1>
                <p>Owner: {natjecanje.ownerId}</p>
                <br />
                <h2>Natjecatelji</h2>
                {natjecanje.natjecatelji.map((n, i) => (
                    <p key={`natjecatelj-${i}`}>{n}</p>
                ))}
                <br />
                <h2>Bodovanje</h2>
                <Stack direction='horizontal' gap={5}>
                    <p>Pobjeda: {natjecanje.bodovanje.pobjeda}</p>
                    <p>Remi: {natjecanje.bodovanje.remi}</p>
                    <p>Poraz: {natjecanje.bodovanje.poraz}</p>
                </Stack>
                <br />
                <Row>
                    <Col>
                        <h3>Kola</h3>
                        {natjecanje.kola.map((kolo, koloIndex) => (
                            <div key={`kolo${koloIndex}`}>
                                <h4>{koloIndex + 1}</h4>
                                <hr />
                                <Stack direction='horizontal' className='flex-wrap' gap={5}>
                                    {kolo.igre.map((igra, igraIndex) => (
                                        <Stack direction='vertical' key={`igra${igraIndex}`}>
                                            <table border={1}>
                                                <tbody>
                                                    <tr>
                                                        <td>{igra.natjecatelji[0]}</td>
                                                        <td>VS</td>
                                                        <td>{igra.natjecatelji[1]}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <Form.Group>
                                                <Form.Control type='text' placeholder="0:0" defaultValue={igra.score} onBlur={(e) => updateScore(koloIndex, igraIndex, e.target.value)} />
                                            </Form.Group>
                                        </Stack>
                                    ))}
                                </Stack>
                                <br />
                            </div>
                        ))}
                    </Col>
                    <Col>
                        <h3>Leaderboard</h3>
                        <Stack direction='vertical'>
                            {StvoriLeaderboard(natjecanje).map((item, i) => (
                                <Stack direction='horizontal' key={i} gap={5}>
                                    <p>{item[1]}</p>
                                    <p>{item[0]}</p>
                                </Stack>
                            ))}
                        </Stack>
                    </Col>
                </Row>
            </div>
        );
    }
    else return <p>Ne postoji natjecanje s tim id!</p>;
}

export default NatjecanjeInfo;