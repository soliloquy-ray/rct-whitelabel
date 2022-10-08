import KeyValuePairList from "../models/key-value-pairs.interface";

export default class LocalStorageService{
  constructor() {
  }

  getData(key: string = 'userData'): any[] {
    const localData = sessionStorage.getItem(key);
    const retVal = localData ? JSON.parse(localData) : [];
    return retVal;
  }

  saveData(key: string = 'userData', data: KeyValuePairList): void {
    sessionStorage.setItem(key, JSON.stringify(data));
  }

  clearData(): void {
    sessionStorage.clear();
  }
};