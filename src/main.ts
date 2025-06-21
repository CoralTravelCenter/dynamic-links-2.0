import {hostReactAppReady} from "./utils";
import {handleOnlyHotelClick} from "./onlyhotel/handleOnlyHotelClick";

(async () => {
    await hostReactAppReady();

    // @ts-ignore
    document.querySelector(".header-client-side-desktop").insertAdjacentHTML(
        "afterbegin",
        `
    <div class="test-buttons-container" style="display: flex; gap: 10px; margin: 10px;">
        <a href="#"
           class="test-btn"
           data-onlyhotel-lookup-destination-2="Турция"
           >
           5★ Отели
        </a>
    </div>
`,
    );

    document.querySelector(".test-btn")?.addEventListener("click", (e) => {
        e.preventDefault();
        const target: HTMLElement = e.currentTarget as HTMLElement;
        handleOnlyHotelClick(target);
    });
})();
