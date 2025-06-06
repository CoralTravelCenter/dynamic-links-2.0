export interface HotelLocation {
    id: string;
    name: string;
    friendlyUrl: string;
    type: number;
    parent?: {
        id: string | undefined;
        name: string | undefined;
        type: number | undefined;
        countryId: string | undefined;
    };
}

export interface HotelLocationResponse {
    result: {
        locations: HotelLocation[];
    };
}

export interface Filter {
    type: number;
    values: Array<{ id: string; value: string; parent: null }>;
    providers: any[] | null;
    parent?: Array<{ id: string; value: string; parent: null; providers?: any[] }>;
}

export interface PriceSearchEncryptResponse {
    result: {
        redirectionUrl: string;
        queryParam: string;
    };
}
