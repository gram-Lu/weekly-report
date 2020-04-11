import {
  getTest,
  getDataOfReport,
  addWriteReport,
  editWriteReport,
  removeWriteReport,
  githubLogin,
  publishCasual,
  saveDraftCasual,
  queryDraftCasual,
  deleteDraftCasual,
  updateDraftCasual,
  login
} from './../api/index'
import {Test_1,dataOfReport,addDataOfReport,deleteDataOfRepor,modelContent,loginData,publicCasualData,draftBoxCasualData,queryDraftBoxCasualData,deleteDraftBoxCasualData,updateDraftBoxCasualData} from './mutation_type'
export default {
  async reaGetTest({commit}) {
    console.log('来到Action')
    const result = await getTest()
    console.log(result)
    commit(Test_1, {Test: result, message: 200})
  },
  async getReport({commit}, collback) {
    //从数据库中读取周报数据
    let ReportResult = await getDataOfReport()
    console.log('action' + ReportResult)
    commit(dataOfReport, {ReportResult})
    collback && collback();
  },
  //添加周报的操作
  async addReport({commit}, formData) {
    console.log('add' + formData)
    let result = await addWriteReport(formData)
    console.log('添加周报的操作'+result)
    commit(addDataOfReport, {result})
  },
  //修改周报的操作
  async editReport({commit}, formData) {
    console.log("edit" + formData)
    let message = await editWriteReport(formData)
  },
  //删除周报的操作
  async removeReport({commit}, Id) {
    console.log("remove" + Id)
    let result = await removeWriteReport(Id)
    console.log("回到state" + result)
    commit(deleteDataOfReport, {result})
  },
  //OAuth2.0认证
  // async login({commit}) {
  //   let result = await githubLogin();
  //   console.log(result)
  // },

  //博客
  //1.随笔
  //发布
  async publishCasualNode({commit},param) {
    console.log(param)
    let result = await publishCasual(param)
    console.log(result)
    commit(publicCasualData,{result})
},

  //存为草稿箱
  async saveCasualNoteDraft({commit},param) {
    console.log(param)
    let result = await saveDraftCasual(param)
    console.log(result)
    commit(draftBoxCasualData,{result})
  },
  //查看草稿箱
  async queryCasualNoteDraft({commit}){
    let result = await queryDraftCasual()
    console.log(result)
    commit(queryDraftBoxCasualData,{result})
  },
  //删除草稿箱
  async deleteCasualNoteDraft({commit},param){
    let result = await deleteDraftCasual(param)
    console.log('删除之后'+result.status)
    console.log(param)
    commit(deleteDraftBoxCasualData,{result})
  },
  //更新草稿箱
  async updateCasualNoteDraft({commit},param){
    console.log('update'+param)
    let result = await updateDraftCasual(param)
    console.log('更改之后'+result.title)
    commit(updateDraftBoxCasualData,{result})
  },
//登录
  async login({commit},param){
    console.log("action"+param.name)
    console.log(param.password)
    let result = await login(param)
    console.log(result)
    commit(loginData,{result})
  }
}

