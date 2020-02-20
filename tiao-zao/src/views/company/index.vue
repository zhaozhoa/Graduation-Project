<template>
  <div class="CompanyIndex">
    <van-tabs v-model="activeName" title-active-color="#3195FF" color="#3195FF" class="nav">
      <van-tab title="首页" name="a" >
        <company></company>
      </van-tab>
      <van-tab title="公司简介" name="b">
        <companyInfo></companyInfo>
      </van-tab>
      <van-tab title="联系方式" name="d">
        <companyContcat></companyContcat>
      </van-tab>
    </van-tabs>
    <TabBar></TabBar>
  </div>
</template>

<script>
import { Tab, Tabs } from "vant";
import companyInfo from "../../views/company/company-info";
import company from "../../views/company/company";
import companyContcat from "../../views/company/company-contcat";

export default {
  name: "Company",
  data() {
    return {
      activeName: "a",
    };
  },

  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    companyInfo,
    company,
    companyContcat
  },

  computed: {},

  mounted() {
    let nowData
    if (this.$route.params.item) {
       nowData = this.$route.params.item
      this.$ls.set('nowData', nowData)
    } else {
       nowData = this.$ls.get('nowData')
    }

    this.$store.commit('changeCompany', nowData)
  },

  methods: {}
};
</script>
<style lang='less' scoped>
.CompanyIndex {
  background: #f0f0f0;
}

</style>
