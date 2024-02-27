export const REPO_OWNER = "RahulNavneeth";
export const REPO_NAME = "EVENTS-DATA-24-TEST";

export type API_TYPE = {
    success: boolean;
    message: string;
    data?: any;
}

type CONTACT = {
    incharge: string;
    email: string;
    phno: string;
};

type DETAIL = {
    type:
    | "WORKSHOP"
    | "PRO SHOW"
    | "NON-TECHNICAL"
    | "TECHNICAL"
    | "ONLINE EVENT";
    date: string;
    time: [number, number];
};

export type EVENT = {
    id: string;
    title: string;
    tagline: string;
    description: string;
    rules: Array<string>;
    details: DETAIL;
    prizes: Array<string>;
    contacts: Array<CONTACT>;
    links: Array<string>;
    glink?: string;
    fee: number;
    day: "DAY1" | "DAY2" | "DAY3";
    category: "WK" | "GEN" | "PRO";
};
