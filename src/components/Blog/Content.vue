<template>
  <div>
  <h3>内容</h3>
  <Input  type="textarea" :autosize="{minRows: 18,maxRows: 18}" placeholder="Enter something..." v-model="passValue" class="inputStyle"/>
  </div>
</template>

<script>
  import bus from './../../EventBus/eventBus'
    export default {
      name: "Content",
      data(){
        return{
          content:'',
        }
      },
      methods:{
      },
      computed:{
        passValue:{
          get(){
            if(this.$route.query.status){
              return this.$route.query.param.content
            }
          },
          set(val){
            // console.log(val)
            bus.$emit('CasualContent',val)
          }
        }
      }
      // mounted() {
      //   bus.$emit('CasualContent','传值成功')
      // }
    }
</script>

<style scoped>
.inputStyle{
  /*overflow-y:auto;*/
}
</style>
