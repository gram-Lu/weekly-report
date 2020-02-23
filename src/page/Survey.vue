<template>
  <div class="main">
    <div class="Survey-1">
      <div>
        <a><i class="report-list2"></i></a>
      </div>
      <div class="Survey-1-2">
        <h3>部门人数</h3>
        <h3>12</h3>
      </div>
    </div>
    <div class="Survey-1">
      <div>
        <a><i class="report-list2"></i></a>
      </div>
      <div class="Survey-1-2">
        <h3>已写周报</h3>
        <h3>12</h3>
      </div>
    </div>
    <div class="Survey-1">
      <div>
        <a><i class="report-list2"></i></a>
      </div>
      <div class="Survey-1-2">
        <h3>未写周报</h3>
        <h3>12</h3>
      </div>
    </div>
    <div class="Survey-1">
      <div>
        <a><i class="report-list2"></i></a>
      </div>
      <div class="Survey-1-2">
        <h3>历史周报</h3>
        <h3>12</h3>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'survey'
}
</script>

<style scoped>
.main{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}
.main div{
  width:23%;
  height:110px;
  display: flex;
  justify-content: space-around;
  margin:10px ;
  border-radius:10px;
  background:#d7dde4;
  /*box-shadow: inset 0 0 6px rgb(238, 238, 238);*/
  /*box-shadow: 10px 10px 5px #888888;*/
  box-shadow:1px 2px 15px 2px #d7dde4 inset;
  }
 .Survey-1 div{
   width: 40%;
   height: 70%;
   padding-top: 20px;
   display: flex;
   flex-wrap: wrap;
   overflow: hidden;
   white-space:nowrap;
   text-overflow: ellipsis;
 }
.Survey-1-2{
  display: flex;
  flex-direction: column;
}
a:hover{background-color:red}
</style>
