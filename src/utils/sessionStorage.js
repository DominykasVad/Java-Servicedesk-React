export const saveToStorage = (key, value) => {
    try {
        const serializedValue = JSON.stringify(value);
        sessionStorage.setItem(key, serializedValue);
    } catch {
        console.log('Serssion storage error');
    }
};

export const loadFromStorage = (key) => {
    try {
        const value = sessionStorage.getItem(key);

        if (value === null) {
            return undefined;
        }

        return JSON.parse(value);
    } catch {
        return undefined;
    }
};