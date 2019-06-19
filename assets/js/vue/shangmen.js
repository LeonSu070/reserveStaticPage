axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.auth = {username: 'website',password: '8Ukd34KLSws'}
Vue.prototype.$http = axios
Vue.prototype.$domain = "http://reserveapi.aiyohey.com"
//Vue.component('v-distpicker', VDistpicker);


const app = new Vue({
  el: '#reserve-form',
  components: {
      VDistpicker
  },
  data: {
    errors: [],
    user_name: "",
    memberid: "",
    mobile: "",
    id_number: "",
    company_name: "",
    province: "北京市",
    city: "北京城区",
    area: "朝阳区",
    address_detail: "",
    vcode: "",
    sample_name: "",
    sample_amount: "",
    sample_description: "",
    special_note: "",
    order_type: "1",
    order_date: "",
    order_time: "0",

    totalTime: 60,
    vcodebutton: "获取验证码",
    btndisabled: false,
    options: [],
  },

  methods: {
    checkForm: function (e) {
      if (!this.user_name) {
        alert('请填写姓名');
        return false;
      }
      if (!this.address_detail) {
        alert('请填写详细地址');
        return false;
      }
      if (this.province == "省" || this.city == "市" || this.area == "区") {
        alert("请将所在地区补充完整");
        return false;
      }
      if (!this.id_number || (!(/\d{17}[\d|x]|\d{15}/).test(this.id_number) || (this.id_number.length !== 15 && this.id_number.length !== 18))) {
        alert('请填写正确的身份证号');
        return false;
      } 
      if (!this.mobile || (!(/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/).test(this.mobile))) {
        alert('请填写正确的手机号');
        return false;
      }
      if (this.sample_amount<=0) {
        alert('样品件数必须大于0');
        return false;
      }
      if (!this.sample_description) {
        alert('请填写样品描述');
        return false;
      }
      if (!this.order_date) {
        alert('请选择日期');
        return false;
      }
      if (!this.order_time) {
        alert('请选择时间');
        return false;
      }
      if (this.order_time == "今日预约已满") {
        alert(this.order_time);
        return false;
      }

      var params = new URLSearchParams();
      params.append('user_name', this.user_name);
      params.append('memberid', this.memberid);
      params.append('mobile', this.mobile);
      params.append('id_number', this.id_number);
      params.append('company_name', this.company_name);
      params.append('province', this.province);
      params.append('city', this.city);
      params.append('area', this.area);
      params.append('address_detail', this.address_detail);
      params.append('vcode', this.vcode);
      params.append('sample_name', this.sample_name);
      params.append('sample_amount', this.sample_amount);
      params.append('sample_description', this.sample_description);
      params.append('special_note', this.special_note);
      params.append('order_type', this.order_type);
      params.append('order_time', this.order_date + " " + this.order_time);

      this.$http.post(
        this.$domain + '/reserve/add_order',
        params
      ).then(function (response) {
        if (response.data.code == 10000) {
          alert(response.data.message);
          //刷新页面
          location.reload();
        } else {
          alert(response.data.message);
        }
      }).catch(function (error) {
           
      })
      return false;
    },
    //获取验证码
    getVCode: function (e) { 
      this.btndisabled = true;
      var params = new URLSearchParams();
      params.append('mobile', this.mobile);
      this.$http.post(
        this.$domain + '/verify/send_verify_code?phone='+this.mobile,
        params
      ).then(function (response) {
        if (response.data.code == 10000) {
          app.cuntdown();
          alert("验证码已经发送");
        } else {
          app.btndisabled = false;
          alert("验证码发送失败");
        }
      }).catch(function (error) {
          app.btndisabled = false;
      })

      return false;
    },
    cuntdown: function () {
      //倒计时
      this.vcodebutton = this.totalTime + 's后重新发送' //这里解决60秒不见了的问题
      this.btndisabled = true
      let clock = window.setInterval(() => {
        this.totalTime--
        this.vcodebutton = this.totalTime + 's后重新发送'
        if (this.totalTime < 0) {     //当倒计时小于0时清除定时器
          window.clearInterval(clock)
          this.vcodebutton = '重新发送验证码'
          this.totalTime = 60
          this.btndisabled = false
        }
      },1000)
    },
    //地区选择
    areaSelected(data) {
      this.province = data.province.value;
      this.city = data.city.value;
      this.area = data.area.value;
    },

    checkTime: function (v) {
      //防止选日期时三次调用这里
      if ($("#probootstrap-date").val() != this.order_date || v) {
        this.order_date = $("#probootstrap-date").val();
        this.getTime()
      }
    },

    getTime: function() {
      var params = new URLSearchParams();
      params.append('order_date', this.order_date);
      params.append('order_type', this.order_type);
      
      this.$http.post(
        this.$domain + '/reserve/get_time',
        params
      ).then(function (response) {
        if (response.data.code == 10000) {  
          app.options = response.data.data;
        } else {
          alert(response.data.message);
          
        }
      }).catch(function (error) {
           
      })
    },

  }
})
//获取可预约时间
app.getTime();

