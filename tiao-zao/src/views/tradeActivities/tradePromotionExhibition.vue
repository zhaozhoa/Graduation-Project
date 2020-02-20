<template>
  <div class="TradePromotionExhibition resetbg">
    <div class="exhibitionWapper">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :offset="offset"
        @load="onSearch"
      >
        <div class="exhibitionItem" v-for="item in searchData" :key="item.TRADE_ID" @click="Details(item.TRADE_ID,item.PUBLISH_DATE)">
          <div class="title">
            {{item.TITLE}}
          </div>
          <!-- <van-image
            src="https://img.yzcdn.cn/vant/cat.jpeg"
            width="100%"
            height="4.19rem"
            fit="cover"
          > -->
            <!-- <template v-slot:error>暂无图片</template>
          </van-image> -->
          <div class="itemBottom">
            <div class="lable">
              <van-tag color="#f2826a" plain class="tag">{{item.LABEL}}</van-tag>
            </div>
            <span>
              <van-icon name="clock" size="13" class="icon" />{{(item.PUBLISH_DATE).split('T')[0]}}
            </span>
          </div>
        </div>
      </van-list>
    </div>
    <TabBar></TabBar>
  </div>
</template>

<script>
import qs from "qs";
import { Tag, Image, Icon, List } from "vant";
export default {
  name: "TradePromotionExhibition",
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
    [Image.name]: Image,
    [Icon.name]: Icon,
    [List.name]: List
  },

  computed: {},

  mounted() {
    this.onSearch();
  },

  methods: {
    async onSearch() {
      try {
        let { data: res } = await this.axios.post(
          this.httpurl+"/miniProIndex/listTrade",
          qs.stringify({
            KEYWORDS: this.keyWords,
            currentPage: this.currentPage,
            showCount: this.showCount
          })
        );
        this.loading = false;
        this.searchData = [...this.searchData, ...res.data];
        if (this.currentPage >= Math.ceil(res.total / this.showCount)) {
          this.finished = true;
        } else {
          this.currentPage++;
        }
      } catch (error) {}
    },
    Details(TRADE_ID,PUBLISH_DATE) {
      this.$router.push({
        name: 'exhibitionDetails',
        params: {TRADE_ID,PUBLISH_DATE}
      })
    }
  }
};


</script>
<style lang='less' scoped>
.TradePromotionExhibition {
  box-sizing: border-box;
  .exhibitionWapper {
    margin-bottom: 1.5rem;

    .exhibitionItem {
      margin: 0.27rem;
      border-bottom: 2px solid #f0f0f0;
      .title {
        font-size: 0.37rem;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        margin-bottom: 0.5rem;
      }
      .itemBottom {
        display: flex;
        justify-content: space-between;
        font-size: 0.29rem;
        margin: 0.23rem 0;
        color: rgba(188, 188, 188, 1);
        .icon {
          vertical-align: middle;
          margin: 5px;
        }
        .tag {
          margin-right: 0.27rem;
        }
      }
    }
  }
}
</style>
