import axios from 'axios'

export default class DataService {

  constructor() {
    this.client = axios.create({
      baseURL: 'http://healthhackaus.herokuapp.com/api/healthhack'
    })
  }
  
  async request(url) {
    return (await this.client.get(url)).data;
  }

  // these are single data-point per building/service
  // multiple services can be present in a single LGA

  async getHospitals() {
    return this.request('/hospitals')
  }

  async getChildcare() {
    return this.request('/childcare')
  }

  async getSchools() {
    return this.request('/publicSchools')
  }

  // these are per-LGA
  
  async getCrime() {
    return this.request('/crime')
  }

  async getContactDetails() {
    return this.request('/contactDetails')
  }

  // util

  async loadMappableData() {
    return Promise.all([
      this.getHospitals(),
      this.getChildcare(),
      this.getSchools(),
      this.getCrime(),
      this.getContactDetails()
    ])
  }

  // FIXME: currently pre-loading in bundle because laziness
  // async getLgaRegions() {
  //   return this.client.get('/simpleLgaRegions')
  // }

}