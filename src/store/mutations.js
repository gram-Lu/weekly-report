import {Test_1,dataOfReport} from './mutation_type'
export default {
  [Test_1] (state, {Test}) {
    state.test = Test
  },
  [dataOfReport] (state,{ReportResult}){
    state.tableData1 = ReportResult,
      console.log(ReportResult)
  }
}
