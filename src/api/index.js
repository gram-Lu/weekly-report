import ajax from './ajax'
import config from "../config/config";
const BASE_URL = 'http://127.0.0.1:3000'
export const getTest = () =>  ajax( + '/api/mysql')
export const getDataOfReport = () =>  ajax(BASE_URL + '/api/writeReport')
//增加周报
export const addWriteReport = (formData) =>  ajax( '/api/addWriteReport',formData,'POST')
//修改周报
export const editWriteReport = (formData) =>  ajax( '/api/editWriteReport',formData,'POST')
//删除周报
export const removeWriteReport = (Id) =>  ajax('/api/removeWriteReport',Id)
//OAuth2.0权限认证
export const githubLogin = ()=>ajax(config.userAuthorizationUri,{clientId:config.clientId,clientSecret:config.clientSecret,scope:config.scope,state:config.state,redirect_uri:config.redirect_uri})
//callback
export const callback=()=>ajax('/api/callback')
//博客
//1.随笔
//发布
export const publishCasual=(param)=>ajax('/api/casualNote',param,'POST')
//存为草稿
export const saveDraftCasual=(param)=>ajax('/api/saveDraftCasual',param,'POST')
//查询草稿
export const queryDraftCasual=(param)=>ajax('/api/queryDraftCasual')

//删除草稿箱
export const deleteDraftCasual=(param)=>ajax('/api/deleteDraftCasual',param,'POST')
//更新草稿箱
export const updateDraftCasual=(param)=>ajax('/api/updateDraftCasual',param,'POST')
//登录
export const login=(param)=>ajax('/api/login',param,'POST')
