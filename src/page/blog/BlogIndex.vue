<template>
  <div class="container">
    <div class="slider">
      <div class="slider1">
      <h3 class="sliderH3">操作</h3>
      <ul v-if="this.shiftkey=='casualNote1'">
        <li v-for="(casualNote,index) in casualNotes"  v-on:click="operation(index)"><a>{{casualNote}}</a></li>
      </ul>
      <ul v-if="this.shiftkey=='essay1'">
        <li v-for="essay in essays"><a>{{essay}}</a></li>
      </ul>
      <ul v-if="this.shiftkey=='diary1'">
        <li v-for="diary in diary"><a>{{diary}}</a></li>
      </ul>
    </div>
      <div>
      <h3 class="sliderCategory">分类</h3>
      <ul>
        <li><a>编辑分类</a></li>
        <li><a>未分类</a></li>
      </ul>
    </div>
    </div>
    <div class="content">
      <ul class="contentIndex">
        <li v-on:click="shift('casualNote1')"><a>随笔</a></li>
        <li v-on:click="shift('essay1')"><a>文章</a></li>
        <li v-on:click="shift('diary1')"><a>日记</a></li>
      </ul>
      <router-view  v-if="isRouterAlive"></router-view>
<!--      <table>-->
<!--        <tr>-->
<!--          <td class="contentIndexTitle">标题</td>-->
<!--          <td>发布状态</td>-->
<!--          <td>评论数</td>-->
<!--          <td>阅读数</td>-->
<!--          <td>操作</td>-->
<!--          <td>操作</td>-->
<!--        </tr>-->
<!--      </table>-->
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import bus from "../../EventBus/eventBus";
  export default {
    data(){
      return{
        shiftkey:'',
        isRouterAlive:true
      }
    },
    computed:{
      ...mapState(['casualNotes','essays','diary','queryDraftBoxCasualResData']),
    },
    methods:{
      shift(shiftIndex){
        console.log(shiftIndex);
        this.shiftkey = shiftIndex
      },
      operation(index){
        if(index===0){
          this.$router.push('/BlogIndex/CasualNote')
        }else{
          this.$router.push('/BlogIndex/DraftBox'),
            this.$store.dispatch('queryCasualNoteDraft').then(()=>{
              if(this.queryDraftBoxCasualResData.status===200){
                this.$Message.info('查询成功')
              }else{
              this.$Message.error('服务器错误')
              }
            })
        }
      },
      reload (){
        this.isRouterAlive = false
        this.$nextTick(function(){
          this.isRouterAlive = true
        })
      }
    },
    provide(){
      return{
        reload:this.reload
      }
    },
  }
</script>
<style scoped>
.container{
  background: #FFFFFF;
  display: flex;
  flex-wrap: nowrap;
}
  .slider{
    background: #f5f7f9;
    width: 10%;
    height: 700px;
    margin-top: 15px;
  }
  .content{
    background: whitesmoke;
    width: 84%;
  }
  .contentIndex{
    display: flex;
    flex-wrap: nowrap;
    background: #b6c9e7;
    color: #008dd7;
  }
  .contentIndex li{
    width: 5%;
    background: #cfe0f8;
    list-style: none;
    margin-left: 5px;
    text-align: center;
  }
td{
  padding-left: 30px;
  background: #f5f7f9;
}
.sliderH3{
  text-align: center;
  background: #6b86b3;
}
  .sliderCategory{
    text-align: center;
    background: #b6c9e7;
  }
</style>

