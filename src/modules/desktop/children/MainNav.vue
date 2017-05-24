<template>
    <div class="nav">
        <router-link to="/hello">
            <div class="logo">
                <img src="../../../assets/logo.png">
            </div>
        </router-link>
        <div class="menus">
            <el-menu mode="vertical" default-active="1" class="el-menu-vertical-demo">
                <el-menu-item index="1" v-for="nav in navs" :key="nav.route">
                    <router-link :to="nav.route">
                        <i class="el-icon-arrow-right"></i>
                        {{nav.title}}
                    </router-link>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="side-line"></div>
    </div>
</template>
<script>
  export default {
    name: 'mainNav',
    props: ['navs'],
    data () {
      return {}
    }
  }
</script>
<style lang="scss" scoped="">
    @import "src/style/mixin";

    .logo {
        height: 77px;
        font-size: 24px;
        line-height: 75px;
        text-align: left;
        color: white;
        background-color: #1f272f;
        padding-top: 10px;
        padding-left: 25px;
        cursor: pointer;
        img {
            height: 53px;
        }
    }

    .nav {
        position: absolute;
        top: 0;
        width: 190px;
        padding-left: 4px;
        height: 100%;
        background-color: #303942;
        text-align: left;
    }

    .el-menu {
        background-color: #303942;
        border-bottom: 1px solid #1f272f;
    }

    .el-menu-item {
        border-bottom: solid 1px #3a444d;
        border-top: solid 1px #1f272f;
        height: 42px;
        line-height: 42px;
        a, i {
            color: #939da8;
        }

        &:hover {
            background-color: #28a9e3;
            a, i {
                color: white;
            }

            &::after {
                content: '';
                display: block;
                position: absolute;
                top: 14px;
                width: 12px;
                height: 12px;
                background-color: white;
                transform: rotate(40deg);
                left: 180px;
            }
        }
        a {
            display: inline-block;
            width: 100%;
            height: 100%;
        }
    }

    .side-line {
        height: 100%;
        position: absolute;
        top: 0px;
        left: 2px;
        width: 4px;
        background-color: #7ca343;
        border-left: solid 2px #1f272f;
    }

</style>