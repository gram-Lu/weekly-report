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
  </div>
</template>

<script>
    export default {
        name: "WriteWeekReport",
      data(){
          return{
            nowWeek: '',
            time: (new Date()).getTime() - 86400 * 3 * 1000
          }
      },
      mounted() {
        this.timer = setInterval(() => {
          this.setNowWeek()
        }, 1000)
      },
      methods: {
        setNowWeek(){
          // console.log(new Date())获取日期
          // console.log(new Date().getDay());获取是第几天
          this.nowWeek = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][new Date().getDay()]
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
</style>
