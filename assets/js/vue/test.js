axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.auth = {username: 'website',password: '8Ukd34KLSws'}
Vue.prototype.$http = axios
//Vue.component('v-distpicker', VDistpicker);


const app = new Vue({
  el: '#reserve-form',
  components: {
      VDistpicker
  },
  data: {
    errors: [],
    user_name: "苏行",
    mobile: "13321179308",
    company_name: "Leon",
    province: "省",
    city: "市",
    area: "区",
    address_detail: "王府花园",
    vcode: "8249",
    sample_name: "钻石",
    sample_amount: "200",
    sample_description: "非常好的",
    special_note: "无",
    order_type: "1",
    order_date: "2019-04-09",
    order_time: "8:00",
  },
  methods: {
    checkForm: function (e) {
      if (this.province == "省" || this.city == "市" || this.area == "区") {
        alert("请将所在地区补充完整");
        return false;
      }
      var params = new URLSearchParams();
      params.append('user_name', this.user_name);
      params.append('mobile', this.mobile);
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
        'http://reserveapi.iyouhi.com/reserve/add_order',
        params
      ).then(function (response) {
        if (response.data.code == 10000) {
          alert(response.data.message);
        } else {
          alert(response.data.message);
        }
      }).catch(function (error) {
           
      })
      return false;
    },
    //获取验证码
    getVCode: function (e) {
      var params = new URLSearchParams();
      params.append('mobile', this.mobile);
      this.$http.post(
        'http://reserveapi.iyouhi.com/verify/send_verify_code?phone='+this.mobile,
        params
      ).then(function (response) {
        if (response.data.code == 10000) {
          alert("验证码已经发送");
        } else {
          alert("验证码发送失败");
        }
      }).catch(function (error) {
           
      })
      
      return false;
    },
    //地区选择
    areaSelected(data) {
      this.province = data.province.value;
      this.city = data.city.value;
      this.area = data.area.value;
    },
    updateDateValue: function (e) {
      this.order_date = $("#probootstrap-date-departure").val();
    }

  }
})


function intervalUpdateDateValue(){
  app.updateDateValue();
}
setInterval(intervalUpdateDateValue,1000);
