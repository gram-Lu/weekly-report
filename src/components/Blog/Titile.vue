<template>
  <div>
    <h3>标题</h3>
    <input type="text" v-model="title">
  </div>
</template>

<script>
    import bus from "../../EventBus/eventBus";
    export default {
        name: "Titile",
      data(){
          return{
          }
      },
      computed:{
          title:{
            get(){
              if(this.$route.query.status){
                return this.$route.query.param.title
              }
            },
            set(val){
              console.log('set(val)'+val)
                bus.$emit('CasualTitle',val)
            }
          }
      },
      created() {
          console.log(this.$route.query)
        let param= this.$route.query.param
        console.log(this.$route.query.param.title)
        // console.log(param)
        console.log('路由'+param)
        // console.log(this.get(param))
      }
    }
</script>

<style scoped>
input{
  width: 100%;
}
</style>
