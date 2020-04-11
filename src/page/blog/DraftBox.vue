<template>
  <div>
    <Table border :columns="columns1" :data="myObj" class="draft-table"></Table>
  </div>
</template>

<script>
  import bus from "../../EventBus/eventBus";
  import {mapState} from 'vuex'
    export default {
        name: "DraftBox",
      /*第一：语法是：render: (h, params) => {
      此时它所代表得含义是：render:(h,params) => {
      return h(" 定义的元素 “，{ 元素的性质 }，” 元素的内容"/[元素的内容])*/
      data(){
          return{
            data1:[
              {title:'789456'},
              {title:'dfcerfve'}
            ],
            deleteData:{
              id:'',
              index:''
            },
            columns1:[
              {
                title:'标题',
                key:'title',
                width:'800px',
                render:(h,param)=>{
                  // console.log(param.row.title)
                  return h(
                    'div',param.row.title)
                },
              },
              {
                title: '操作',
                key:'oper1',
                width:'200px',
                render:(h,param)=>{
                 return h('div',[
                   h('Button',{
                     props:{
                       type:'primary',
                       size:'large',
                     },
                     style:{
                       marginLeft:'5px'
                     },
                     on:{
                       click:()=>{
                         console.log(param.row.Id)
                         this.$store.dispatch('deleteCasualNoteDraft', {Id:param.row.Id,Index:param.index})
                       }
                     }
                   },'Delete')
                 ])
                }
              },
              {
                title: '操作',
                key: 'oper2',
                width:'200px',
                render:(h,param)=>{
                  return h('div',[
                    h('Button',{
                      props:{
                        type:'primary',
                        size:'large',
                      },
                      style:{
                        marginLeft:'5px'
                      },
                      on:{
                        click:()=>{
                          this.$router.push({path:'/BlogIndex/CasualNote',query:{param:param.row,Index:param.index,status:true}})
                        }
                      }
                    },'编辑')
                  ])
                }
              }
            ],
          }
      },
      methods:{
        remove(){
          console.log(this.queryDraftBoxCasualResData.data)
        },
        edit(){
          console.log('编辑')
        }
      },
      mounted() {
        // this.$nextTick(()=>{
          this.data1 = this.queryDraftBoxCasualResData.data
        //   this.$forceUpdate();
        //   })
        // console.log('this.queryDraftBoxCasualResData.title'+this.queryDraftBoxCasualResData.data)
        // console.log('this.data1.title'+this.title)
      },
      computed:{
        ...mapState(['queryDraftBoxCasualResData']),
        myObj: {
          get: function(){
            return this.data1;
          }
        },
      },
    }
</script>

<style scoped>
  .draft-table{
    width: 1205px;
    margin: 10px 10px;
    overflow:scroll;
  }
</style>
