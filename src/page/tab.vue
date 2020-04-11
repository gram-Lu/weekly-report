<!--<button v-on:click="home('/home')">首页</button>-->
<!--<button v-on:click="home('/search')">搜索</button>-->
<!--<button v-on:click="home('/me')">个人</button>-->
<template>
  <div class="layout" style="background: #f5f7f9">
    <Layout height="100%">
      <Sider hide-trigger :style="{background:'#001529'}">
        <div style="background:dodgerblue;width: 160px;height:40px;padding: 3% 7%;margin:12% 15px;font-size: 18px;border-radius: 10px;color:#FFFFFF;font-family: Bahnschrift">企业周报系统</div>
        <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']" style="z-index: 20">
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
            <div v-on:click="home('/historyReport')">
            <Icon type="ios-navigate"></Icon>
            <span>历史周报</span>
            </div>
          </MenuItem>
          <MenuItem name="4">
            <div v-on:click="home('/BlogIndex')">
              <Icon type="ios-navigate"></Icon>
              <span>写博客</span>
            </div>
          </MenuItem>
          <MenuItem name="5">
            <div v-on:click="home('/historybook')">
              <Icon type="ios-navigate"></Icon>
              <span>历史博客</span>
            </div>
          </MenuItem>
        </Menu>
      </Sider>
      <Layout :style="{padding: '0'}">
        <div class='hearder-all'>
          <div class='hearder-1'>
            <Button type="text">
              <Icon type="ios-home" style="color: #001529"/>
              首页
            </Button>
          </div>
          <div class='hearder-2'>
            <Dropdown style="margin-left: 20px">
              <Button type="text">
                {{username}}
                <Icon type="md-arrow-dropdown" style="color: black" />
            </Button>
              <DropdownMenu slot="list">
                <DropdownItem>修改密码</DropdownItem>
                <DropdownItem>退出登陆</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <Content :style="{padding: '24px 0', background: '#fff'}">
          <Layout>
            <div class="content">
              <router-view></router-view>
            </div>
          </Layout>
        </Content>
        <Footer class="layout-footer-center">欢迎来到gram-lu的企业周报系统</Footer>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import {Layout, Sider, Menu, MenuItem, Icon, Header, Submenu, Breadcrumb, BreadcrumbItem, Dropdown, DropdownItem, DropdownMenu, Modal, Button} from 'view-design'
import Home from './Home'
import Me from './Me'
import Search from './Search'
import HistoryReport from './HistoryReport'
export default {
  components: {Layout, Menu, MenuItem, Icon, Header, Submenu, Breadcrumb, BreadcrumbItem, Home, HistoryReport, Search, Me, Dropdown, DropdownItem, DropdownMenu, Modal, Button},
  data () {
    return {
      isCollapsed: false,
      modal1: false,
      username:''
    }
  },
  created() {
    // console.log(this.$local.get('user'))
    let userInfo = localStorage.getItem('user')
    console.log(userInfo)
    if (userInfo) {
      this.username = userInfo
    }
  },
  computed: {
  },
  mounted() {
  },
  methods: {
    home (path) {
      console.log(path)
      console.log(this.$route.path === path)
      this.$router.push(path)
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
    height:100%
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
    background: #FFFFFF;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    height: 60px;
    position:relative;
    border-bottom-style: solid;
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
  .hearder-2{
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
  .ivu-layout-sider-children ul{
    background: #001529;
    color:#FFFFFF;
    width:256px;
  }
  .ivu-menu-vertical.ivu-menu-light:after{
    display: none;
  }
</style>

