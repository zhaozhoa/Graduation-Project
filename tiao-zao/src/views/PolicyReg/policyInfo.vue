<template>
  <div class="needBuyInfo resetbg">
    <div class="searchItem">
      <p>{{info.TITLE}}</p>
      <div>
        <span>{{info.ORIGIN}}</span>

        <span>
          <van-icon name="clock" size="13" class="icon" />{{info.PUBLISH_DATE}}
        </span>
      </div>
    </div>

    <article v-html="info.CONTENT">
      
    </article>


    <div style="width:100%; height: 1.5rem"></div>
    <TabBar></TabBar>
  </div>
</template>

<script>
import qs from 'qs'
import { Icon } from "vant";
export default {
  name: "NeedBuyInfo",
  data() {
    return {
      info: ''
    };
  },

  components: {
    [Icon.name]: Icon
  },

  computed: {},

  mounted() {
    let INTEGRATED_ID = this.$route.params.INTEGRATED_ID
    
    this.getData (INTEGRATED_ID)
  },

  methods: {
    async getData (INTEGRATED_ID) {
      
     try {
        let {data: res} = await this.axios.post(this.httpurl+'/miniProIndex/getIntegratedDetail', qs.stringify({INTEGRATED_ID}))
         if (res.data[0].PUBLISH_DATE.includes('T')) {
          res.data[0].PUBLISH_DATE=res.data[0].PUBLISH_DATE.split('T')[0]
         }
         this.info = res.data[0]
     } catch (error) {
       this.$toast.fail('网络异常')
     }
      
    }
  }
};
</script>
<style lang='less' scoped>
.needBuyInfo {
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  background: #fff;
}

.searchItem {
  background: #fff;
  padding: 0 0.28rem;
  font-size: 0.37rem;
  border-bottom: 2px solid #f0f0f0;
  height: 2.35rem;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  p {
    font-size: 0.37rem;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    margin: 0;
  }
  div {
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.32rem;
    font-family: PingFang SC;
    color: rgba(153, 153, 153, 1);
  }
  span:nth-child(2) {
    .icon {
      vertical-align: middle;
      margin: 5px;
    }
  }
}

article {
  font-size: 0.43rem;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 0.67rem;
  padding: 0.45rem;
  p {
    margin-top: 0;
  }
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
</style>
