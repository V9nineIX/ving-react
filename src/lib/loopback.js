import axios from 'axios'
import config from './config';



export class Loopback {

  constructor(name) {
    console.log('Loopback constructor',name);
    this.name = name;
  }

  _getBaseUrl() {
        let baseUrl = config.get('baseUrl') || '';
        if (baseUrl.slice(-1) !== '/') {
          baseUrl += '/';
        }
        return baseUrl;
      }

  getModel(){
    return this.name
  }

}
// export default new Loopback();
