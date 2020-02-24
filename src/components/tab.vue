<!--<button v-on:click="home('/home')">首页</button>-->
<!--<button v-on:click="home('/search')">搜索</button>-->
<!--<button v-on:click="home('/me')">个人</button>-->
<template>
  <div class="layout">
    <Layout>
        <div class='hearder-all'>
        <div class='hearder-1'>
          <i class="report-accessibility"></i>
          <span>周报系统</span>
        </div>
          <div class='hearder-2'>
            <Dropdown trigger="click" style="margin-left: 20px">
              <a href="javascript:void(0)">
                <span>Admin</span>
                <i class="report-circle-down"></i>
              </a>
              <Dropdown-menu slot="list">
                <Dropdown-item>修改密码</Dropdown-item>
                <Dropdown-item>退出登陆</Dropdown-item>
              </Dropdown-menu>
            </Dropdown>
            <i class="report-user-check"></i>
          </div>
        </div>
      <Layout :style="{padding: '0 50px'}">
        <Breadcrumb :style="{margin: '16px 0'}">
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem>Components</BreadcrumbItem>
          <BreadcrumbItem>Layout</BreadcrumbItem>
        </Breadcrumb>
        <Content :style="{padding: '24px 0', minHeight: '280px', background: '#fff'}">
          <Layout>
            <Sider hide-trigger :style="{background: '#fff'}">
              <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
                <MenuItem name="1">
                  <div v-on:click="home('/survey')">
                  <Icon type="ios-navigate"></Icon>
                  <span>概述</span>
                  </div>
                </MenuItem>
                <Submenu name="4">
                  <template slot="title">
                    <Icon type="ios-navigate"></Icon>
                    公司管理
                  </template>
                  <MenuItem name="4-1">管理部门</MenuItem>
                </Submenu>
                <Submenu name="5">
                  <template slot="title">
                    <Icon type="ios-keypad"></Icon>
                    部门管理
                  </template>
                  <MenuItem name="5-1">周报管理</MenuItem>
                  <MenuItem name="5-2"><div v-on:click="home('/manageStaff')">成员管理</div></MenuItem>
                </Submenu>
                <MenuItem name="2">
                  <div v-on:click="home('/writeReport')">
                  <Icon type="ios-navigate"></Icon>
                  <span>写周报</span>
                  </div>
                </MenuItem>
                <MenuItem name="3">
                  <Icon type="ios-navigate"></Icon>
                  <span>历史周报</span>
                </MenuItem>
<!--                <button type="primary" @click="modal1 = true">显示对话框</button>-->
<!--                <Modal-->
<!--                  v-model="modal1"-->
<!--                  title="普通的Modal对话框标题">-->
<!--                  <p>重复点击</p>-->
<!--                </Modal>-->
              </Menu>
            </Sider>
<!--            <Content :style="{padding: '24px', minHeight: '280px', background: '#fff', minHeight: '700px'}">-->
<!--              &lt;!&ndash;<Home v-if="this.$route.path === '/home'"/>&ndash;&gt;-->
<!--              &lt;!&ndash;<Me v-if="this.$route.path === '/me'"/>&ndash;&gt;-->
<!--              &lt;!&ndash;<Search v-if="this.$route.path === '/search'"/>&ndash;&gt;-->
<!--              <div>-->
<!--                <i class="report-accessibility"></i>-->
<!--                <span>首页</span>-->
<!--              </div>-->
<!--              <router-view></router-view>-->
<!--            </Content>-->
            <div class="content">
              <div>
                <i class="report-accessibility"></i>
                <span>首页</span>
              </div>
              <router-view></router-view>
            </div>
          </Layout>
        </Content>
      </Layout>
      <Footer class="layout-footer-center">欢迎来到gram-lu的企业周报系统</Footer>
    </Layout>
  </div>
</template>
<script>
import {Layout, Sider, Menu, MenuItem, Icon, Header, Submenu, Breadcrumb, BreadcrumbItem, Dropdown, DropdownItem, DropdownMenu, Modal} from 'view-design'
import Home from './../page/Home'
import Me from './../page/Me'
import Search from './../page/Search'
export default {
  components: {Layout, Sider, Menu, MenuItem, Icon, Header, Submenu, Breadcrumb, BreadcrumbItem, Home, Search, Me, Dropdown, DropdownItem, DropdownMenu, Modal},
  data () {
    return {
      isCollapsed: false,
      modal1: false
    }
  },
  computed: {
  },
  mounted() {
    this.$store.dispatch()
  },
  methods: {
    home (path) {
      console.log(path)
      console.log(this.$route.path === path)
      this.$router.replace(path).catch(() => {
        // this.modal = true
      })
    }
  }
}
</script>
<style scoped>
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  .layout-logo{
    width: 150px;
    height: 40px;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
    line-height: 35px;
    background: #2db7f5;
    margin-left:5px
  }
  .layout-logo span{
    height: 10px;
    line-height: 25px;
    font-size: 24px;
  }
  .layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
  }
  .layout-footer-center{
    text-align: center;
  }
.ivu-layout-header{
  background: #2db7f5;
  color: white;
}
  .ivu-icon-md-albums{
    width: 30px;
    height: 30px;
  }
  .hearder-all{
    background: #2db7f5;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    height: 50px;
    position:relative;
  }
  .hearder-1{
    position: absolute;
    left:5%;
  }
  .hearder-1 span{
    font-size: 20px;
    color:white;
    font-family: Arial;
  }
  .hearder-1 li{
    height: 20px;
  }
  .hearder-2{
    position:absolute;
    right: 6%;
  }
  .hearder-2 span{
    font-size: 25px;
    font-family: "Agency FB";
    color: #f5f7f9;
  }
  .hearder-2 button{
    color: white;
    background:#2db7f5 ;
    border:0;
    font-size: 20px;
  }
  .content{
    width:100%;
    min-height: 700px;
    background: white;
  }
  .content span{
    font-size: 20px;
    margin-left: 10px
  }
  .content i{
    margin-left:10px;
  }
  .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu){
    background: dodgerblue;
    color: #f5f7f9;
  }
  .ivu-icon{
    color: #f5f7f9;
  }
  。ivu-icon-ivu-icon-arrow-down-b{
    color: red;
  }
</style>
