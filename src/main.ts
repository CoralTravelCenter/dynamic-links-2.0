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
           data-onlyhotel-lookup-destination='XANADU MAKADI BAY, XANADU RESORT, XANADU ISLAND HOTEL'
           >
           5★ Отели
        </a>
    </div>
`,
    );

    document
        .querySelectorAll(".test-btn, .test-btn-4stars, .test-btn-3stars, .test-btn-mixed")
        .forEach((btn) => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                const target: HTMLElement = e.target as HTMLElement;
                handleOnlyHotelClick(target);
            });
        });
})();
