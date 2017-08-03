<template>
    <div class="desktop">
        <div class="header">
            <!--<div class="fl">{{msg}}</div>-->
            <a class="fr">
                <i class="el-icon-d-arrow-left"></i>
                退出
            </a>
    
        </div>
        <loading-bar id="loading-bar-id">
        </loading-bar>
    
        <div class="main-nav">
            <main-nav :navs="navs"></main-nav>
        </div>
    
        <div class="main">
    
            <div class="main-content fr">
                <router-view></router-view>
            </div>
        </div>
        <footer class="footer">
            <i>2017 C Bowen's Crm by 梁灿伦</i>
        </footer>
    </div>
</template>

<script>
import MainNav from "./children/MainNav";
import loadingBar from 'vue2-loading-bar';
export default {
    components: { MainNav },
    name: 'desktop',
    data() {
        return {
            msg: 'Bowen Crm',
            navs: [
                //   {route: '/hello', title: '欢迎'},
                //   {route: '/user', title: '员工信息'},
                { route: '/rss', title: '文章订阅' },
                { route: '/rssoption', title: '订阅设置' },
                //   {route: '/activity', title: '客户活动'},
                //   {route: '/quotation', title: '意向订单'},
                { route: '/about', title: '关于' }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
@import "src/style/mixin";

.desktop {
    height: 100%;
}

.header {
    box-sizing: border-box;
    width: 100%;
    height: 39px;
    background-color: #1f272f;
    line-height: 39px;
    vertical-align: middle;
    padding: 0 20px;
    padding-left: 250px;
    box-shadow: 2px 2px 2px #8197a0;
    &>a {
        color: white;
        cursor: pointer;
    }
    i {
        color: white;
        font-size: 10px;
        line-height: 37px;
        vertical-align: middle;
    }
}

.main {
    box-sizing: border-box;
    min-height: 200px;
    height: 80%;
    height: -moz-calc(100% - 64px);
    height: -webkit-calc(100% - 64px);
    height: calc(100% - 64px);
    width: 100%;
    padding-left: 190px;

    .main-content {
        width: 100%;
        height: 100%;
        text-align: left;
        padding: 20px;
        overflow-y: auto;
        overflow-x: hidden;
    }
}

.footer {
    height: 25px;
    width: 100%;
    background-color: #303942;
    padding-left: 250px;
    i {
        line-height: 28px;
        vertical-align: middle;
        font-size: 12px;
        color: #666666;
        text-align: center;
    }
}
</style>

