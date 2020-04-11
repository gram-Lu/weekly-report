<template>
  <div class="content">
    <Button type="info" ghost v-on:click="publishCasualNote">发布</Button>
    <Button type="info" ghost v-on:click="saveCasualNoteDraft" v-if="!this.$route.query.status">存为草稿</Button>
    <Button type="info" ghost v-on:click="update" v-if="this.$route.query.status" >更新</Button>
    <Button type="info" ghost>取消</Button>
  </div>
</template>

<script>
  import bus from './../../EventBus/eventBus'
  import {mapState} from 'vuex'
    export default {
      name: "Button1",
      data(){
        return{
          casualNote:{
            Index:this.$route.query.Index,
            Id:this.$route.query.param.Id,
            username:'',
            content:'',
            title:'',
          },
        }
      },
      methods:{
        update(){
          console.log('更新')
          this.$store.dispatch('updateCasualNoteDraft',this.casualNote).then(()=>{
            if (this.queryDraftBoxCasualResData.status === 200) {
              this.$Message.success(this.queryDraftBoxCasualResData.msg)
            }
          }).catch(error => {
            this.$Message.error("服务器发生错误")
          })
        },
        publishCasualNote(){
          if(this.casualNote.title.length<1){
            this.$Message.warning('标题不能为空')
          }else if(this.casualNote.content.length<1){
            this.$Message.warning('内容不能为空')
          }else{
            this.$store.dispatch("publishCasualNode",this.casualNote).then(()=>{
              if(this.publicCasualResData.status === 200){
                this.$Message.success("发布成功")
              }
            }).catch(error=>{
              this.$Message.error("服务器发生错误")
            })
          }
        },
        saveCasualNoteDraft() {
          if (this.casualNote.title.length < 1) {
            this.$Message.warning('标题不能为空')
          } else if (this.casualNote.content.length < 1) {
            this.$Message.warning('内容不能为空')
          } else {
            this.$store.dispatch("saveCasualNoteDraft", this.casualNote).then(() => {
              console.log('shabi'+this.draftBoxCasualResData.status)
              if (this.draftBoxCasualResData.status === 200) {
                this.$router.push('/BlogIndex/DraftBox')
                this.$Message.success("存入草稿箱成功")
              }
            }).catch(error => {
              this.$Message.error("服务器发生错误")
            })
          }
        }
      },
      computed:{
        ...mapState(['publicCasualResData','draftBoxCasualResData','queryDraftBoxCasualResData'])
      },
      mounted() {
        let self = this;
        self.casualNote.username = localStorage.getItem('user')
        console.log( self.casualNote.username)
        bus.$on('CasualContent',function (content) {
          self.casualNote.content = content;
        });
        bus.$on('CasualTitle',function (title) {
          self.casualNote.title = title;
        });
      }
    }
</script>

<style scoped>
.content {
  margin-top: 20px;
  margin-left: 5px;
}
Button{
  margin-left: 15px;
}

</style>
