export type Bodovanje = [number, number, number];
export type Rezultat = 'pobjeda' | 'remi' | 'poraz';

export interface Kolo {
    natjecatelji: [string, string],
    rezultat: Rezultat,
    pobjednik?: string,
}

export interface Natjecanje {
    naziv: string,
    natjecatelji: string[],
    bodovanje: Bodovanje,
    kola: Kolo[],
}