<template>
  <!--<Home/>-->
  <div>
    <tab/>
    <!--<router-view></router-view>-->
  </div>
</template>
<script>
// import Home from './page/Home'
import Tab from './components/Tab'
export default {
  name: 'App',
  components: {Tab},
  data () {
    return {
      // component: Home
    }
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .first
    background-color red
    font-family "Arial Narrow"
</style>
