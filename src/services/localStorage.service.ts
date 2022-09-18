import KeyValuePairList from "../models/key-value-pairs.interface";

export default class localStorageService{
  constructor() {
  }

  getData(): Record<string, any>[] {
    const localData = localStorage.userData;
    return localData ? JSON.parse(localData) : [];
  }

  saveData(userData: KeyValuePairList): void {
    localStorage.userData = JSON.stringify(userData);
  }

  clearData(): void {
    localStorage.removeItem('userData');
  }
};