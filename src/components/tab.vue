<!--<button v-on:click="home('/home')">首页</button>-->
<!--<button v-on:click="home('/search')">搜索</button>-->
<!--<button v-on:click="home('/me')">个人</button>-->
<template>
  <div class="layout">
    <Layout>
        <div class='hearder-all'>
        <div class='hearder-1'>
          <i class="report-user-check"></i>
          <span>周报系统</span>
        </div>
          <div class='hearder-2'>
            <span>Admin</span>
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
                  <Icon type="ios-navigate"></Icon>
                  <span v-on:click="home('/search')">概述</span>
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
                  <MenuItem name="5-2">成员管理</MenuItem>
                </Submenu>
                <MenuItem name="2">
                  <Icon type="ios-navigate"></Icon>
                  <span>写周报</span>
                </MenuItem>
                <MenuItem name="3">
                  <Icon type="ios-navigate"></Icon>
                  <span>历史周报</span>
                </MenuItem>
              </Menu>
            </Sider>
            <Content :style="{padding: '24px', minHeight: '280px', background: '#fff', minHeight: '500px'}">
              <!--<Home v-if="this.$route.path === '/home'"/>-->
              <!--<Me v-if="this.$route.path === '/me'"/>-->
              <!--<Search v-if="this.$route.path === '/search'"/>-->
              <router-view></router-view>
            </Content>
          </Layout>
        </Content>
      </Layout>
      <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
    </Layout>
  </div>
</template>
<script>
import {Layout, Sider, Menu, MenuItem, Icon, Header, Submenu, Breadcrumb, BreadcrumbItem} from 'view-design'
import Home from './../page/Home'
import Me from './../page/Me'
import Search from './../page/Search'
export default {
  components: {Layout, Sider, Menu, MenuItem, Icon, Header, Submenu, Breadcrumb, BreadcrumbItem, Home, Search, Me},
  data () {
    return {
      isCollapsed: false
    }
  },
  computed: {
  },
  methods: {
    home (path) {
      console.log(path)
      console.log(this.$router)
      this.$router.replace(path).catch((error) => {
        console.log(error)
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
    justify-content: flex-end;
    height: 50px;
    position: relative;
  }
  .header-1{
    height: 30px;
    position: relative;
    display: flex;
    align-content: space-around;
    justify-content: left;
  }
  .header-2{
    position: relative;
    display: flex;
    align-content: space-around;
    justify-content: right;
  }
</style>
