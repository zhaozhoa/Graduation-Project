<template>
  <div class="myTradeInfo">
    <div class="list">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :offset="offset"
        @load="getData"
      >
        <div class="item" v-for="item in searchData" :key="item.INFORMATION_ID" @click="goDetail(item.INFORMATION_ID)">
          <div class="title">{{item.TITLE}}</div>
          <van-tag size="medium" plain class="tag">{{item.CATEGORY}}</van-tag>
          <div class="footer">
            <van-tag type="primary" size="medium" v-if="item.STATE == '待审核'">待审核</van-tag>
            <van-tag type="success" size="medium" v-if="item.STATE == '审核通过'">审核通过</van-tag>
            <van-tag type="danger" size="medium" v-if="item.STATE == '审核不通过'">审核不通过</van-tag>

            <div class="time">
              <van-icon name="clock" size="13" class="icon" />
              <span>{{item.PUBLISH_DATE}}</span>
            </div>
          </div>
        </div>
      </van-list>
    </div>
    <TabBar></TabBar>
  </div>
</template>

<script>
import qs from "qs";
import { Tag, Icon, List } from "vant";
export default {
  name: "myTradeInfo.",
  data() {
    return {
      searchData: [],
      loading: true,
      finished: false,
      currentPage: 1,
      showCount: 10,
      offset: 30
    };
  },

  components: {
    [Tag.name]: Tag,
    [Icon.name]: Icon,
    [List.name]: List
  },

  computed: {},

  mounted() {
    this.getData();
  },

  methods: {

    async getData() {
      try {
        let { data: res } = await this.axios.post(
          this.httpurl+"/miniProIndex/listMyTradeInfo",
          qs.stringify({
            ENTERPRISE_ID: this.$ls.get('user').USER_ID,
            currentPage: this.currentPage,
            showCount: this.showCount
          })
        );
        res.data.forEach(ele => {
          if (ele.STATE === "0") {
            ele.STATE = "待审核";
          } else if (ele.STATE === "1") {
            ele.STATE = "审核通过";
          } else {
            ele.STATE = "审核不通过";
          }



          // ToDO 
          if (ele.CATEGORY === '0') {
            ele.CATEGORY = '贸易商机'
          } else if (ele.CATEGORY === '1') {
            ele.CATEGORY = '投资项目'
          } else if (ele.CATEGORY === '2') {
            ele.CATEGORY = '采购需求'
          } 


        });
        this.loading = false;
        this.searchData = [...this.searchData, ...res.data];
        if (this.currentPage >= Math.ceil(res.total / this.showCount)) {
          this.finished = true;
        } else {
          this.currentPage++;
        }
      } catch (error) {
        this.$toast("网络异常" + error);
      }
    },
    goDetail(INFORMATION_ID) {
      this.$router.push({
        name: 'needBuyInfo',
        params:{INFORMATION_ID}
      })
    }
  }
};
</script>
<style lang='less' scoped>
.myTradeInfo {
  box-sizing: border-box;
  width: 100vw;
  min-height: 100vh;
  background: #fff;
  padding: 0.27rem;
  .item {
    width: 100%;
    height: 4rem;
    border-bottom: 1px solid #f0f0f0;
    font-size: 0.37rem;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    p {
      margin: 0;
    }
    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .time {
        display: flex;
        align-items: center;
        font-size: 0.29rem;
        font-weight: bold;
        color: rgba(188, 188, 188, 1);
        .icon {
          margin-right: 10px;
        }
      }
    }
  }
  .tag {
    width: 50px;
  }
}
</style>
