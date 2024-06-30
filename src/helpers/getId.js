import { nanoid } from "nanoid";

const LOCAL_STORAGE_ID_KEY = "__id__"

export const getId = () => {
    const idFromStorage = localStorage.getItem(LOCAL_STORAGE_ID_KEY);
    if (idFromStorage) return idFromStorage;

    const newId = nanoid()
    localStorage.setItem(LOCAL_STORAGE_ID_KEY, newId);
    return newId;
} 
