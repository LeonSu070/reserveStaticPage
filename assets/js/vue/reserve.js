axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.auth = {username: 'website',password: '8Ukd34KLSws'}
Vue.prototype.$http = axios

const app = new Vue({
  el: '#reserve-form',
  data: {
    errors: [],
    user_name: null,
    mobile: null,
    company_name: null,
    province_city: null,
    address_detail: null,
    vcode: null,
    sample_name: null,
    sample_amount: null,
    sample_description: null,
    special_note: null,
    order_type: null,
    order_date: null,
    order_time: null,
  },
  methods: {
    checkForm: function (e) {
      e.preventDefault();
      var params = new URLSearchParams();
      params.append('user_name', this.user_name);
      params.append('mobile', this.mobile);
      params.append('company_name', this.company_name);
      params.append('province', this.province_city);
      params.append('city', this.province_city);
      params.append('address_detail', this.address_detail);
      params.append('vcode', this.vcode);
      params.append('sample_name', this.sample_name);
      params.append('sample_amount', this.sample_amount);
      params.append('sample_description', this.sample_description);
      params.append('special_note', this.special_note);
      params.append('order_type', this.order_type);
      params.append('order_date', this.order_date);
      params.append('order_time', this.order_time);

      this.$http.post(
        'http://reserveapi.iyouhi.com/reserve/add_order',
        params
      ).then(function (response) {
        console.log(response)
      }).catch(function (error) {
           
      })
      alert("Done");
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
        console.log(response)
      }).catch(function (error) {
           
      })
      alert("DoneDone" + this.mobile);
      return false;
    }

  }
})