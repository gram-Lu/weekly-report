import config from '../config/config'
import axios from 'axios'
export default {
  getTokenFromService(vue, code, callback, error){
    vue.$ajax.post(vue.$config.accessTokenUri,{
      client_id:vue.$config.clientId,
      client_secret:vue.$config.client_secret,
      code:code,
      redirect_uri:vue.$config.redirect_uri,
      grant_type:vue.$config.grant_type
    },{
      headers:{"Accept":"application/json"}
    })
      .then(callback)
      .catch(error);
  }
    // console.log(config.accessTokenUri)
    // axios(config.accessTokenUri,{
    //   method: 'POST',
    //   headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     'Content-Type': 'application/json',
    //   },
    //   withCredentials: true,
    //   credentials: 'same-origin',
    //   client_id:config.clientId,
    //   client_secret:config.client_secret,
    //   code:code,
    //   redirect_uri:config.redirect_uri,
    //   grant_type:config.grant_type,
    //
    // }).then(callback).catch(error)
}
