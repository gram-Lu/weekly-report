import {Test_1,dataOfReport,addDataOfReport,deleteDataOfReport,modelContent,loginData,publicCasualData,draftBoxCasualData,queryDraftBoxCasualData,deleteDraftBoxCasualData,updateDraftBoxCasualData} from './mutation_type'
export default {
  [Test_1] (state, {Test}) {
    state.test = Test
  },
  //查询数据的操作
  [dataOfReport] (state,{ReportResult}){
    console.log('mutations'+ReportResult)
    state.tableData1 = ReportResult
  },
  //添加数据的操作
  [addDataOfReport] (state,{result}){
    console.log(result)
    state.tableData1 = result
  },
  //删除数据的操作
  [deleteDataOfReport] (state,{result}){
    state.tableData1 = result
  },
  //登录之后的信息保存
  [loginData](state,{result}){
    state.loginResData = result
  },
  //发布随笔返回的数据
  [publicCasualData](state,{result}){
    console.log(result)
    state.publicCasualResData = result
  },
  //草稿箱随笔返回的数据draftBoxCasualData
  [draftBoxCasualData](state,{result}){
    console.log(result)
    state.draftBoxCasualResData = result
  },
  //查询草稿箱随笔返回的数据
  [queryDraftBoxCasualData](state,{result}){
    state.queryDraftBoxCasualResData = result
  },
  //删除草稿箱随笔返回的数据
  [deleteDraftBoxCasualData](state,{result}){

    let arr = state.queryDraftBoxCasualResData.data
    arr.splice(result.Index)
    state.queryDraftBoxCasualResData.data = arr
  },
  //修改草稿箱随笔返回的数据
  [updateDraftBoxCasualData](state,{result}){
    console.log('修改草稿箱随笔返回的数据'+result[0])
    let arr = state.queryDraftBoxCasualResData.data
    arr.splice(result.Index,1,{Id:result.Id,username:result.username,title:result.title,content:result.content})
    console.log('修改草稿箱随笔返回的数据'+arr)
    // state.queryDraftBoxCasualResData= arr.slice(result.Index,1,[{title：result.title])
    // var fruits = [{banana:'banana'}, {banana1:'banana1'}, {banana2:'banana2'},{banana3:'banana3'}];
    // fruits.splice(2,1,{fehgfd:'fewlk'});
    // console.log(fruits)
    state.queryDraftBoxCasualResData.status = result.status
    state.queryDraftBoxCasualResData.msg = result.msg
  },
}
