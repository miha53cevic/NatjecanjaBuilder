// nema declaration file-a pa se svoj doda
// https://drag13.io/posts/custom-typings/index.html

declare module 'roundrobin' {
    export default function (n: number, ps: string[]): Array<Array<[string, string]>>;
}