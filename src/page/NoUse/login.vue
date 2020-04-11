  <template>
    <div class="login">
      <div class="wrapper clearfix">
        <h1>VUE+IVIEW V1.0</h1>
        <span class="QRspan">
            <Icon type="logo-googleplus" size="24" color="lightblue"/>
            <span>关注公众号</span>
        </span>
      </div>
<!--      <img src="./../common/images/login2.jpg" class="img2">-->
      <div class="loginform1">
      <loginForm/>
      </div>
     <div class="footer">
       <div class="wrapper">
         <span>Copyright © 2019-2020 gram_lu</span>
       </div>
     </div>
    </div>
  </template>

  <script>
    import loginForm from './LoginForm'
    export default {
      name: "login",
      components:{loginForm}
    }
  </script>

  <style scoped>
    .login{
    }
    .wrapper{
      display: flex;
      flex-wrap: nowrap;
    }
    .img2{
      width:100%;
      height:90%;
    }
    .QRimg{
      width: 50px;
      height: 50px;
    }
    .loginform1{
      /*background:url("./../common/images/login2.jpg");*/
      display: flex;
      background: pink;
      height: 800px;
      width: 100%;
    }
    .QRspan{
      margin-left: 80%;
    }
    .clearfix{
      display: flex;
      justify-content: center;
      align-content: center;
    }
  </style>
