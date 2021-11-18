import axios from 'axios';

export default class Api {
  constructor() {
    this.API_KEY = '0abc367bfbac562ef195';
    this.API_SOURCE = 'https://free.currconv.com/api/v7/';
    this.CURRENCIES = 'currencies';
    this.CONVERT = 'convert';
  }
  async getCurrencies() {
    const response = await axios.get(`${this.API_SOURCE}${this.CURRENCIES}?apiKey=${this.API_KEY}`);
    return response.data.results;
  }
  async getRate(action, currentCurrency) {
    const response = await axios.get(
      `${this.API_SOURCE}${this.CONVERT}?q=${action === 'sell' ? currentCurrency : 'BYN'}_${
        action === 'buy' ? currentCurrency : 'BYN'
      }&compact=ultra&apiKey=${this.API_KEY}`
    );
    return response.data;
  }
}
