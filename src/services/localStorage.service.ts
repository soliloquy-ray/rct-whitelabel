import KeyValuePairList from "../models/key-value-pairs.interface";

export default class localStorageService{
  constructor() {
  }

  getData(key: string = 'userData'): Record<string, any>[] {
    const localData = localStorage.getItem(key);
    const retVal = localData ? JSON.parse(localData) : [];
    return retVal;
  }

  saveData(key: string = 'userData', data: KeyValuePairList): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  clearData(): void {
    localStorage.clear();
  }
};