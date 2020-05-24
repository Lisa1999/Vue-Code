<template>
  <div id="app" class="row">
    <div id='container' class="col-xs-2">
      <el-menu default-active="/add" router class="el-menu-vertical-demo"  :collapse="isCollapse">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/add">用户添加</el-menu-item>
          <el-menu-item index="/query">用户编辑</el-menu-item>
        </el-menu-item-group>
      </el-menu>
    </div>
    <div class="col-xs-6">
      <div id="router">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        isCollapse: false
      };
    },
  }
</script>

<style>
  #router{
    padding-left:20px ;
    padding-top: 20px;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    height: auto;
  }
</style>
