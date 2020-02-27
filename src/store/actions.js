import {getTest,getDataOfReport} from './../api/index'
import {Test_1,dataOfReport} from './mutation_type'
export default {
  async reaGetTest ({commit}) {
    console.log('来到Action')
    const result = await getTest()
    console.log(result)
    commit(Test_1, {Test: result, message: 200})
  },
  async getReport({commit}){
    //从数据库中读取周报数据
    let ReportResult = await getDataOfReport()
    console.log(ReportResult)
    console.log('action'+ReportResult[0].Date);
    commit(dataOfReport,{ReportResult:ReportResult, message:200})
  }
}
