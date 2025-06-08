import {doRequestToServer} from "../api";
import {PriceSearchEncryptResponse} from "../types";

export async function requestMultipleHotelsRedirect(payload: any): Promise<string> {
    console.log('Multiple Hotels Payload:', JSON.stringify(payload, null, 2));
    
    // Для множественного поиска отелей используем другой endpoint
    const res = await doRequestToServer<PriceSearchEncryptResponse>(
        '/OnlyHotelProduct/PriceSearchList',
        payload,
        'POST'
    );

    const {redirectionUrl, queryParam} = res.result;

    return `${redirectionUrl}?qp=${queryParam}&p=2&w=0&s=0`; // p=2 означает onlyHotel
}