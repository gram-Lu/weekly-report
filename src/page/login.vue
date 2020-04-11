<template>
  <div class="container">
    <div class="content">
      <div class="title">企业周报系统</div>
<!--      <h2 class="title">企业周报系统</h2>-->
    <Form ref="formInline" :model="formInline" :rules="ruleInline">
      <FormItem prop="user">
        <Input type="text" v-model="formInline.user" placeholder="Username" ref="username" >
      <Icon type="ios-person-outline" slot="prepend"></Icon>
    </Input>
      </FormItem>
      <FormItem prop="password">
        <Input type="password" v-model="formInline.password" placeholder="Password" ref="password">
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary" style="width: 100%" @click="handleSubmit('formInline')">登陆</Button>
      </FormItem>
    </Form>
    </div>
  </div>
</template>
<script>
  import store from "../store";
  import {mapState} from 'vuex'
  import {loginData} from "../store/mutation_type";
  export default {
    data () {
      return {
        formInline: {
          user: '',
          password: ''
        },
        ruleInline: {
          user: [
            { required: true, message: 'Please fill in the user name', trigger: 'blur' }
          ],
          password: [
            { required: true, message: 'Please fill in the password.', trigger: 'blur'  },
            { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      handleSubmit(name) {
          this.$refs[name].validate((valid) => {
            let name = this.$refs.username.value;
            let password = this.$md5(this.$refs.password.value);
          if (valid) {
            this.$store.dispatch('login',{name,password}).then(()=>{
              if(this.loginResData.status == 200){
                // console.log(this.$store.state.loginResData)
                console.log(this.loginResData.status)
                this.send();
              }else {
                this.$Message.error(this.loginResData.msg);
              }
            }).catch(()=>{
              this.$Message.error("服务器错误");
            });
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      send() {
        // 用ref获取dom节点的内容用存储到localstorage，在登录后的页面获取localstorage的用户名
        let name = this.$refs.username.value
        console.log("name")
        this.$Message.success("登录成功");
        localStorage.setItem("user",name);
        localStorage.setItem("Flag", "isLogin");
        localStorage.setItem('token',this.loginResData.token)
        this.$router.replace('/Tab')
      },
    },
    computed:{
      ...mapState(['loginResData'])
    }
  }
</script>
<style scoped>
  .container{
    width: 100%;
    background: url("./../../static/img/login1.jpg");
    position: absolute;
    height: 100%;
  }
  .content{
    display: flex;
    flex-wrap: wrap;
    width: 25%;
    height: 40%;
    position: fixed;
    background: #FFFFFF;
    z-index: 99;
    overflow: scroll;
    top:30%;
    margin-left: 40%;
    justify-content: center;
    background: #FFFFFF;
  }
  .title{
    background: white;
    width: 60%;
    height: 15%;
    margin-top: 10%;
    text-align: center;
    font-size: 30px;
    color: #00B7FF;
    overflow: hidden;
  }

</style>
