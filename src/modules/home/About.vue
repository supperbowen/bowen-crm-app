<template>
  <div class="about">

    <!--<el-steps :space="100" direction="vertical" :active="1">
      <el-step title="采用技术 vue.js, .netcore, mongodb"></el-step>
      <el-step title="github: https://github.com/supperbowen"></el-step>
      <el-step title="blog: www.liangcanl.com"></el-step>
      <el-step title="QQ：452562076 (梁灿伦)"></el-step>
    </el-steps>-->

    <div class="block">
      <span class="demonstration">采用技术</span>
      <div>vue.js, .netcore, mongodb</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'about',
    data () {
      return {
        items: [
          '员工信息',
          '客户信息',
          '客户活动信息',
          '客户活动提醒',
          '意向订单'
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "src/style/mixin";

  .about{
    padding: 15px;
  }
  li{
    font-size: 15px;
    font-weight: bold;
    color: darkblue;
  }

</style>
