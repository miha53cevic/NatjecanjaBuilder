export interface Bodovanje {
    pobjeda: number,
    remi: number,
    poraz: number,
}
export type Rezultat = keyof Bodovanje;

export interface Igra {
    natjecatelji: [string, string],
    score: string,
    rezultat?: Rezultat,
    pobjednik?: string,
}

export interface Kolo {
    igre: Igra[]
}

export interface Natjecanje {
    naziv: string,
    natjecatelji: string[],
    bodovanje: Bodovanje,
    kola: Kolo[],
    ownerId: string,
}

export type FirebaseCollections = 'natjecanja';