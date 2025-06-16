import { DataType } from "./data-type.type";
import { IPermission } from "./permissions.interface";

export interface IColumn {
    name: string;
    type: DataType;
    database: string;
    table: string;
    isEditable?: boolean;
    canViewPermission?: IPermission[];
    canEditPermission?: IPermission[];
}
