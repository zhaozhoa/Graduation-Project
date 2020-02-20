<template>
  <div class="consultation">
    <div class="titleWapper">
      <p class="title">商事调解仲裁咨询</p>
    </div>
    <van-cell-group>
      <van-field
        v-model="title"
        label="标题"
        placeholder="请输入标题"
        required
        :error-message="titleTips"
        label-width="120px"
        @blur="check('0')"
      />
      <van-field
        v-model="companyName"
        label="企业名称"
        placeholder="请输入企业名称"
        required
        :error-message="companyNameTips"
        label-width="120px"
        @blur="check('1')"
      />
      <van-field
        v-model="companyAddress"
        label="企业地址"
        placeholder="请输入企业地址"
        required
        :error-message="companyAddressTips"
        label-width="120px"
        @blur="check('2')"
      />
      <van-field
        v-model="lawName"
        label="法定代表人姓名"
        placeholder="请输入法定代表人姓名"
        required
        :error-message="lawNameTips"
        label-width="120px"
        @blur="check('3')"
      />
      <van-field
        v-model="duties"
        label="法定代表人职位"
        placeholder="请输入法定代表人职位"
        required
        :error-message="dutiesTips"
        label-width="120px"
        @blur="check('4')"
      />
      <van-field
        v-model="phone"
        label="联系人电话"
        placeholder="请输入联系人电话"
        required
        :error-message="phoneTips"
        label-width="120px"
        @blur="check('5')"
      />
      <van-field
        v-model="email"
        label="联系人邮箱"
        placeholder="请输入联系人邮箱"
        :error-message="emailTips"
        label-width="120px"
      />
      <van-field
        v-model="contain"
        label="咨询内容"
        placeholder="请输入咨询内容"
        required
        autosize
        type="textarea"
        :error-message="containTips"
        label-width="120px"
        rows="5"
        @blur="check('6')"
      />
    </van-cell-group>
    <div class="btnWapper">
      <van-button type="primary" class="btn" @click="submit">提交</van-button>
      <van-button class="btn" @click="back">返回</van-button>
    </div>
    <TabBar></TabBar>
  </div>
</template>

<script>
import { Field, Button, Cell, CellGroup } from "vant";
import qs from "qs";
export default {
  name: "Consultation",
  data() {
    return {
      title: "",
      companyName: "",
      companyAddress: "",
      lawName: "",
      duties: "",
      phone: "",
      email: "",
      contain: "",
      titleTips: "",
      companyNameTips: "",
      companyAddressTips: "",
      lawNameTips: "",
      dutiesTips: "",
      phoneTips: "",
      emailTips: "",
      containTips: ""
    };
  },

  components: {
    [Field.name]: Field,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },

  computed: {},

  mounted() {},

  methods: {
    check(index) {
      // 非空校验
      let index2 = parseInt(index);
      let nameArr = [
        "标题",
        "企业名称",
        "企业地址",
        "法定代表人姓名",
        "法定代表人职位",
        "联系人电话",
        "咨询内容"
      ];
      let tipsArr = [
        "titleTips",
        "companyNameTips",
        "companyAddressTips",
        "lawNameTips",
        "dutiesTips",
        "phoneTips",
        "containTips"
      ];
      let typeArr = [
        "title",
        "companyName",
        "companyAddress",
        "lawName",
        "duties",
        "phone",
        "contain"
      ];

      if (!this[typeArr[index2]]) {
        this[tipsArr[index2]] = nameArr[index2] + "不能为空";
        return;
      } else {
        this[tipsArr[index2]] = "";
      }

      if (index === "5") {
        if (!/^1[3456789]\d{9}$/.test(this.phone)) {
          this[tipsArr[index2]] = "输入的电话号码格式有误";
          return;
        } else {
          this[tipsArr[index2]] = "";
        }
      }
    },
    async submit() {
      let typeArr = [
        "title",
        "companyName",
        "companyAddress",
        "lawName",
        "duties",
        "phone",
        "contain"
      ];
      let tipsArr = [
        "titleTips",
        "companyNameTips",
        "companyAddressTips",
        "lawNameTips",
        "dutiesTips",
        "phoneTips",
        "containTips"
      ];
      
      for (let index = 0; index < typeArr.length; index++) {
        const ele = typeArr[index];
        const ele2 = tipsArr[index];
        if (this[ele] === '') {
          this.$toast("*为必填项");
          return
        }
         if(this[ele2] !== '') {
          return
        }
      }
      let arbitrament = {
        TITLE: this.title,
        ENTERPRISE_NAME: this.companyName,
        ENTERPRISE_ADDRESS: this.companyAddress,
        LAGAL_PERSON: this.lawName,
        LAGAL_POSITION: this.duties,
        TELEPHONE: this.phone,
        MAILBOX: this.email,
        CONTENT: this.contain
      };
      try {
        let { data:res } = await this.axios.post(this.httpurl + "arbitrament/insert", qs.stringify(arbitrament));
        if (res.code === '0') {
          this.$toast.success('提交成功')
          typeArr.forEach(ele => {
            this[ele] = ''
          });
        }
      } catch (e) {
        this.$toast.fail('提交失败，请稍后重试')
      }
    },
    back() {
      this.$router.go(-1)
    }
  }
};
</script>
<style lang='less' scoped>
.consultation {
  box-sizing: border-box;
  padding: 0.27rem;
}
.titleWapper {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 50px;
  margin-top: 20px;
  // border: 1px solid #000;
  margin-bottom: 20px;
  .title {
    margin: 0;
    padding: 0;
    font-size: 20px;
    text-align: center;
    line-height: 50px;
  }
}
.btnWapper {
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
  margin-bottom: 1.5rem;
  .btn {
    width: 100px;
  }
}
</style>
