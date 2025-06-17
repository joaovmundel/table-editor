export interface MenuItem {
    name: string;
    link: string;
}

export interface DatabaseItem {
    database: string;
    tables: { name: string }[];
}