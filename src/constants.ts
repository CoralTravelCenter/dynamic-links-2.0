import {Filter, ReservationTypeParam} from "./types";

export const defaultDepthDays: number = 14;
export const defaultNights: number = 7;

export const filters: Record<string, Filter> = {
    available: {
        type: 21,
        values: [{id: "2", value: "2", parent: null}],
        providers: null,
    },
    ai: {
        type: 5,
        values: [
            {id: "1", value: "1", parent: null},
            {id: "2", value: "2", parent: null},
        ],
        providers: [],
    },
    elite: {
        type: 3,
        values: [
            {id: "49", value: "49", parent: null},
            {id: "1", value: "1", parent: null},
        ],
        providers: null,
    },
    family: {
        type: 3,
        values: [{id: "5", value: "5", parent: null}],
        providers: null,
    },
    "50m": {
        type: 25,
        values: [{id: "0-50", value: "0-50", parent: null}],
        providers: null,
    },
    "250m": {
        type: 25,
        values: [{id: "50-250", value: "50-250", parent: null}],
        providers: null,
    },
    "5stars": {
        type: 2,
        values: [{id: "5", value: "5", parent: null}],
        providers: null,
    },
    "4stars": {
        type: 2,
        values: [{id: "4", value: "4", parent: null}],
        providers: null,
    },
    "3stars": {
        type: 2,
        values: [{id: "3", value: "3", parent: null}],
        providers: null,
    },
    privatebeach: {
        type: 6,
        values: [{id: "32", value: "32", parent: null}],
        providers: null,
        parent: [{id: "3", value: "3", parent: null, providers: []}],
    },
};

export const reservationTypeParam: ReservationTypeParam = {
    onlyHotel: '&p=2&w=0&s=0',
    package: '&p=1&w=0&s=0',
}
