<template>
  <div class="WarningInfo">
    <header>
      <div class="title">{{data.TITLE}}</div>
      <div class="from">
        <div>来源：{{data.ORIGIN}}</div>
        <div class="time">
          <van-icon name="clock" class="icon" />
          <span>日期：{{getDate(data.PUBLISH_DATE)}}</span>
        </div>
      </div>
    </header>
    <div class="info" v-html="data.CONTENT">
      5月29日，美国国际贸易委员会（USITC）投票对
      进口自中国和印度的甘氨酸（Glycine）作出反补贴
      对进口自日本和印度的甘氨酸颁布反倾销税令。本
      产业损害肯定性终裁，同时对进口自日本和印度的
      甘氨酸作出反倾销产业损害肯定性终裁。美国商务
      5月29日，美国国际贸易委员会（USITC）投票对
      进口自中国和印度的甘氨酸（Glycine）作出反补贴
    </div>
    <!-- <p class="othersTitle">
      <i></i>
      <span>其他文章</span>
    </p>
    <div class="searchItem">
      <p>韩国寻找“智康福家用智能听诊器”经销商</p>
      <div>
       

        <span>
          <van-icon name="clock" size="13" class="icon" />2019-07-25 12:12:20
        </span>
      </div>
    </div>
    <div class="searchItem">
      <p>韩国寻找“智康福家用智能听诊器”经销商</p>
      <div>
       

        <span>
          <van-icon name="clock" size="13" class="icon" />2019-07-25 12:12:20
        </span>
      </div>
    </div>
    <div class="searchItem">
      <p>韩国寻找“智康福家用智能听诊器”经销商</p>
      <div>
       

        <span>
          <van-icon name="clock" size="13" class="icon" />2019-07-25 12:12:20
        </span>
      </div>
    </div> -->

    <div style="width:100%; height: 1.5rem"></div>
    <TabBar></TabBar>
  </div>
</template>

<script>
import qs from 'qs'
import { Icon } from "vant";
export default {
  name: "WarningInfo",
  data() {
    return {
      data: ''
    };
  },

  components: {
    [Icon.name]: Icon
  },

  computed: {},

  mounted() {
    let id = this.$route.params.INTEGRATED_ID
    this.getData(id)
  },

  methods: {
    getDate(date) {
      if(date){
        return date.split("T")[0];
      }
      return "";
    },
    async getData (id) {
      let {data:res} = await this.axios.post(this.httpurl+'/miniProIndex/getIntegratedDetail', qs.stringify({
        INTEGRATED_ID:id
      }))
      this.data = res.data[0]
    }
  }
};
</script>
<style lang='less' scoped>
header {
  padding: 0.27rem;
  .title {
    font-size: 0.48rem;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
  }
  .from {
    display: flex;
    font-size: 0.32rem;
    color: rgba(153, 153, 153, 1);
    justify-content: space-between;
    margin-top: 0.37rem;
    .time {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .icon {
        margin-right: 5px;
      }
    }
  }
}
.info {
  font-size:0.43rem;
font-weight:500;
color:rgba(51,51,51,1);
line-height:0.67rem;
padding: 0.27rem;
padding-bottom: .4rem;
border-bottom: 4px solid #f2f2f2;
}
.othersTitle {
  width: 100%;
  height: 1.19rem;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  margin: 0;
  font-size: 0.4rem;
  font-weight: bold;
  color: rgba(121, 121, 121, 1);
  line-height: 1.19rem;
  i {
    display: inline-block;
    vertical-align: middle;
    width: 0.16rem;
    height: 0.16rem;
    background: #008cee;
    border-radius: 50%;
    margin: 0 10px;
  }
}
.searchItem {
  background: #fff;
  padding: 0 0.28rem;
  font-size: 0.37rem;
  border-bottom: 2px solid #f0f0f0;
  height: 2.35rem;
  p {
    font-size: 0.37rem;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    margin-top: 0.3rem;
  }
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.32rem;
    font-family: PingFang SC;
    color: rgba(153, 153, 153, 1);
    margin-top: 0.59rem;
  }
  span:nth-child(1) {
    .icon {
      vertical-align: middle;
      margin: 5px;
    }
  }
}
</style>
