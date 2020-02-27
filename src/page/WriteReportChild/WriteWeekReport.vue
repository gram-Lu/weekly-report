<template>
  <div>
    <div class="main-div">
      <div style="{color: #FFFFFF;font-size: 30px}" class="main-div-div1">
        <span><h4>姓名：Meto</h4></span>
      <span>组别：IT</span>
      </div>
      <div class="main-div-div2">
        <span>{{nowWeek}}</span>
        <Time :time="time" type="date" />
      </div>
    </div>
    <ButtonGroup style="margin-left: 80%;">
      <Button type="primary">
        <Icon type="ios-arrow-back"></Icon>
        上一周
      </Button>
      <Button type="primary">
        下一周
        <Icon type="ios-arrow-forward"></Icon>
      </Button>
    </ButtonGroup>
    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button icon="fa fa-plus" @click="insertEvent()">新增</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      resizable
      row-key
      highlight-hover-row
      ref="xTable"
      height="500"
      :data="tableData"
      @cell-dblclick="cellDBLClickEvent">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="date3" title="Date"></vxe-table-column>
      <vxe-table-column field="week" title="星期" :formatter="formatterWeek"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="englishname" title="EnglishName"></vxe-table-column>
      <vxe-table-column field="groupId" title="GroupId" :formatter="formatterGroupId"></vxe-table-column>
      <vxe-table-column field="workContent" title="WorkContent" show-overflow></vxe-table-column>
      <vxe-table-column field="rateOfProgress" title="进度" :formatter="formatterRateOfProgress"></vxe-table-column>
      <vxe-table-column field="problemsAndSolution" title="ProblemsAndSolution" show-overflow></vxe-table-column>
      <vxe-table-column field="weekConclusion" title="本周总结" show-overflow></vxe-table-column>
      <vxe-table-column field="nextWeekPlan" title="下周计划" show-overflow></vxe-table-column>
      <vxe-table-column title="操作" width="100" show-overflow  >
        <template v-slot="{ row }">
          <vxe-button type="text" icon="report-document-edit" @click="editEvent(row)"></vxe-button>
          <vxe-button type="text" icon="report-trash" @click="removeEvent(row)"></vxe-button>
        </template>
      </vxe-table-column>
    </vxe-table>
    <vxe-modal v-model="showEdit" :title="selectRow ? '编辑&保存' : '新增&保存'" width="800" :loading="submitLoading" resize destroy-on-close>
      <vxe-form :data="formData" :rules="formRules" title-align="right" title-width="100" @submit="submitEvent">
        <vxe-form-item title="Basic information" span="24" title-align="left" title-width="200px" :title-prefix="{icon: 'fa fa-address-card-o'}"></vxe-form-item>
        <vxe-form-item title="Week" field="week" span="12" :item-render="{name: '$select', options: weekList}"></vxe-form-item>
        <vxe-form-item title="Date" field="date3" span="12" :item-render="{name: '$input', props: {type: 'date', placeholder: '请选择日期'}}"></vxe-form-item>
        <vxe-form-item title="Name" field="name" span="12" :item-render="{name: '$input', props: {placeholder: '请输入名称'}}"></vxe-form-item>
        <vxe-form-item title="Englishname" field="englishname" span="12" :item-render="{name: '$input', props: {placeholder: '请输入英文名'}}"></vxe-form-item>
        <vxe-form-item title="GroupId" field="groupId" span="12" :item-render="{name: '$select', options: groupIdList}"></vxe-form-item>
        <vxe-form-item title="进度" field="rateOfProgress" span="12" :item-render="{name: '$select', options: rateOfProgressList}"></vxe-form-item>
<!--        <vxe-form-item title="Role" field="role" span="12" :item-render="{name: '$input', props: {placeholder: '请输入角色'}}"></vxe-form-item>-->
<!--        <vxe-form-item title="是否单身" field="flag1" span="12" :item-render="{name: '$radio', options: [{label: '是', value: 'Y'}, {label: '否', value: 'N'}]}"></vxe-form-item>-->
<!--        <vxe-form-item title="可选信息" field="checkedList" span="24" :visible-method="visibleMethod" :item-render="{name: '$checkbox', options: [{label: '运动、跑步', value: '1'}, {label: '听音乐', value: '2'}, {label: '泡妞', value: '3'}, {label: '吃美食', value: '4'}]}"></vxe-form-item>-->
        <vxe-form-item title="Other information" span="24" title-align="left" title-width="200px" :title-prefix="{message: '请填写必填项', icon: 'fa fa-info-circle'}"></vxe-form-item>
<!--        <vxe-form-item title="Number" field="num" span="12" :item-render="{name: '$input', props: {type: 'number', placeholder: '请输入数值'}}"></vxe-form-item>-->
        <vxe-form-item title="WorkContent" field="workContent" span="24" :title-suffix="{message: '啦啦啦，就是这么强大！！！', icon: 'report-circle-down'}" :item-render="{name: 'textarea', attrs: {placeholder: '请输入工作内容'}}"></vxe-form-item>
        <vxe-form-item title="ProblemsAndSolution" field="problemsAndSolution" span="24" :title-suffix="{message: '啦啦啦，就是这么强大！！！', icon: 'fa fa-question-circle'}" :item-render="{name: 'textarea', attrs: {placeholder: '请输入遇到的问题'}}"></vxe-form-item>
        <vxe-form-item title="下周计划" field="nextWeekPlan" span="24" :title-suffix="{message: '啦啦啦，就是这么强大！！！', icon: 'fa fa-question-circle'}" :item-render="{name: 'textarea', attrs: {placeholder: '请输入下周计划'}}"></vxe-form-item>
        <vxe-form-item title="本周总结" field="weekConclusion" span="24" :title-suffix="{message: '啦啦啦，就是这么强大！！！', icon: 'fa fa-question-circle'}" :item-render="{name: 'textarea', attrs: {placeholder: '请输入本周总结'}}"></vxe-form-item>
        <vxe-form-item align="center" span="24" :item-render="{ name: '$buttons', children: [{ props: { type: 'submit', content: '提交', status: 'primary' } }, { props: { type: 'reset', content: '重置' } }] }"></vxe-form-item>
      </vxe-form>
    </vxe-modal>
    <div>{{$store.state.tableData1}}</div>
  </div>
</template>
<script>
  import 'vxe-table/lib/modal/style/style.css'
    export default {
      name: "WriteWeekReport",
      data(){
          return{
            nowWeek: '',
            time: (new Date()).getTime() - 86400 * 3 * 1000,
            submitLoading: false,
            tableData: [],
            selectRow: null,
            showEdit: false,
            groupIdList: [
              { label: '淘宝', value: '0' },
              { label: '京东', value: '1' },
              { label: '咸鱼', value: '2' },
              { label: '拼多多', value: '3' },
            ],
            weekList: [
              { label: '星期日', value: '0' },
              { label: '星期一', value: '1' },
              { label: '星期二', value: '2' },
              { label: '星期三', value: '3' },
              { label: '星期四', value: '4' },
              { label: '星期五', value: '5' },
              { label: '星期六', value: '6' }
            ],
            rateOfProgressList: [
              { label: '10%', value: '0' },
              { label: '20%', value: '1' },
              { label: '30%', value: '2' },
              { label: '40%', value: '3' },
              { label: '50%', value: '4' },
              { label: '60%', value: '5' },
              { label: '70%', value: '6' },
              { label: '80%', value: '7' },
              { label: '90%', value: '8' },
              { label: '100%', value: '9' },
            ],
            formData: {
              name: null,
              englishname: null,
              // role: null,
              groupId: null,
              week:null,
              // num: null,
              // checkedList: [],
              flag1: null,
              date3: null,
              workContent: null,
              problemsAndSolution: null,
              nextWeekPlan: null,
              weekConclusion: null
            },
            formRules: {
              name: [
                { required: true, message: '请输入名称' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符' }
              ],
              englishname: [
                { required: true, message: '请输入英文名' }
              ],
              groupId: [
                { required: true, message: '请选择部门' }
              ],
              week: [
                { required: true, message: '请选择星期' }
              ],
              rateOfProgress: [
                {required: true,message: '请选择进度'}
              ]
            }
          }
      },
      mounted() {
        this.timer = setInterval(() => {
          this.setNowWeek()
        }, 1000)
        this.$store.dispatch('getReport')
      },
      methods: {
        setNowWeek(){
          // console.log(new Date())获取日期
          // console.log(new Date().getDay());获取是第几天
          this.nowWeek = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][new Date().getDay()]
        },
        formatterGroupId ({ cellValue }) {
          let item = this.groupIdList.find(item => item.value === cellValue)
          return item ? item.label : ''
        },
        formatterWeek ({ cellValue }) {
          let item = this.weekList.find(item => item.value === cellValue)
          return item ? item.label : ''
        },
        formatterRateOfProgress ({ cellValue }) {
          let item = this.rateOfProgressList.find(item => item.value === cellValue)
          return item ? item.label : ''
        },
        visibleMethod ({ data }) {
          return data.flag1 === 'Y'
        },
        cellDBLClickEvent ({ row }) {
          this.editEvent(row)
        },
        insertEvent () {
          this.formData = {
            name: '',
            englishname: '',
            // role: '',
            groupId: '',
            week:'',
            // num: '',
            // checkedList: [],
            flag1: '',
            date3: '',
            workContent: '',
            rateOfProgress: '',
            problemsAndSolution: '',
            nextWeekPlan: '',
            weekConclusion: '',
          }
          this.selectRow = null
          this.showEdit = true
        },
        editEvent (row) {
          this.formData = {
            name: row.name,
            englishname: row.englishname,
            // role: row.role,
            groupId: row.groupId,
            week: row.week,
            // num: row.num,
            // checkedList: row.checkedList,
            // flag1: row.flag1,
            date3: row.date3,
            workContent: row.workContent,
            rateOfProgress: row.rateOfProgress,
            problemsAndSolution: row.problemsAndSolution,
            nextWeekPlan: row.nextWeekPlan,
            weekConclusion: row.weekConclusion
          }
          this.selectRow = row
          this.showEdit = true
        },
        removeEvent (row) {
          this.$XModal.confirm('您确定要删除该数据?').then(type => {
            if (type === 'confirm') {
              this.$refs.xTable.remove(row)
            }
          })
        },
        submitEvent () {
          this.submitLoading = true
          setTimeout(() => {
            this.submitLoading = false
            this.showEdit = false
            if (this.selectRow) {
              this.$XModal.message({ message: '保存成功', status: 'success' })
              Object.assign(this.selectRow, this.formData)
            } else {
              this.$XModal.message({ message: '新增成功', status: 'success' })
              this.$refs.xTable.insert(this.formData)
            }
          }, 500)
        }
      }
    }
</script>
<style scoped>
.main-div{
  height: 40px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin: 10px;
  align-items: center;
  position: relative;
  border:10px;
  background: #001529;
}
  .main-div-div2{
       position: absolute;
       display: flex;
       right: 5%
     }
  .main-div-div1{
  position: absolute;
  display: flex;
  left: 5%
}
.main-div1{
  background: #001529;
  width: 88%;
  border: 2px;
  margin: 12px 0 9% 3%;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  border: 1px;
  border-color: #001529;
}
 .main-div1-div1{
   background: gainsboro;
   width: 100%;
   height: 45px;
 }
  .vxe-form{
    display: flex;
    flex-wrap: wrap;
  }
</style>
