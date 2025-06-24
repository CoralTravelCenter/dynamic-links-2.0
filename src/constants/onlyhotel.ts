import { Filter } from "../types";

// Конфигурация для OnlyHotel API запросов
export const ONLYHOTEL_API_CONFIG = {
	DEFAULT_RESERVATION_TYPE: 2, // Тип бронирования по умолчанию для OnlyHotel
} as const;

// HTML атрибуты для функциональности OnlyHotel
export const ONLYHOTEL_HTML_ATTRIBUTES = {
	DESTINATION: "data-onlyhotel-lookup-destination-2", // Атрибут для хранения направления поиска
	DEPTH_DAYS: "data-onlyhotel-lookup-depth-days-2", // Атрибут для количества дней поиска
	NIGHTS: "data-onlyhotel-lookup-nights-2", // Атрибут для количества ночей
	FILTER: "data-onlyhotel-lookup-filter-2", // Атрибут для фильтров поиска
} as const;

// Карта фильтров с предустановленными значениями для поиска отелей
export const onlyHotelFiltersMap: Record<string, Filter> = {
	// Фильтр по доступности (только доступные отели)
	available: {
		type: 21,
		values: [{ id: "2", value: "2", parent: null }],
		providers: null,
	},
	// Фильтр "все включено" (AI - All Inclusive)
	ai: {
		type: 5,
		values: [
			{ id: "1", value: "1", parent: null }, // Полупансион
			{ id: "2", value: "2", parent: null }, // Полный пансион
		],
		providers: [],
	},
	// Фильтр элитных отелей
	elite: {
		type: 3,
		values: [
			{ id: "49", value: "49", parent: null }, // Премиум концепция
			{ id: "1", value: "1", parent: null }, // Люкс концепция
		],
		providers: null,
	},
	// Фильтр семейных отелей
	family: {
		type: 3,
		values: [{ id: "5", value: "5", parent: null }],
		providers: null,
	},
	// Фильтр CFC (Coral Family Club) - клубные семейные отели
	cfc: {
		type: 3,
		values: [{ id: "3", value: "3", parent: null }],
		providers: null,
	},
	// Фильтр CG (Coral Group) - золотые клубные отели
	cg: {
		type: 3,
		values: [{ id: "39", value: "39", parent: null }],
		providers: null,
	},
	// Фильтр расстояния до пляжа: до 50 метров
	"50m": {
		type: 25,
		values: [{ id: "0-50", value: "0-50", parent: null }],
		providers: null,
	},
	// Фильтр расстояния до пляжа: 50-250 метров
	"250m": {
		type: 25,
		values: [{ id: "50-250", value: "50-250", parent: null }],
		providers: null,
	},
	// Фильтр отелей 5 звезд
	"5stars": {
		type: 2,
		values: [{ id: "5", value: "5", parent: null }],
		providers: null,
	},
	// Фильтр отелей 4 звезды
	"4stars": {
		type: 2,
		values: [{ id: "4", value: "4", parent: null }],
		providers: null,
	},
	// Фильтр отелей 3 звезды
	"3stars": {
		type: 2,
		values: [{ id: "3", value: "3", parent: null }],
		providers: null,
	},
	// Фильтр отелей с собственным пляжем
	privatebeach: {
		type: 6,
		values: [{ id: "32", value: "32", parent: null }],
		providers: null,
		parent: [{ id: "3", value: "3", parent: null, providers: [] }],
	},
};

// Параметры URL для OnlyHotel бронирования
export const onlyHotelReservationParam = "&p=2&w=0&s=0";
