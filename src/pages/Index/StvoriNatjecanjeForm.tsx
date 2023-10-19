import { Formik, FormikErrors } from "formik";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import roundrobin from "roundrobin";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import { Bodovanje, FirebaseCollections, Igra, Kolo, Natjecanje } from "../../types/custom";
import fireapp from "../../lib/fireapp";

function ParseNatjecatelji(natjecateljiString: string): string[] {
    if (natjecateljiString.includes(',') && natjecateljiString.includes('\n')) return [];

    let natjecatelji: string[] = [];
    // split po zarezu
    if (natjecateljiString.includes(',')) {
        natjecatelji = natjecateljiString.split(',').map(n => n.trim());
    }
    // split po \n
    if (natjecateljiString.includes('\n')) {
        natjecatelji = natjecateljiString.split('\n').map(n => n.trim());
    }
    return natjecatelji;
}

async function CreateNatjecanje(natjecanje: Natjecanje) {
    const response = await addDoc(collection(fireapp.firestore, 'natjecanja' as FirebaseCollections), natjecanje);
    console.log(`Dodano novo natjecanje: ${response.id}`);
    return response.id;
}

export interface NatjecanjeFormData {
    naziv: string,
    natjecateljiString: string,
    bodovanje: Bodovanje,
}

function StvoriNatjecanjeForm() {

    const { user } = useAuth0();
    const navigate = useNavigate();

    const initialValues: NatjecanjeFormData = {
        naziv: "",
        natjecateljiString: '',
        bodovanje: {
            pobjeda: 0,
            poraz: 0,
            remi: 0,
        },
    };

    return (
        <Formik
            initialValues={initialValues}
            validate={(values) => {
                const errors: FormikErrors<NatjecanjeFormData> = {};

                const natjecatelji: string[] = ParseNatjecatelji(values.natjecateljiString);
                if (!natjecatelji.length) {
                    errors.natjecateljiString = "Krivo unesen format!";
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                console.log("NatjecanjeFormData: ", values);

                const natjecatelji: string[] = ParseNatjecatelji(values.natjecateljiString);
                const schedule = roundrobin(natjecatelji.length, natjecatelji);
                const kola: Kolo[] = [];
                for (let i = 0; i < schedule.length; i++) {
                    const kolo: Kolo = {
                        igre: [],
                    };
                    for (let j = 0; j < schedule[i].length; j++) {
                        const igra: Igra = {
                            natjecatelji: schedule[i][j],
                            score: "",
                            rezultat: "",
                        };
                        kolo.igre.push(igra);
                    }
                    kola.push(kolo);
                }

                if (!user || !user.sub) throw new Error("Korisnik nije logiran!");

                const natjecanje: Natjecanje = {
                    naziv: values.naziv,
                    bodovanje: values.bodovanje,
                    natjecatelji: natjecatelji,
                    kola: kola,
                    ownerId: user.sub,
                };
                CreateNatjecanje(natjecanje)
                    .then(id => {
                        setSubmitting(false);
                        navigate('/natjecanje/' + id);
                    })
                    .catch(err => {
                        setSubmitting(false);
                        console.error(err);
                    });
            }}
        >
            {(formik) => (
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group>
                        <Form.FloatingLabel label='Naziv natjecanja'>
                            <Form.Control type='text' placeholder='' {...formik.getFieldProps('naziv')} required />
                        </Form.FloatingLabel>
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <Form.FloatingLabel label='Natjecatelji (odvojeni zarezom ili novim rektom)'>
                            <Form.Control as="textarea" placeholder='' style={{ height: '250px' }} {...formik.getFieldProps('natjecateljiString')} required />
                        </Form.FloatingLabel>
                        {formik.touched.natjecateljiString && formik.errors.natjecateljiString ?
                            <p className="text-danger">{formik.errors.natjecateljiString}</p>
                            :
                            null
                        }
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <Row>
                            <Col>
                                <Form.FloatingLabel label='Pobjeda'>
                                    <Form.Control type='number' placeholder='' min={0} step={0.1} {...formik.getFieldProps('bodovanje.pobjeda')} required />
                                </Form.FloatingLabel>
                            </Col>
                            <Col>
                                <Form.FloatingLabel label='Remi'>
                                    <Form.Control type='number' placeholder='' min={0} step={0.1} {...formik.getFieldProps('bodovanje.poraz')} required />
                                </Form.FloatingLabel>
                            </Col>
                            <Col>
                                <Form.FloatingLabel label='Poraz'>
                                    <Form.Control type='number' placeholder='' min={0} step={0.1} {...formik.getFieldProps('bodovanje.remi')} required />
                                </Form.FloatingLabel>
                            </Col>
                        </Row>
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <Stack>
                            <Button type='submit' disabled={!formik.isValid || formik.isSubmitting}>Stvori natjecanje</Button>
                        </Stack>
                    </Form.Group>
                </Form>
            )}
        </Formik>
    );
}

export default StvoriNatjecanjeForm;