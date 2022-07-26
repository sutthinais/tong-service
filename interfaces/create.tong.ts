
export interface CreateTong {
    documentId: number;
    tongId:     string;
    linenumber:      number;
    tong:       Tong[];
}

export interface Tong {
    roworder:          number;
    itemCode:          string;
    itemDescription:   string;    
    quantityInTong:    number;
    uoMCode:           string;
    status?:            boolean;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toCreateTong(json: string): CreateTong {
        return JSON.parse(json);
    }

    public static createTongToJson(value: CreateTong): string {
        return JSON.stringify(value);
    }
}
