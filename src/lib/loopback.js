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
    if (!!action) {
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
    return url;
  }
  /**
  * query  api by axios.
  * @param  {object} options  option param for query api ,method ,url ,data
  * @return {Promise}  promise
  */
  _query = async(options = {
    method: "get",
    url: "",
    data: {},
  //  headers: { Authorization: `Bearer NNCu93eK5idj5fITV0zEb8zujYSXK0UeAG037aJSHwcNvPRHgekpnWwkgd9qygD8` },
  }) => {
    let res = null;
    let errorMsg = null
    let returnData = {};
    try {
      res = await axios(options)
    } catch (error) {
      errorMsg = error;
    }
    if (errorMsg == null) {
      returnData = {
        status: res.status,
        data: res.data
      }
    } else {
      returnData = {
        error: errorMsg
      }
    }
    return returnData;
  }
  find(query) {
    return this._query({
      method: 'get',
      url: this._buildUrl(query),
    });
  }
  findOne = async(query) => {
    return this._query({
      method: 'get',
      url: this._buildUrl(query, `/findone`),
    });
  }
  findById = async(id, query) => {
    return this._query({
      method: 'get',
      url: this._buildUrl(query, `/${id}`),
    });
  }
   
  create = (data) => {
    return  this._query({
      method: 'post' ,
      url:this._buildUrl(),
      data : data
    })
  }

  update = (data) => {
    return  this._query({
      method: 'patch' ,
      url:this._buildUrl(),
      data : data
    })
  }
}
// export default new Loopback();
