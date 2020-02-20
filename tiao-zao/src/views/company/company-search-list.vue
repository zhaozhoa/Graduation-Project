<template>
  <div class="searchList">
    <van-search
      v-model="keyWord"
      placeholder="请输入搜索关键词"
      shape="round"
      background="rgba(0,0,0,0)"
      class="search"
      @search="onSearch2"
    ></van-search>

    <div class="searchInfo">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :offset="offset"
        @load="onSearch"
      >
        <div
          class="searchItem"
          v-for="item in searchData"
          :key="item.ENTERPRISE_ID"
          @click="toCompany(item)"
        >
          <p>{{item.COMPANY_NAME_ZH}}</p>
          <p>
            <span>
              <img src="../../assets/list/jingying.png" alt />
            </span>
            <span>经营范围：</span>
            <span>{{item.BUSINESS_SCOPE_ZH}}</span>
          </p>
          <p>
            <span>
              <img src="../../assets/list/xingzhi.png" alt />
            </span>
            <span>企业性质：</span>
            <span>{{item.COMPANY_TYPE}}</span>
          </p>
          <p>
            <span>
              <img src="../../assets/list/local.png" alt />
            </span>
            <span>所在地：</span>
            <span class="local">{{item.ADDRESS_ZH}}</span>
          </p>
        </div>
      </van-list>
    </div>
    <TabBar></TabBar>
  </div>
</template>

<script>
import { Search, List } from "vant";
import qs from "qs";
export default {
  name: "CompanySearchList",
  data() {
    return {
      keyWord: "",
      searchData: [],
      loading: true,
      finished: false,
      currentPage: 1,
      showCount: 6,
      offset: 30
    };
  },

  components: {
    [Search.name]: Search,
    [List.name]: List
  },

  computed: {
    keyWords() {
      return this.$store.state.keyWords;
    }
  },

  mounted() {
    this.keyWord = this.$route.params.keyWord || this.$store.state.keyWords;
    this.$store.commit("changeKeyWords", this.keyWord);
    this.onSearch();
  },

  methods: {
    async onSearch() {
      try {
        let { data: res } = await this.axios.post(
          this.httpurl+"/miniProIndex/listEnterprise",
          qs.stringify({
            KEYWORDS: this.keyWords,
            currentPage: this.currentPage,
            showCount: this.showCount
          })
        );
        this.loading = false;
        this.searchData = [...this.searchData, ...res.data];
        if (this.currentPage >= res.page.totalPage) {
          this.finished = true;
        } else {
          this.currentPage++;
        }
      } catch (error) {}
    },
    toCompany(item) {
      this.$router.push({ name: "companyIndex", params: {item} });
    },
    onSearch2() {
      this.$store.commit("changeKeyWords", this.keyWord);
      this.searchData = [];
      this.currentPage = 1;
      this.loading = true;
      this.finished = false;
      this.onSearch();
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
    p:nth-child(1) {
      font-size: 0.37rem;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
    }
    p span {
      color: #999999;
    }
    img {
      width: 0.32rem;
      height: 0.32rem;
      margin-right: 0.15rem;
      vertical-align: middle;
      float: left;
      margin-top: 4px;
    }
    .local {
      display: inline-block;
      vertical-align: middle;
      width: 250px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
