import { Monoid } from "fp-ts/lib/Monoid";

export const MonoidHtmlElements: Monoid<HTMLElement[]> = {
    concat: (x, y) => x.concat(y),
    empty: []
}

export const MonoidHtmlString: Monoid<string> = {
    concat: (x: string, y: string) => x + y,
    empty: ""
}