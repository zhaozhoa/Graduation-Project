<template>
  <div class="resetbg">
    <van-search
      v-if="searchHide"
      v-model="keyWord"
      placeholder="请输入搜索关键词"
      shape="round"
      background="rgba(0,0,0,0)"
      class="search"
      @search="onSearch2"
    />

    <div class="searchInfo">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :offset="offset"
        @load="onSearch"
      >
        <div
          v-for="item in searchData"
          :key="item.INFORMATION_ID"
          class="searchItem"
          @click="toDetails(item.INFORMATION_ID)"
        >
          <p>{{ item.TITLE }}</p>
          <div>
            <span>
              <van-tag
                v-for=" (lb,index) in item.LABEL?item.LABEL.split(','):''"
                :key="index"
                round
                color="#9EB4EC"
              >
                {{ lb }}
              </van-tag>
            </span>
            <!--            <span style="color: #9EB4EC">{{item.LABEL?item.LABEL.replace(","," "):''}}</span>-->
            <span>
              <van-icon
                name="clock"
                size="13"
                class="icon"
              />
              <span>{{ item.PUBLISH_DATE }}</span>
            </span>
          </div>
        </div>
      </van-list>
    </div>
    <TabBar />
  </div>
</template>

<script>
import { Search, List, Icon,Tag  } from "vant";
// import qs from "qs";
export default {
  name: "NeedBuysearchList",

  components: {
    [Search.name]: Search,
    [List.name]: List,
    [Icon.name]: Icon,
    [Tag .name]: Tag
  },
  data() {
    return {
      // 当前搜索框的搜索关键字
      keyWord: "",
      searchData: [],
      loading: true,
      finished: false,
      currentPage: 1,
      showCount: 9,
      offset: 30,
      categories: "",
      searchHide:''
    };
  },

  computed: {
    searchUrl() {
      return this.$store.state.searchUrl;
    },
    keyWords() {
      return this.$store.state.keyWords;
    }
  },

  mounted() {
    this.keyWord = this.$route.params.keyWord || this.$store.state.keyWords;
    this.searchHide = this.$route.params.keyWord || ''
    if (this.$route.params.categories) {
      this.$ls.set('categories', this.$route.params.categories)
      
    }
    let categories = this.$route.params.categories || this.$ls.get('categories');
    // 将搜索的地址存到 vuex 这样从详情页回退到搜索页时时搜索页有数据
    if (categories === "2") {
      this.$store.commit(
        "changeSearchUrl",
        this.httpurl+"/miniProIndex/listPurchaseDemand"
      );
    } else if (categories === "1") {
      this.$store.commit(
        "changeSearchUrl",
        this.httpurl+"/miniProIndex/listInvestmentProject"
      );
    } else if (categories === "0") {
      this.$store.commit("changeSearchUrl", this.httpurl+"/miniProIndex/listTradeOppor");
    }

    // 存储当前搜索的关键字
    this.$store.commit("changeKeyWords", this.keyWord);
    this.onSearch();
  },

  methods: {
    async onSearch() {
      try {
        let { data: res } = await this.$api.needBuy.onSearch(
          this.searchUrl,
          {
            LIKENAME: this.keyWords,
            currentPage: this.currentPage,
            showCount: this.showCount
          }
        );
        this.loading = false;
        this.searchData = [...this.searchData, ...res.data];
        if (this.currentPage >= Math.ceil(res.total / this.showCount)) {
          this.finished = true;
        } else {
          this.currentPage++;
        }
      } catch (error) {
        console.log(error);
        
      }
    },
    onSearch2() {
      this.$store.commit("changeKeyWords", this.keyWord);

      this.searchData = [];
      this.currentPage = 1;
      this.loading = true;
      this.finished = false;
      this.onSearch();
    },
    toDetails(INFORMATION_ID) {
      this.$router.push({
        name: "needBuyInfo",
        params: { INFORMATION_ID }
      });
    }
  }
};
</script>
<style lang='less' scoped>
.search {
  margin-top: 0.21rem;
  width: 8.61rem;
  margin-left: 0.69rem;
}
.searchInfo {
  background: #fff;
  padding: 0.28rem;
  font-size: 0.37rem;
  margin-bottom: 1.5rem;
  .searchItem {
    border-bottom: 2px solid #f0f0f0;
    height: 2.35rem;
    p {
      font-size: 0.37rem;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      margin-top: 0.6rem;
    }
    div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.32rem;
      font-family: PingFang SC;
      color: rgba(153, 153, 153, 1);
      margin-top: 0.59rem;
      // span:nth-child(1) {
      //   float: left;
      // }
      span:nth-child(2) {
        // float: right;
        .icon {
          vertical-align: middle;
          margin: 5px;
        }
      }
    }
  }
}
</style>
