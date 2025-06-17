import {doRequestToServer} from "../api";
import {OnlyHotelPriceSearchEncryptResponse} from "../types";


export async function requestOnlyHotelRedirect(payload: any): Promise<string> {
    const res = await doRequestToServer<OnlyHotelPriceSearchEncryptResponse>(
        '/OnlyHotelProduct/PriceSearchList',
        payload,
        'POST'
    );

    const {redirectionUrl, queryParam} = res.result;
    return `${redirectionUrl}?qp=${queryParam}`; // p=2 означает onlyHotel
}
