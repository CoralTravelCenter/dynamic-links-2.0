import {doRequestToServer} from "../api";
import {PriceSearchEncryptResponse} from "../types";


export async function requestOnlyHotelRedirect(payload: any): Promise<string> {
    console.log('Payload:', JSON.stringify(payload, null, 2));
    const res = await doRequestToServer<PriceSearchEncryptResponse>(
        '/OnlyHotelProduct/PriceSearchEncrypt',
        payload,
        'POST'
    );

    const {redirectionUrl, queryParam} = res.result;

    return `${redirectionUrl}?qp=${queryParam}&p=2&w=0&s=0`; // p=2 означает onlyHotel
}
