<template>
  <div class="loginform">
      <img src="src/common/images/vue.jpg" class="img3">
    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
      <FormItem prop="user">
        <Input type="text" v-model="formInline.user" placeholder="Username">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input type="password" v-model="formInline.password" placeholder="Password">
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <br/>
      <div>
      <FormItem>
        <span>记住密码</span>
        <i-switch v-model="formItem.switch" size="large">
          <span slot="open">On</span>
          <span slot="close">Off</span>
        </i-switch>
      </FormItem>
      </div>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formInline')" >登陆</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  import qs from 'qs'
    import config from "../../config/config";
    import token from "../../util/token";
    import axios from "axios";
    export default {
      name: "LoginForm",
      data() {
        return {
          code: '',
          formInline: {
            user: '123',
            password: '456526'
          },
          ruleInline: {
            user: [
              {required: true, message: 'Please fill in the user name', trigger: 'blur'}
            ],
            password: [
              {required: true, message: 'Please fill in the password.', trigger: 'blur'},
              {type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur'}
            ]
          },
          formItem: {
            switch: true,
          }
        }
      },
      mounted() {
        this.code = this.$route.query.code
        console.log(this.code)
        // this.githubInformation.state = this.$route.query.state
        this.getToken(this.code);
        // console.log(this.githubInformation.code)
        // console.log(this.$route.query.code)
      },
      methods: {
        handleSubmit(name) {
          // const url = '/api/captcha'
          // fetch(url).then(()=>{
          //   console.log('1234567894516544684')
          // })
          this.$refs[name].validate((valid) => {
            if (valid) {
              window.location.href = config.userAuthorizationUri + '?' + 'redirect_uri' + '=' + config.redirect_uri + '&' + 'client_id' + '=' + config.clientId + '&' + 'scope' + '=' + config.scope + '&' + 'state' + '=' + config.state + '&' + 'response_type' + '=' + config.response_type
              this.code = this.$route.query.code
              console.log(code)
              // window.location.href = config.accessTokenUri+'?'+'client_secret'+'='+config.clientSecret+'&'+'client_id'+'='+config.clientId+'&'+'code'+'='+this.githubInformation.code+'&'+'state'+'='+config.state
              this.$Message.success('Success!');
            } else {
              //     this.$store.dispatch('login')
              //     // window.location.href = config.userAuthorizationUri+'?'+'redirect_uri'+'='+config.redirect_uri+'&'+'client_id'+'='+config.clientId+'&'+'scope'+'='+config.scope+'&'+'state'+'='+config.state+'&'+'response_type'+'='+config.response_type
              this.$Message.error('Fail!');
            }
          })
        },
        // 得到code之后进行获取Token
        getToken(code) {
          let user = {
            'client_secret': config.clientSecret,
            'code': code,
            'client_id': config.clientId
          }
          window.location.href = config.userAuthorizationUri + '?' + 'redirect_uri' + '=' + config.redirect_uri + '&' + 'client_id' + '=' + config.clientId + '&' + 'scope' + '=' + config.scope + '&' + 'state' + '=' + config.state + '&' + 'response_type' + '=' + config.response_type
          // method: 'post',
          // url: config.accessTokenUri + '?' + 'client_secret=' + config.clientSecret + '&' + 'code=' + code + '&' + 'client_id=' + config.clientId,
          // url: 'https://github.com/login/oauth/access_token?client_secret=b2efa09970a4693a610a3df872cbebe0a633c8e5&code=76def5484b1845e225f1&client_id=57a863569982d94f05e4',
          // headers: {
          //   'Access-Control-Allow-Origin': '*',
          //   'Content-Type': 'application/x-www-form-urlencoded',
          // },
          // headers: {'Access-Control-Allow-Origin': '*',},
          // withCredentials: false
          // ).then(function (res) {
          //   res.setHeader("Access-Control-Allow-Origin", "*")
          // }.bind(this));
          axios(config.accessTokenUri,{
            method: 'POST',
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
            },
            withCredentials: true,
            credentials: 'same-origin',
            client_id:config.clientId,
            client_secret:config.client_secret,
            code:code,
            redirect_uri:config.redirect_uri,
            grant_type:config.grant_type,

          }).then(callback).catch(error)
        }
      }
    }
</script>

<style scoped>
.loginform{
  background: #FFFFFF;
  width: 18%;
  height: 45%;
  z-index: 99;
  position: relative;
  margin-left: 50%;
  text-align: center;
  top:40%;
}

  .img3{
    width: 80px;
    height: 80px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
</style>
