import axios from 'axios'
import config from './config';



export class Loopback {

  constructor(model) {
   // console.log('Loopback constructor',name);
    this.model = model;
  }

  _getBaseUrl() {
        let baseUrl = config.get('baseUrl') || '';
        if (baseUrl.slice(-1) !== '/') {
          baseUrl += '/';
        }
        return baseUrl;
      }

  getModel(){
    return this.model
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

}
// export default new Loopback();
