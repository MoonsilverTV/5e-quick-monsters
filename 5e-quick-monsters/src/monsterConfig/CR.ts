export type CR = { val: number, label: string }
export const crValues: Array<CR> = [{ val: 0, label: "0" },
{ val: 1 / 8, label: "1/8" },
{ val: 1 / 4, label: "1/4" },
{ val: 1 / 2, label: "1/2" },
...Array.from(Array(30).keys()).map((i) => ({ val: i + 1, label: `${i + 1}` }))]

