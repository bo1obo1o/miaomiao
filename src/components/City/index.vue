<template>
  <div class="city_body">
    <div class="city_list">
      <Loading v-if="isLoading" />
        <Scroller v-else ref="city_List">
          <div>
            <!-- 热门城市 -->
              <div class="city_hot">
                <h2>热门城市</h2>
                <ul class="clearfix">
                  <li v-for="item in hotList" :key="item.id" @click="handleToCity(item.nm , item.id)">
                    {{ item.nm }}
                  </li>
                </ul>
              </div>
              <!-- 城市列表 -->
              <div class="city_sort" ref="city_sort">
                <!-- 新数组形式为[ { index : 'A' , list : [{ nm : '阿城' , id : 123 }] } ] -->
                <div v-for="item in cityList" :key="item.index">
                  <h2>{{ item.index }}</h2>
                  <ul>
                    <li v-for="itemList in item.list" :key="itemList.id" @click="handleToCity(itemList.nm , itemList.id)">
                      {{ itemList.nm }}
                    </li>
                  </ul>
                </div>
              </div>
          </div>
        </Scroller>
    </div>
    
    <!-- 右侧字母索引 -->
    <div class="city_index">
      <ul>
        <li
          v-for="(item, index) in cityList"
          :key="item.index"
          @touchstart="handleToIndex(index)"
        >
          {{ item.index }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "City",
  data() {
    return {
      cityList: [],
      hotList: [],
      isLoading : true
    };
  },
  mounted() {
        var cityList = window.localStorage.getItem('cityList');
        var hotList = window.localStorage.getItem('hotList');

        if(cityList && hotList){
            this.cityList = JSON.parse(cityList);
            this.hotList = JSON.parse(hotList);
            this.isLoading = false;
        }else{
            this.axios.get("/dianying/cities.json").then((res) => {
            var cities = res.data.cts;
            this.isLoading = false;
            //将获取到的城市数据分为数组[ { index : 'A' , list : [{ nm : '阿城' , id : 123 }] } ]
            var { cityList, hotList } = this.formatCityList(cities);
            //用formatCityList函数的返回值对列表赋值
            this.cityList = cityList;
            this.hotList = hotList;
            //数据获取成功后保存在本地，以字符串形式的数组结构保存
            window.localStorage.setItem('cityList' , JSON.stringify(cityList));
            window.localStorage.setItem('hotList' , JSON.stringify(hotList));
            });
          }

    
  },
  methods: {
    formatCityList(cities) {
      var cityList = [];
      var hotList = [];
      //热门城市列表
      for (var i = 0; i < cities.length; i++) {
        if (cities[i].isHot === 1) {
          hotList.push(cities[i]);
        }
      }
      //城市列表
      for (var i = 0; i < cities.length; i++) {
        var firstLetter = cities[i].py.substring(0, 1).toUpperCase();
        //toCom函数判断首字母是否已存在
        if (toCom(firstLetter)) {
          //如果首字母不存在，新添加index
          //新数组形式为[ { index : 'A' , list : [{ nm : '阿城' , id : 123 }] } ]
          cityList.push({
            index: firstLetter,
            list: [{ nm: cities[i].nm, id: cities[i].id }],
          });
        } else {
          //如果首字母已存在，累加到已有index中
          //新数组形式为[ { index : 'A' , list : [{ nm : '阿城' , id : 123 }] } ]
          for (var j = 0; j < cityList.length; j++) {
            if (cityList[j].index === firstLetter) {
              cityList[j].list.push({ nm: cities[i].nm, id: cities[i].id });
            }
          }
        }
      }
      //对城市列表首字母进行排序
      cityList.sort((n1, n2) => {
        if (n1.index > n2.index) {
          return 1;
        } else if (n1.index < n2.index) {
          return -1;
        } else {
          return 0;
        }
      });

      //判断城市首字母是否已存在
      function toCom(firstLetter) {
        for (var i = 0; i < cityList.length; i++) {
          //新数组形式为[ { index : 'A' , list : [{ nm : '阿城' , id : 123 }] } ]
          if (cityList[i].index === firstLetter) {
            return false;
          }
        }
        return true;
      }
      //将结果返回
      return {
        cityList,
        hotList,
      };
    },
    //点击右侧大写字母跳转到城市列表指定位置
    handleToIndex(index) {
      var h2 = this.$refs.city_sort.getElementsByTagName("h2");
      console.log(h2[index]);
      //document.body.scrollTop网页被卷去的高;
      //offsetTop:当前对象到其上级层顶部的距离.
      //例如点击F，城市列表的父节点就卷去F到顶层的距离
      this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop;
    },
    //为城市名添加点击事件
    handleToCity(nm,id){
      //调用mutation下的方法，传入城市名和id，改变state的nm和id
      this.$store.commit('city/CITY_INFO',{ nm , id });
      //将目前的城市存入localStorage
      window.localStorage.setItem('nowNm',nm);
      window.localStorage.setItem('nowId',id);
      //点击城市后切换到指定路由
      this.$router.push('/movie/nowPlaying');
    }
  },
};
</script>

<style scoped>
#content .city_body {
  margin-top: 45px;
  display: flex;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
}
.city_body .city_list {
  flex: 1;
  overflow: auto;
  background: #fff5f0;
}
.city_body .city_list::-webkit-scrollbar {
  background-color: transparent;
  width: 0;
}
.city_body .city_hot {
  margin-top: 20px;
}
.city_body .city_hot h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
.city_body .city_hot ul li {
  float: left;
  background: #fff;
  width: 29%;
  height: 33px;
  margin-top: 15px;
  margin-left: 3%;
  padding: 0 4px;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  line-height: 33px;
  text-align: center;
  box-sizing: border-box;
}
.city_body .city_sort div {
  margin-top: 20px;
}
.city_body .city_sort h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
.city_body .city_sort ul {
  padding-left: 10px;
  margin-top: 10px;
}
.city_body .city_sort ul li {
  line-height: 30px;
  line-height: 30px;
}
.city_body .city_index {
  width: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border-left: 1px #e6e6e6 solid;
}
</style>

