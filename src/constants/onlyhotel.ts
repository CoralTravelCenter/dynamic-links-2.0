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

// Параметры URL для OnlyHotel бронирования
export const onlyHotelReservationParam = "&p=2&w=0&s=0";
