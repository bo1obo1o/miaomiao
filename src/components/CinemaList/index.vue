<template>
  <div id="cinema_body">
    <Loading v-if="isLoading" />
        <Scroller v-else ref="city_List">
          <div>
          {{cinemaList}}
          </div>
        </Scroller>
  </div>
</template>

<script>
export default {
  name: "CinemaList",
  data() {
    return {
      cinemaList: null,
      isLoading : true,
      prevCityId:-1
    };
  },
  methods:{
    //返回的是一个html页面的内容，本质还是一个字符串，因此可以使用字符串的方法来处理
    decodeUnicode(str) {
      str = str.replace(/\\/g, "%");
      //转换中文
      str = unescape(str);
      //将其他受影响的转换回原来
      str = str.replace(/%/g, "\\");
      //对网址的链接进行处理
      str = str.replace(/\\n/g, "");
      str = str.replace(/\\t/g, "");
      str = str.replace(/\\/g, "");
      return str;
    }
  },
  activated() {
    var cityId = this.$store.state.city.id;
    if( this.prevCityId === cityId ){ return; }
    this.isLoading = true;
    this.axios
      .get("/ajax/moreCinemas?day=2020-10-13&offset=0&limit=20&districtId=-1&lineId=-1&hallType=-1&brandId=-1&serviceId=-1&areaId=-1&stationId=-1&item=&updateShowDay=true&reqId=1602572649162&cityId="+cityId+"&optimus_uuid=D809CFB0FF1111EA8BC79F146444EC44CD717BBEE4AB4708A27735547C47B6C0&optimus_risk_level=71&optimus_code=10")
      .then((res) => {
        document.getElementById('cinema_body').innerHTML = this.decodeUnicode(res.data);
        this.isLoading = false;
        this.prevCityId = cityId;
      });
  },
};
</script>

<style scoped>
#content .cinema_body {
  flex: 1;
  overflow: auto;
}
.cinema_body ul {
  padding: 20px;
}
.cinema_body li {
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 20px;
}
.cinema_body div {
  margin-bottom: 10px;
}
.cinema_body .q {
  font-size: 11px;
  color: #f03d37;
}
.cinema_body .price {
  font-size: 18px;
}
.cinema_body .address {
  font-size: 13px;
  color: #666;
}
.cinema_body .address span:nth-of-type(2) {
  float: right;
}
.cinema_body .card {
  display: flex;
}
.cinema_body .card div {
  padding: 0 3px;
  height: 15px;
  line-height: 15px;
  border-radius: 2px;
  color: #f90;
  border: 1px solid #f90;
  font-size: 13px;
  margin-right: 5px;
}
.cinema_body .card div.or {
  color: #f90;
  border: 1px solid #f90;
}
.cinema_body .card div.bl {
  color: #589daf;
  border: 1px solid #589daf;
}
</style>