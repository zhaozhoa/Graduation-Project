<template>
  <div class="enrollSurface resetbg">
    <van-tabs v-model="activeTabs" title-active-color="#3195FF" color="#3195FF">
      <van-tab title="经贸活动报名" name="first" v-if="jmShow">
        <MeetingEnroll />
      </van-tab>
      <van-tab title="对接洽谈报名" name="second" v-if="djShow">
        <van-tabs v-model="activeStore" title-active-color="#3195FF" color="#3195FF">  
          <!-- <van-tab title="我是供应商" name="firstStore" v-if="djgyShow" > -->
          <van-tab title="我是供应商" name="firstStore">
            <NegotiateSupply />
          </van-tab>
          <!-- <van-tab title="我是采购商" name="secondStore" v-if="djcgShow"> -->
          <van-tab title="我是采购商" name="secondStore">  
            <NegotiateBuy />
          </van-tab>
        </van-tabs>
      </van-tab>
      <van-tab title="参展报名" name="third" v-if="czShow">
        <ExhibitorEnroll />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import qs from "qs";
import { Tab, Tabs } from "vant";
import MeetingEnroll from './compontents/meetingEnroll'
import ExhibitorEnroll from './compontents/exhibitorEnroll'
import NegotiateBuy from './compontents/negotiateBuy'
import NegotiateSupply from './compontents/negotiateSupply'
export default {
  name: "enrollSurface",
  data() {
    return {
      activeTabs: "first",
      activeStore: "firstStore",
      czShow: false,  //参展报名
      djShow: false,  //对接洽谈报名
      jmShow: false,  //经贸会议报名
      djgyShow: false,  //我是供应商
      djcgShow: false,  //我是采购商

      params: {},   //初始化数据对象

      tempObject: {
        TYPE: '',   //判断此模块是否显示
        TRADE_ID: '', //获取id
        ACTIVITY_SESSION: [],   //活动会议
        ACTIVITY_SESSION2: [],  //活动会议2
        getInitData: {},  //获取初始化数据
        template: {}, //报名表单模板对象
      },

      // 对接洽谈表单--供应商表单
      formSupply: {
        type: [],
        productList: '',
        checkType: [],
        types: [],
        else1: '',
        STATE: '',
        else2: '',
        EXHIBITORS_ID: ''
      },

      // 对接洽谈表单--采购商列表
      formProcurement: {
        type: [],
        types: [],
        productList: '',
        STATE: '',
        checkType: [],
        else1: '',
        else2: '',
        EXHIBITORS_ID: ''
      },

    };
  },

  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    MeetingEnroll,
    NegotiateBuy,
    NegotiateSupply,
    ExhibitorEnroll
  },

  methods: {

    // 初始化获取数据
    async initData() {
      try {
        let { data: res } = await this.axios.post(
          this.httpurl + "economyTrade/get",
          qs.stringify({
            TRADE_ID: this.tempObject.TRADE_ID
          })
        );
        console.log(res);
        if(res.code == 0) {
          this.params = res.data; //把所有数据值赋值给params
          this.tempObject.TRADE_ID = this.params.TRADE_ID;  //把id值赋给trade_id
          this.initInformation(this.params, this.params.TYPE)   //初始化获取 部分数据
          this.getTemplate(); // 获取报名表单模板
        }
      } catch (error) {}
    },

    // 初始化获取部分数据
    initInformation(data,type) {
      // 获取ACTIVITY_SESSION
      if (data.ACTIVITY_SESSION) {
        this.tempObject.ACTIVITY_SESSION = data.ACTIVITY_SESSION.split(",");
      }
      // ACTIVITY_SESSION2
      if (data.ACTIVITY_SESSION2) {
        this.tempObject.ACTIVITY_SESSION2 = data.ACTIVITY_SESSION2.split(",");
      }
      // type
      if (type) {
        let TYPE = type.split(",").sort()
        if (TYPE.indexOf("0") != -1) {  //若数组中有0,则显示参展报名
          this.czShow = true;
          if (TYPE.indexOf("0") == 0) {
            this.activeTabs = 'third';  //默认选中参展报名
          }
        }
        if (TYPE.indexOf("1") != -1) {  //若数组中有1,则显示对接洽谈报名
          this.djShow = true;
          this.activeTabs = 'second';
          if (TYPE.indexOf("1") == 0) {
            this.activeTabs = 'second';  //默认选中对接洽谈报名
          }
        }
        if (TYPE.indexOf("2") != -1) {  //若数组中有2,则显示经贸会议报名
          this.jmShow = true;
          this.activeTabs = 'first';
          if (TYPE.indexOf("2") == 0) {
            this.activeTabs = 'first';  //默认选中对接洽谈报名
          }
        }
      }
    },

    // 获取报名表单模板
    async getTemplate() {
      try {
        let { data: res } = await this.axios.post(
          this.httpurl + "template/get",
          qs.stringify({
            TEMPLATE_ID: this.params.TEMPLATE_ID
          })
        );
        // console.log(res);
        if (res.code == 0) {
          this.tempObject.template = res.data; //把数据赋值于表单模板对象
          this.tempObject.template.GOODS_CATEGORY = JSON.parse(this.tempObject.template.GOODS_CATEGORY);  //把字符串转为对象

          // 初始化所以的types
          for (let i = 0; i < this.tempObject.template.GOODS_CATEGORY.length; i++) {
            let tempArray = this.tempObject.template.GOODS_CATEGORY[i];
            // 采购商列表初始化
            this.formProcurement.types.push({
              name: tempArray.name,
              types: []
            });
            // 供应商列表初始化
            this.formSupply.types.push({
              name: tempArray.name,
              types: []
            });
          }
        } else if (res.code == 1) {
          this.$toast.fail("获取模版信息出错！");
        }
      } catch (error) {
        this.$toast.loading("登录失效，请求服务器无响应，稍后再试！");
      }
    },

  },

  computed: {

  },

  mounted() {
    let params = this.$route.params.params;
    this.tempObject.TRADE_ID = this.$route.params.TRADE_ID;  //获取Id
    this.$store.commit("changeExhibition", params); //存储值到vuex中
    this.initData();  //初始化数据
    this.$store.commit("changeTempObject", this.tempObject); //把数据存储在vuex中
  },

};
</script>
<style lang='less' scoped>
</style>
