export type Month = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export type PossibleDay = string | undefined;
export type Matrix = PossibleDay[][];

export type DisabledDays = (day: Date) => boolean;
