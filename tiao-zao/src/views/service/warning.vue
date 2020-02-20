<template>
  <div class="warningInfo">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :offset="offset"
      @load="onSearch"
    >
      <div class="waringItem" v-for="item in searchData" :key="item.INTEGRATED_ID" @click="deatils(item.INTEGRATED_ID)">
        <div class="title">{{item.TITLE}}</div>
        <div class="time">
          <van-icon name="clock" class="icon" />
          <span>日期：{{(item.PUBLISH_DATE).split('T')[0]}}</span>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import qs from "qs";
import { List, Icon } from "vant";

export default {
  name: "warningInfo",
  data() {
    return {
      searchData: [],
      loading: true,
      finished: false,
      currentPage: 1,
      showCount: 9,
      offset: 30,
    };
  },

  components: {
    [List.name]: List,
    [Icon.name]: Icon
  },

  computed: {},

  mounted() {
    this.onSearch()
  },

  methods: {
    async onSearch() {
      try {
        let { data: res } = await this.axios.post(this.httpurl+'/miniProIndex/listConflictnWarn',
          qs.stringify({
            currentPage: this.currentPage,
            showCount: this.showCount,
          })
        );
        this.loading = false;
        this.searchData = [...this.searchData, ...res.data];
        if (this.currentPage >= Math.ceil(res.total / this.showCount)) {
          this.finished = true;
        } else {
          this.currentPage++;
        }
      } catch (error) {
      }
    },
    deatils(id) {
      this.$router.push({
        name: 'WarningInfo',
        params: {
          INTEGRATED_ID:id
        }
      })
    }
  }
};
</script>
<style lang='less' scoped>
.waringItem {
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 2.35rem;
  font-size: 0.37rem;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
  .time {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 0.29rem;
    font-weight: 400;
    color: rgba(188, 188, 188, 1);
    .icon {
      margin-right: 5px;
    }
  }
}
</style>
