<template>
  <!--<Home/>-->
  <div>
<!--    <tab v-if="this.$local.get('user')"/>-->
    <router-view></router-view>
<!--    <login/>-->
<!--    <index/>-->
<!--    <login v-if="!this.$local.get('user')"/>-->
  </div>
</template>
<script>
// import Home from './page/Home'
import Tab from './page/tab'
import login from './page/login'
// import login from './page/NoUse/login'
// import index from './page/index'
export default {
  name: 'App',
  created () {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store") ) {
      this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
    }

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload",()=>{
      sessionStorage.setItem("store",JSON.stringify(this.$store.state))
    })
  },
  components: {Tab,login},
  data () {
    return {
      menuKey:this.$local.get('user')
    }
  },
  mounted() {
    // const url ='/api/captcha'
    // fetch(url).then(res=>{
    //   console.log(res)
    // })
    // this.testget();
  },
    watch:{
      menuTree(){
        this.menuKey
      },
    }
  // methods:{
  //   testget(){
  //     this.$ajax({
  //       method: 'get',
  //       url: '/api/captcha',
  //     }).then(function (res) {
  //       let data = res.data;
  //       alert(data);
  //       console.error(data);
  //       this.conflag = data.flag;
  //     }.bind(this));
  //   }
  // }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .first
    background-color red
    font-family "Arial Narrow"
  .container{
    height 100%
  }
</style>
