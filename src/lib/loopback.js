import axios from 'axios'
import config from './config';
import _ from 'lodash';
export class Loopback {
  constructor(name) {
    console.log('Loopback constructor', name);
    this.name = name;
  }
  getModel() {
    return this.name
  }
  /**
 * Get baseUrl from config and make sure there is a slash at the end.
 * @return {string} The API base URL
 */
  _getBaseUrl() {
    let baseUrl = config.get('baseUrl') || '';
    if (baseUrl.slice(-1) !== '/') {
      baseUrl += '/';
    }
    return baseUrl;
  }
  /**
 * Given the endpoint and its filter, this will build the full
 * URL to query Loopback
 * @param  {object} filter   Filter object
 * @return {string}          Loopback URL
 */
  _buildUrl(filter, action) {
    const baseUrl = this._getBaseUrl();
    let load = '';
    if(!!action){
      load = action
    }
    let url = baseUrl + this.name + load

    if (filter) {
      url += '?filter=' + encodeURIComponent(JSON.stringify(filter));
    }
    const token = config.get('access_token') || '';
    if (token) {
      url += filter
        ? '&'
        : '?';
      url += 'access_token=' + token;
    }
    console.log(action,load);
    console.log(url);
    return url;
  }

  _query = async ()  =>{
     let url = this._getBaseUrl()+this.getModel();
     const res = await axios.get(url ,{
        headers: { Authorization: `Bearer ${config.get("token")}` },
      })
      return{
         status :res.status,
         data : res.data
      }
    }


find = async (query)=>{
    const res = await axios.get(this._buildUrl(query) ,{
       headers: {},
     })
     return{
        status :res.status,
        data : res.data
     }
  }

  findOne = async (query)=>{
    const res = await axios.get(this._buildUrl(query,"/findone") ,{
       headers: {},
     })
     return{
        status :res.status,
        data : res.data
     }
  }
  findById = async (id,query)=>{
    const res = await axios.get(this._buildUrl(query,`/${id}`) ,{
       headers: {},
     })
     return{
        status :res.status,
        data : res.data
     }
  }
}
// export default new Loopback();
