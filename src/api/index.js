import ajax from './ajax'
const BASE_URL = 'http://127.0.0.1:3000'
export const getTest = () =>  ajax(BASE_URL + '/mysql')
export const getDataOfReport = () =>  ajax(BASE_URL + '/writeReport')
