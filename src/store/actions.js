import {getTest} from './../api/index'
import {Test_1} from './mutation_type'
export default {
  async reaGetTest ({commit}) {
    console.log('来到Action')
    const result = await getTest()
    console.log(result)
    commit(Test_1, {Test: result, message: 200})
  }
}
