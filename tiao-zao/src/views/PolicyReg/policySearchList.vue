<template>
  <div class="resetbg">

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
          :key="item.INTEGRATED_ID"
          @click="toDetails(item.INTEGRATED_ID)"
        >
          <p>{{item.TITLE}}</p>
          <div>
            <span>{{item.ORIGIN}}</span>

            <span>
              <van-icon name="clock" size="13" class="icon" />
              <span>{{(item.PUBLISH_DATE).split('T')[0]}}</span>
            </span>
          </div>
        </div>
      </van-list>
    </div>
    <TabBar></TabBar>
  </div>
</template>

<script>
import { Search, List, Icon } from "vant";
import qs from "qs";
export default {
  name: "",
  data() {
    return {
      // 当前搜索框的搜索关键字
      keyWord: "",
      searchData: [],
      loading: true,
      finished: true,
      currentPage: 1,
      showCount: 9,
      offset: 30,
      categories: ""
    };
  },

  components: {
    [Search.name]: Search,
    [List.name]: List,
    [Icon.name]: Icon
  },

  computed: {
  },

  mounted() {
    this.onSearch();
  },

  methods: {
    async onSearch() {
      try {
        let { data: res } = await this.axios.post(
         this.httpurl+'/miniProIndex/listPolicyReg',
          qs.stringify({
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
    
    toDetails(INTEGRATED_ID) {

      this.$router.push({
        name: "policyInfo",
        params: { INTEGRATED_ID }
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
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    p {
      margin: 0;
      font-size: 0.37rem;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
    }
    div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.32rem;
      color: rgba(153, 153, 153, 1);
      span:nth-child(2) {
        .icon {
          vertical-align: middle;
          margin: 5px;
        }
      }
    }
  }
}
</style>
