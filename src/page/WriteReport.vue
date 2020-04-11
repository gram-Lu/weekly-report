<template>
  <div>
    <Button @click="modal3 = true">No title bar</Button>
    <Button @click="modal4 = true">Internationalization</Button>
    <Button v-on:click="home1('/writeReport/writeWeekReport')">新建周报</Button>
    <router-view></router-view>
  </div>
</template>

<script>
  import WriteWeekReport from './WriteReportChild/WriteWeekReport'
export default {
  name: 'WriteReport',
  components: {WriteWeekReport},
  methods: {
    home1(path){
      // console.log(path)
      this.$router.push(path).catch(()=>{})
    },
  }
}
</script>

<style scoped>
</style>
