var Promise = require('promise')
const axios = require('axios')
export default function ajax (url = '', param = {}, type = 'GET') {
  let promise;
  return new Promise((resolve, reject) => {
    if (type === 'GET') {
      let paramStr = ''
      Object.keys(param).forEach(key => {
        paramStr = paramStr + key + '=' + anObj[key] + '&'
      })
      if (paramStr !== '') {
        paramStr = paramStr.substr(0, paramStr.lastIndexOf('&'))
      }
      url += '?' + paramStr
      promise = axios.get(url)
    } else if (type === 'POST') {
      promise = axios.post(url, anObj)
    }
    promise.then(resonse => {
      resolve(resonse.data)
    }).catch(error => {
      reject(error)
    })
  }
  )
}
