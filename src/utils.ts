export async function hostReactAppReady(
    selector: string = '#__next > div',
    timeout: number = 200
): Promise<void> {
    return new Promise(resolve => {
        const checkReady = () => {
            const el = document.querySelector(selector);
            if (el instanceof HTMLElement && el.getBoundingClientRect().height > 0) {
                resolve();
            } else {
                setTimeout(checkReady, timeout);
            }
        };
        checkReady();
    });
}


export function formatDate(date: Date): string {
    return date.toISOString().split('T')[0]; // вернёт YYYY-MM-DD
}
