<template>
  <div class="meetingEnroll">

    <van-cell-group class="meeting">
      <van-cell 
        title="报名会议：" 
        required
        clearable />
      <van-checkbox-group 
        v-model="formMeeting.type">
        <van-checkbox 
          class="meeting-checkbox"
          v-for="(item,index) in ACTIVITY_SESSION2" 
          :key="index"
          :name="item" 
          shape="square">{{item}}</van-checkbox>
      </van-checkbox-group>
      <!-- <van-field class="tip" :error-message="errorMsg.type"></van-field> -->
    </van-cell-group>

    <van-cell-group class="contact">
      <van-field
        type="text"
        placeholder="请输入联系人姓名"
        label="联系人姓名："
        required
        clearable
        v-model="formMeeting.name"
        :error-message="errorMsg.name"
        @click-icon="formMeeting.name = ''"
        icon="clear"></van-field>
    </van-cell-group>

    <van-cell-group class="positions">
      <van-field
        type="text"
        placeholder="请输入职务"
        label="职务："
        required
        clearable
        v-model="formMeeting.position"
        :error-message="errorMsg.position"
        @click-icon="formMeeting.position = ''"
        icon="clear"></van-field>
    </van-cell-group>

    <van-cell-group class="phone">
      <van-field
        type="tel"
        placeholder="请输入移动电话"
        label="移动电话："
        required
        clearable
        v-model="formMeeting.phone"
        :error-message="errorMsg.phone"
        @click-icon="formMeeting.phone = ''"
        icon="clear"></van-field>
    </van-cell-group>

    <van-cell-group class="mailbox">
      <van-field
        type="text"
        placeholder="请输入邮箱"
        label="邮箱："
        clearable
        v-model="formMeeting.mailbox"
        :error-message="errorMsg.mailbox"
        @click-icon="formMeeting.mailbox = ''"
        icon="clear"></van-field>
    </van-cell-group>

    <van-cell-group class="purpose">
      <van-field
        type="textarea"
        placeholder="请输入考察意向"
        label="考察意向："
        clearable
        v-model="formMeeting.purpose"
        :error-message="errorMsg.purpose"
        @click-icon="formMeeting.purpose = ''"
        icon="clear"></van-field>
    </van-cell-group>    

    <van-cell-group class="supplement">
      <van-field
        type="textarea"
        placeholder="请输入补充内容"
        label="其他需求及需要补充的内容："
        clearable
        v-model="formMeeting.supplement"
        :error-message="errorMsg.supplement"
        @click-icon="formMeeting.supplement = ''"
        icon="clear"></van-field>
    </van-cell-group>

    <div class="pad-all mar-top" v-if="formMeeting.STATE==0">
      <van-button
          block
          type="primary"
          @click="onSubmitMeeting">
        提交报名
      </van-button>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import validator from '../../../util/validator.js'
import { Tag, Image, Icon, List, Field, CellGroup, Cell, Button, Toast, Checkbox, CheckboxGroup } from "vant";
export default {
  name: "MeetingEnroll",
  components: {
    [Tag.name]: Tag,
    [Image.name]: Image,
    [Icon.name]: Icon,
    [List.name]: List,
    [Field.name]: Field,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [CellGroup.name]: Cell,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
  },

  data() {
    return {
      ACTIVITY_SESSION2: [],  //经贸会议报名数组
      // 经贸会议报名
      formMeeting: {
        type: [],   //报名会议是否选中
        name: '',   //联系人姓名
        position: '',   //职务
        STATE: '',  //是否可以提交报名
        phone: '',  //移动电话
        mailbox: '',  //邮箱
        purpose: '',  //考察意向
        supplement: '', //其他需求及需要补充的内容
        EXHIBITORS_ID: '' //id
      },

      formData: {     //类似于data
        ACTIVITY_SESSION: '', //报名会议是否选中
        EXHIBITORS_ID: '',  //id
        TRADE_ID: '',
        ENTERPRISE_ID: '',
        TYPE: '',
        SCHEDULED_VENUES: '',
        ORGANIZATION_NAME: '',
        ORGANIZATION_ADDRESS: '',
        CONTACTS: '',   //联系人姓名
        TELEPHONE: '',
        MAILBOX: '',  //邮箱
        EXHIBITION_BOOTH: '',
        AUDIT_OPINION: '',
        STATE: '',  //是否可以提交报名
        TRADE_TYPE: '',   //表示tabs索引值
        POSITION: '', //职务
        MOBILE: '',   //移动电话
        FAX: '',
        PERSON_NUM: '',
        BOOTH_NUM: '',
        DISPLAY_CONTENT: '',
        GOODS_LIST: '',
        QUALIFICATION: '',
        GOODS_PICTURE: '',
        PUBLICITY_PICTURE: '',
        INSPECTION_INTENTION: '',   //考察意向
        OTHER: '',    //其他需求及需要补充的内容
        GOODS_CATEGORY: '',
        BOOTH: '',
        AUDIT_DATE: ''
      },

      errorMsg: {
        type: [],   //报名会议是否选中
        name: '',   //联系人姓名
        position: '',   //职务
        STATE: '',  //是否可以提交报名
        phone: '',  //移动电话
        mailbox: '',  //邮箱
        purpose: '',  //考察意向
        supplement: '', //其他需求及需要补充的内容
        EXHIBITORS_ID: '' //id
      },

      rules: {
        // type: [
        //   {
        //     validator: (rule, value, callback) => {
        //       if (value.length == 0) {
        //         callback('请选择会议场次');
        //       }
        //     }
        //   }
        // ],
        name: [
          {required: true, message: '请输入联系人姓名'}
        ],
        position: [
          {required: true, message: '请输入职务'}
        ],
        phone: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback('请输入手机号码');
              } else if (/^[1][0-9]{10}$/.test(value)) {
                callback();
              } else {
                callback('请输入正确的手机号码');
              }
            }
          }
        ]
      },
    }
  },
  methods: {
    /**
     * 清除验证提示
     * @param attrs
     */
    resetField(attrs) {
      attrs = !attrs ? Object.keys(this.errorMsg) : ( Array.isArray(attrs) ? attrs : [attrs]);
      attrs.forEach(attr => {
        this.errorMsg[attr] = ''
      })
    },
    /**
     * 验证方法
     * @param callback
     * @param data
     */
    validate(callback, data) {
      this.validator.validate((errors, fields) => {
        this.resetField();
        if (errors) {
          fields.forEach(item => {
            this.errorMsg[item.field] = item.message
          })
        }
        callback && callback(errors, fields)
      }, data);
    },

    // 表单提交
    onSubmitMeeting() {
      if (this.formMeeting.type.length === 0) {
        this.$toast('*为必填项')
        return
      }
      this.validate((errors, fields) => {
        if (!errors) {
          this.formData.MAILBOX = this.formMeeting.mailbox; //邮箱
          this.formData.CONTACTS = this.formMeeting.name;   //联系人姓名
          this.formData.MOBILE = this.formMeeting.phone;    //移动电话
          this.formData.POSITION = this.formMeeting.position;   //职务
          this.formData.INSPECTION_INTENTION = this.formMeeting.purpose;  //考察意向
          this.formData.OTHER = this.formMeeting.supplement;  //其他需求及需要补充的内容
          this.formData.ACTIVITY_SESSION = this.formMeeting.type.join(","); //报名会议
          this.formData.EXHIBITORS_ID = this.formMeeting.EXHIBITORS_ID; //获取id
          this.formData.TRADE_TYPE = 2;   //获取选中类型

          this.save(2) //调用此函数
        }
      })
    },

    // 保存数值传给后台
    async save(type, ztype) {
      try {
        //提交报名信息
        let method = "insert";
        if (this.formData.EXHIBITORS_ID != '' && this.formData.EXHIBITORS_ID != null && typeof this.formData.EXHIBITORS_ID != "undefined") {
          method = "update";
        }
        let { data: res } = await this.axios.post(
          this.httpurl + 'exhibitor/' + method,
          qs.stringify(this.formData)
        );
        if (res.code == 0) {
          if (type == 2) {
            this.formMeeting.EXHIBITORS_ID = res.data
          }
          this.$toast.success("保存成功！");

          setTimeout(()=> {
            this.$router.push({name: 'exhibitionDetails', params: {TRADE_ID:this.tempObject.TRADE_ID}})
          },2000)

        } else if (res.code == 1) {
          this.$toast.fail("获取模版信息出错！");
        }
      } catch (error) {
        this.$toast.loading("请求服务器无响应，稍后再试！");
      }
    },

    // 获取企业是否已经报名
    async getInfoSignUp(type,ztype) {
      try {
        let { data: res } = await this.axios.post(
          this.httpurl + "exhibitor/get",
          qs.stringify({
            TRADE_ID: this.tempObject.TRADE_ID,
            TRADE_TYPE: type,
          })
        );
        if (res.code == 0) {
          // this.tempObject.getInitData = res.data; //将初始化的数据赋值于getInitData对象
          if (res.data) {
            this.dataToForm(type, res.data.TYPE, res.data);
          }
        } else if (res.code == 1) {
          this.$toast.fail("获取报名信息出错！");
        }
      } catch (error) {
        console.log(error);
        this.$toast.loading("请求服务器无响应，稍后再试！");
      }
    },

    // 获取初始化数据并赋值
    dataToForm(type, stype, data) {
      if (type == 2) {
        this.formMeeting.mailbox = data.MAILBOX;  //邮箱
        this.formMeeting.STATE = data.STATE;    //是否报名 
        this.formMeeting.name = data.CONTACTS;  //联系人姓名
        this.formMeeting.phone = data.MOBILE;   //移动电话
        this.formMeeting.position = data.POSITION;    //职务
        this.formMeeting.purpose = data.INSPECTION_INTENTION;   //考察意向
        this.formMeeting.supplement = data.OTHER;   //其他需求及补充内容
        this.formMeeting.EXHIBITORS_ID = data.EXHIBITORS_ID;  //获取id
        if (data.ACTIVITY_SESSION) {  //是否有选中的会议
          this.formMeeting.type = data.ACTIVITY_SESSION.split(",")
        }
      }
    }

  },
  created() {
    this.validator = validator(this.rules, this.formMeeting);
  },

  computed: {
    tempObject() {
      return this.$store.state.tempObject
    }
  },

  mounted() {
    this.ACTIVITY_SESSION2 = this.tempObject.ACTIVITY_SESSION2; //获取字段并赋值
    this.getInfoSignUp(2);  // 获取企业是否已经报名
  }

};


</script>
<style lang='less' scoped>
  .meetingEnroll {
    .meeting {
      .meeting-checkbox {
        margin: 0.2rem 0
      }
    }
  }
</style>
