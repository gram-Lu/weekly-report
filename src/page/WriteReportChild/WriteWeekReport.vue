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
      @cell-dblclick="cellDBLClickEvent" >
      <vxe-table-column type="seq"></vxe-table-column>
      <vxe-table-column field="date" title="Date"></vxe-table-column>
      <vxe-table-column field="week" title="星期" :formatter="formatterWeek"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="englishName" title="EnglishName"></vxe-table-column>
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
        <vxe-form-item title="Date" field="date" span="12" :item-render="{name: '$input', props: {type: 'date', placeholder: '请选择日期'}}"></vxe-form-item>
        <vxe-form-item title="Name" field="name" span="12" :item-render="{name: '$input', props: {placeholder: '请输入名称'}}"></vxe-form-item>
        <vxe-form-item title="Englishname" field="englishName" span="12" :item-render="{name: '$input', props: {placeholder: '请输入英文名'}}"></vxe-form-item>
        <vxe-form-item title="GroupId" field="groupId" span="12" :item-render="{name: '$select', options: groupIdList}"></vxe-form-item>
        <vxe-form-item title="进度" field="rateOfProgress" span="12" :item-render="{name: '$select', options: rateOfProgressList}"></vxe-form-item>
<!--        <vxe-form-item title="Role" field="role" span="12" :item-render="{name: '$input', props: {placeholder: '请输入角色'}}"></vxe-form-item>-->
<!--        <vxe-form-item title="是否单身" field="flag1" span="12" :item-render="{name: '$radio', options: [{label: '是', value: 'Y'}, {label: '否', value: 'N'}]}"></vxe-form-item>-->
<!--        <vxe-form-item title="可选信息" field="checkedList" span="24" :visible-method="visibleMethod" :item-render="{name: '$checkbox', options: [{label: '运动、跑步', value: '1'}, {label: '听音乐', value: '2'}, {label: '泡妞', value: '3'}, {label: '吃美食', value: '4'}]}"></vxe-form-item>-->
        <vxe-form-item title="Other information" span="24" title-align="left" title-width="200px" :title-prefix="{message: '请填写必填项', icon: 'fa fa-info-circle'}"></vxe-form-item>
<!--        <vxe-form-item title="Number" field="num" span="12" :item-render="{name: '$input', props: {type: 'number', placeholder: '请输入数值'}}"></vxe-form-item>-->
        <vxe-form-item title="WorkContent" field="workContent" span="24" :title-suffix="{message: '工作内容！！！', icon: 'report-circle-down'}" :item-render="{name: 'textarea', attrs: {placeholder: '请输入工作内容'}}"></vxe-form-item>
        <vxe-form-item title="ProblemsAndSolution" field="problemsAndSolution" span="24" :title-suffix="{message: '遇到的问题及解方案！！！', icon: 'fa fa-question-circle'}" :item-render="{name: 'textarea', attrs: {placeholder: '请输入遇到的问题'}}"></vxe-form-item>
        <vxe-form-item title="下周计划" field="nextWeekPlan" span="24" :title-suffix="{message: '下周计划！！！', icon: 'fa fa-question-circle'}" :item-render="{name: 'textarea', attrs: {placeholder: '请输入下周计划'}}"></vxe-form-item>
        <vxe-form-item title="本周总结" field="weekConclusion" span="24" :title-suffix="{message: '本周总结！！！', icon: 'fa fa-question-circle'}" :item-render="{name: 'textarea', attrs: {placeholder: '请输入本周总结'}}"></vxe-form-item>
        <vxe-form-item align="center" span="24" :item-render="{ name: '$buttons', children: [{ props: { type: 'submit', content: '提交', status: 'primary' } }, { props: { type: 'reset', content: '重置' } }] }"></vxe-form-item>
      </vxe-form>
    </vxe-modal>

    <div>{{tableData}}</div>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
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
            getMethodsType: '',
            groupIdList: [
              { label: '淘宝', value: '淘宝' },
              { label: '京东', value: '京东' },
              { label: '咸鱼', value: '咸鱼' },
              { label: '拼多多', value: '拼多多' },
            ],
            weekList: [
              { label: '星期日', value: '星期日' },
              { label: '星期一', value: '星期一' },
              { label: '星期二', value: '星期二' },
              { label: '星期三', value: '星期三' },
              { label: '星期四', value: '星期四' },
              { label: '星期五', value: '星期五' },
              { label: '星期六', value: '星期六' }
            ],
            rateOfProgressList: [
              { label: '10%', value: '10%' },
              { label: '20%', value: '20%' },
              { label: '30%', value: '30%' },
              { label: '40%', value: '40%' },
              { label: '50%', value: '50%' },
              { label: '60%', value: '60%' },
              { label: '70%', value: '70%' },
              { label: '80%', value: '80' },
              { label: '90%', value: '90%' },
              { label: '100%', value: '100%' },
            ],
            formData: {
              Id:'',
              name: null,
              englishName: null,
              // role: null,
              groupId: null,
              week:null,
              // num: null,
              // checkedList: [],
              flag1: null,
              date: null,
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
              englishName: [
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
        }, 100)
        this.$store.dispatch('getReport',()=>{
          this.getData()
        })
      },
      computed: {
        // ...mapState(['tableData1']),
        myData:{
          get:function () {

          },
          set:function (val) {
          }
        }
      },
      methods: {
        getData(){
          console.log('进入到getData')
          console.log(this.$store.state.tableData1.formData);
          this.tableData = this.$store.state.tableData1.formData
        },
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
          this.getMethodsType = 'insertEvent',
          console.log(this.getMethodsType)
          this.formData = {
            Id: '',
            name: '',
            englishName: '',
            groupId: '',
            week:'',
            date: '',
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
          console.log('看看row是什么'+row.Id);
          this.getMethodsType = 'editEvent',
          console.log(this.getMethodsType)
          this.formData = {
            Id: row.Id,
            name: row.name,
            englishName: row.englishName,
            groupId: row.groupId,
            week: row.week,
            date: row.date,
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
          this.getMethodsType = 'removeEvent',
          console.log(this.getMethodsType)
          this.$XModal.confirm('您确定要删除该数据?').then(type => {
            if (type === 'confirm') {
              this.$store.dispatch('removeReport',{Id:row.Id}).then(()=>{
                this.tableData = this.$store.state.tableData1
              })
            }
          })
        },
        submitEvent () {
          if(this.getMethodsType === 'insertEvent'){
            console.log(this.formData.date)
            console.log('打印Id'+this.formData.Id)
            this.$store.dispatch('addReport',{formDatas:this.formData}).then(()=>{
              // this.tableData = this.$store.state.tableData1
            })
          }else if(this.getMethodsType === 'editEvent') {
            this.$store.dispatch('editReport',{formDatas:this.formData},()=>{
              this.getData()
            })
          }
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
.vxe-table .row--new{
  display:none;
}
</style>
