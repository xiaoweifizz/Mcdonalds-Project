<template>
  <div>
    <section class='main-content'>
      <div class='block-wall'>
        <div v-for='n in imgArr' class='first-food'>
          <a href="#">
            <img :src="n.img">
            <div class="info">
              <h4 v-text='n.title'></h4>
              <time v-text='n.time'></time>
            </div>
          </a>
        </div>
        <div class='second-food'>
          <ul>
            <li v-for='m in oldArr'>
              <a href="#">
                <img :src="m.url" alt="">
                <h4 v-text='m.name' style='font-size:.15rem'></h4>
                <time></time>
              </a>
            </li>
            <li v-for='f in newArr'>
              <a href="#">
                <img :src="f.url" alt="">
                <h4 v-text='f.name' style='font-size:.15rem'></h4>
                <time></time>
              </a>
            </li>
          </ul>
          <button @click='getNews(num)'>
            <i class='iconfont icon-xia'></i>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// import $ from 'jquery'
import imgOne from "../assets/images/201809281641036905_640_398.jpg";
import imgTwo from "../assets/images/201809281738291138_640_398.jpg";

import $ from "jquery";
export default {
  data() {
    return {
      num:0,
      oldArr: [
        {
          url:
            "http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/photo_db/2018/10/17/201810171826095349/201810171826095349_640_480.jpg",
          name: "10元3翅，天天免单！"
        },
        {
          url:
            "http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/photo_db/2017/04/20/201704200035119069/201704200035119069_640_829.jpg",
          name: "i麦当劳小程序"
        },
        {
          url:
            "http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/photo_db/2018/10/18/201810181016411234/201810181016411234_640_480.jpg",
          name: "2018麦麦全席即将开席！更多绿色举措与创意料理驾到！"
        },
        {
          url:
            "http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/photo_db/2017/06/06/201706061844131759/201706061844131759_640_829.jpg",
          name: "优惠券"
        },
        {
          url:
            "http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/photo_db/2018/10/18/201810181015358980/201810181015358980_640_480.jpg",
          name: "【仅限上海】1000元礼券大放送！麦咖啡为你揭晓“上海最拼写字楼”！"
        },
        {
          url:
            "http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/photo_db/2017/06/27/201706271107157210/201706271107157210_640_829.jpg",
          name: "麦乐送：开始订餐"
        },
        {
          url:
            "http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/photo_db/2018/10/17/201810171831055413/201810171831055413_640_480.jpg",
          name: "开心乐园餐锦鲤是你吗？"
        },
        {
          url:
            "http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/photo_db/2018/10/12/201810121155035204/201810121155035204_640_480.jpg",
          name: "辣翅×3=10元。想免单？来答题！"
        }
      ],
      newArr: [],
      imgArr: [
        {
          img: imgOne,
          title: "限时优惠！麦辣鸡翅，10元3块！",
          time: "2018.09.28"
        },
        {
          img: imgTwo,
          title: "薯饼+薯饼=6元 | 吃完再去浪吧！",
          time: "2018.09.28"
        }
      ]
    };
  },
  methods: {
    getNews(num) {
      var self = this;
      this.num++
      console.log(this.num)
      if(this.num){
        $.ajax({
        type: "GET",
        url: "http://localhost:9999/homeData",
        async: true,
        data:{
          nowNum:this.num
        },
        success: function(data) {
          var Data = JSON.parse(data);
          var message = Data.message;
          var Message = JSON.parse(message);
          console.log(Message);
          self.newArr = self.newArr.concat(Message);
        }
      });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  margin: 0rem;
  padding: 0rem;
}
a {
  color: white;
}
.main-content {
  margin-top: .54rem;
  position: relative;
  width: 3.752rem;
  height: 100%;
  background: #1a1a1a;
  .block-wall {
    width: 3.752rem;
    height: 100%;
    .first-food {
      width: 3.552rem;
      height: 3.43rem;
      background: #333;
      margin: 0rem 0.1rem;
      margin-bottom: 0.1rem;
      position: relative;

      img {
        width: 3.552rem;
        height: 3.43rem;
      }
      .info {
        display: block;
        position: absolute;
        width: 3.552rem;
        height: 0.534rem;
        left: 0rem;
        bottom: 0rem;
        padding: 0.1rem;
        // padding-bottom: 17px;
        background: rgba(0, 0, 0, 0.3);
        box-sizing: border-box;
        h4 {
          display: block;
          width: 3.352rem;
          height: 0.264rem;
          font-size: 0.22rem;
          line-height: 0.264rem;
          color: white;
          margin-bottom: 0.03rem;
        }
        time {
          display: block;
          font-size: 0.12rem;
          line-height: 0.12rem;
          color: #fff;
        }
      }
    }

    .second-food {
      button {
        outline: none;
        margin-bottom: .6rem;
        display: block;
        border: none;
        margin-top: .6rem;
        margin-left: 0.07rem;
        width: 3.59rem;
        height: 0.9rem;
        background: #333333;
      }
      ul {
        height: 100%;

        li {
          float: left;
          width: 1.76rem;
          height: 3rem;
          margin-bottom: .1rem;
          margin-left: .08rem;
          // padding: .1rem;

          a {
            display: block;
            width: 1.726rem;
            height: 3rem;
            background: #333333;
            img {
              display: block;
              width: 1.726rem;
              // height: 1.3rem;
            }
            .info {
              width: 1.726rem;
              height: 0.384rem;
              position: relative;
              h4 {
                display: block;
                margin-top: 0.6rem;
                line-height: 0.19rem;
                text-align: center;
              }
              time {
                position: absolute;
                bottom: 0.3rem;
                left: 0.3rem;
                font-size: 0.14rem;
              }
            }
          }
        }
      }
    }
  }
}
</style>






