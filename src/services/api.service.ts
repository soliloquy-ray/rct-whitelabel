import KeyValuePairList from "../models/key-value-pairs.interface";

export default class ApiService{
  protected apiEndpoint = import.meta.env.VITE_API_ENDPOINT;
  constructor() {
  }

  async get(url: string, params: KeyValuePairList = []): Promise<any[]>{
    const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    const data = (await fetch(`${this.apiEndpoint}/${url}?${queryString}`)).json();
    return data;
  }

};