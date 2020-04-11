var Promise = require('promise')
const axios = require('axios')
export default function ajax (url = '', param = {}, type = 'GET') {
  console.log('打印type'+type);
  let promise;
  return new Promise((resolve, reject) => {
    if (type === 'GET') {
      console.log("判断是Get")
      console.log(param)
      let paramStr = ''
      Object.keys(param).forEach(key => {
        paramStr = paramStr + key + '=' + param[key] + '&'
      })
      if (paramStr !== '') {
        paramStr = paramStr.substr(0, paramStr.lastIndexOf('&'))
      }
      url += '?' + paramStr
      promise = axios.get(url)
    } else if (type === 'POST') {
      console.log("判断是Post")
      console.log(param)
      promise = axios.post(url, param)
    }
    promise.then(resonse => {
      resolve(resonse.data)
    }).catch(error => {
      reject(error)
    })
  }
  )
}
