export interface ITable {
    name: string;
    database: string;
    columns: string[];
}


export interface IEditableTable extends ITable {
    canViewPermission: string[];
    canEditPermission: string[];
}