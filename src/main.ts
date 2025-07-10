import {hostReactAppReady} from "./utils";
import {handleOnlyHotelClick} from "./onlyhotel/handleOnlyHotelClick";
import {handlePackageClick} from "./package/handlePackageClick";
import {DOM_SELECTORS, HTML_ATTRIBUTES} from "./constants";

/**
 * Конфигурация тестовой кнопки
 */
interface TestButtonConfig {
    text: string;
    destination: string;
    filter?: string;
    className?: string;
    type?: "onlyhotel" | "package";
}

/**
 * Создает HTML строку для контейнера тестовых кнопок
 */
function createTestButtonsHTML(buttons: TestButtonConfig[]): string {
    const buttonsHTML = buttons
        .map(
            (button) => `
        <a href="#"
           class="test-btn ${button.className || ""}"
           ${HTML_ATTRIBUTES.DESTINATION}="${button.destination}"
           ${button.filter ? `${HTML_ATTRIBUTES.FILTER}="${button.filter}"` : ""}
           ${button.type ? `data-type="${button.type}"` : ""}
           >
           ${button.text}
        </a>`,
        )
        .join("");

    return `
    <div class="${DOM_SELECTORS.TEST_BUTTONS_CONTAINER.slice(1)}" style="display: flex; gap: 10px; margin: 10px; padding: 10px; background-color: #f8f9fa; border-radius: 4px;">
        ${buttonsHTML}
    </div>`;
}

/**
 * Инициализирует тестовые кнопки и обработчики событий
 */
async function initializeOnlyHotelApp(): Promise<void> {
    try {
        // Ждем готовности React приложения
        await hostReactAppReady();

        // Конфигурация тестовых кнопок
        const testButtons: TestButtonConfig[] = [
            {
                text: "5★ Отели",
                destination: "SUUM BODRUM HOTEL & BEACH, PRIVE BODRUM HOTEL",
                type: "onlyhotel"
            },
            {
                text: "Пакетный тур в Турцию",
                destination: "Турция",
                type: "package",
            },
        ];

        // Вставляем тестовые кнопки в header
        const headerElement = document.querySelector(DOM_SELECTORS.HEADER_CONTAINER);
        if (headerElement) {
            headerElement.insertAdjacentHTML("afterbegin", createTestButtonsHTML(testButtons));
        }

        // Добавляем обработчики событий к тестовым кнопкам
        const testButtonElements = document.querySelectorAll(DOM_SELECTORS.TEST_BUTTON);
        testButtonElements.forEach((button) => {
            button.addEventListener("click", handleButtonClick);
        });
    } catch (error) {
        // Тихо обрабатываем ошибку инициализации
    }
}

/**
 * Обрабатывает события клика по тестовым кнопкам
 */
function handleButtonClick(event: Event): void {
    event.preventDefault();

    const target = event.currentTarget;
    if (!(target instanceof HTMLAnchorElement)) {
        return;
    }

    const type = target.getAttribute("data-type");

    if (type === "package") {
        handlePackageClick(target);
    } else {
        handleOnlyHotelClick(target);
    }
}

// Инициализируем приложение
initializeOnlyHotelApp();
