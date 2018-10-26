<template>
  <div>
    <section class='main-content'>
      <div class="coupon-cover">
        <img :src='headImg'>
      </div>
      <div class="coupon-wrap">
        <div class="coupon-nav">
          <img :src="manOne" alt="">
          <h3>有两种方法获取优惠券哦！</h3>
        </div>
        <div class="coupon-content">
          <div class="desktop">
            <div class="link">
              <div class="link-content">
                <h4>1.下载/打印最新优惠券</h4>
                <a href="#">
                  <i :class='icon[0]'></i>
                </a>
              </div>
            </div>
          </div>
          <div class="mobile">
            <h4>2.手机优惠券</h4>
            <section class='step-1'>
              <div class="image">
                <img :src="manTwo" alt="">
                <img :src="qr" alt="">
              </div>
              <div class="text">
                <div class="num">
                  <i :class='icon[1]'></i><span>1</span>
                </div>
                <p v-text='message[0]'></p>
              </div>
            </section>

            <section class='step-2'>
              <div class="image">
                <img :src="phoneOne" alt="">
                <img :src="manThree" alt="">
              </div>
              <div class="text">
                <div class="num">
                  <i :class='icon[1]'></i><span>2</span>
                </div>
                <p v-text='message[1]'></p>
              </div>
            </section>

            <section class='step-3'>
              <div class="image">
                <img :src="manFour" alt="">
                <img :src="phoneTwo" alt="">
              </div>
              <div class="text">
                <div class="num">
                  <i :class='icon[1]'></i><span>3</span>
                </div>
                <p v-text='message[2]'></p>
              </div>
            </section>

            <section class='step-4'>
              <div class="image">
                <img :src="phoneThree" alt="">
                <img :src="manFive" alt="">
              </div>
              <div class="text">
                <div class="num">
                  <i :class='icon[1]'></i><span>4</span>
                </div>
                <p v-text='message[3]'></p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import headImg from "../assets/images/cover_mobile.jpg";
import manOne from "../assets/images/man-1.png";
import manTwo from "../assets/images/man-2.png";
import manThree from "../assets/images/man-3.png";
import manFour from "../assets/images/man-4.png";
import manFive from "../assets/images/man-5.png";
import phoneOne from "../assets/images/phone-1.png";
import phoneTwo from "../assets/images/phone-2.png";
import phoneThree from "../assets/images/phone-3.png";
import qr from "../assets/images/qr.jpg";

export default {
  data() {
    return {
      headImg,
      manOne,
      manTwo,
      manThree,
      manFour,
      manFive,
      phoneOne,
      phoneTwo,
      phoneThree,
      qr,
      icon: ["iconfont icon-icon_yunxiazai", ["iconfont icon-xinaixin"]],
      message: [
        "扫一扫，关注麦当劳微信公众号，或者搜索McDonalds888；",
        "点击底部“优惠福利”菜单，选择“优惠券”；",
        "进入“优惠券”页面，领取你喜欢的优惠券；",
        "卡包”里可以找到你领取的优惠券，向店员出示即可使用，过期前还会收到提醒哦！"
      ]
    };
  }
};
</script>

<style lang='scss' scoped>
.text {
  width: 3.052rem;
  height: 0.532rem;
  padding: 0rem 0.25rem;
  .num {
    position: relative;
    float: left;
    span {
      position: absolute;
      left: 0.17rem;
      top: 0.1rem;
      color: white;
    }
  }
  p {
    margin-left: 0.6rem;
    color: #d8d8d8;
  }
}
.main-content {
  overflow-x: hidden;
  margin-top: 0.54rem;
  width: 3.752rem;
  height: 21.4565rem;
  background: #333333;
  .coupon-cover {
    width: 3.752rem;
    height: 1.5307rem;
    img {
      width: 3.752rem;
      height: 1.5307rem;
    }
  }
  .coupon-wrap {
    position: relative;
    width: 3.752rem;
    height: 19.5258rem;
    margin: 0 auto;
    padding: 0.4rem 0.2rem 0 0.2rem;
    background: #333;
    .coupon-nav {
      margin: 0 0.4rem;
      padding-left: 0;
      padding-bottom: 0.25rem;
      text-align: center;
      width: 3.352rem;
      height: 1.6525rem;
      border-bottom: 0.01rem solid #484848;
      img {
        width: 0.64rem;
        height: 1.3925rem;
        display: inline-block;
        float: left;
        margin-right: 0.35rem;
      }
      h3 {
        float: left;
        width: 1.55rem;
        height: 0.512rem;
        margin: 0;
        font-weight: 500;
        font-size: 0.22rem;
        line-height: 0.26rem;
        text-align: left;
        white-space: normal;
        margin-top: 0.4rem;
        color: #d8d8d8;
      }
    }
    .coupon-content {
      width: 3.352rem;
      height: 17.4732rem;
      .desktop {
        width: 3.352rem;
        height: 1.586rem;
        padding: 0.3rem 0;
        margin-bottom: 0.55rem;
        border-bottom: 0.01rem solid #484848;
        .link {
          width: 3.352rem;
          height: 0.976rem;
          .link-content {
            margin-left: 0.5rem;
            width: 2.3469rem;
            height: 0.976rem;
            h4 {
              margin-bottom: 0.2rem;
              font-size: 0.22rem;
              color: #d8d8d8;
              font-weight: 500;
            }
          }
        }
      }
      .mobile {
        width: 3.052rem;
        height: 15.3372rem;
        margin: 0 0.15rem;
        h4 {
          margin-bottom: 0.1rem;
          font-size: 0.22rem;
          color: #d8d8d8;
          font-weight: 500;
          text-align: center;
        }
        .step-1 {
          width: 3.052rem;
          height: 3.3595rem;
          padding: 0.35rem 0;
          border-bottom: 0.01rem solid #484848;

          .image {
            width: 3.052rem;
            height: 1.8495rem;
            text-align: center !important;
            margin-bottom: 0.25rem !important;
            img:first-child {
              width: 0.98rem;
              height: 1.8496rem;
              display: inline-block;
              float: left;
              margin-right: 0.35rem;
              margin-left: 0.1rem;
            }
            img:nth-child(2) {
              width: 1.25rem;
              height: 1.25rem;
              margin-top: 0.2rem;
            }
          }
        }
        .step-2 {
          width: 3.052rem;
          height: 3.429rem;
          border-bottom: 0.01rem solid #484848;
          padding: 0.35rem 0;
          .image {
            width: 3.052rem;
            height: 1.919rem;
            margin-bottom: 0.25rem;
            img:first-child {
              width: 1.4rem;
              height: 1.919rem;
              display: inline-block;
              float: left;
              margin-right: 0.29rem;
              margin-left: 0.2rem;
            }
            img:nth-child(2) {
              width: 0.82rem;
              height: 1.7441rem;
              margin-top: 0.2rem;
            }
          }
        }

        .step-3 {
          width: 3.052rem;
          height: 3.5291rem;
          border-bottom: 0.01rem solid #484848;
          padding: 0.35rem 0;
          .image {
            width: 3.052rem;
            height: 1.919rem;
            margin-bottom: 0.25rem;
            img:nth-child(1) {
              width: 0.55rem;
              height: 1.739rem;
              display: inline-block;
              float: left;
              margin-right: 0.6rem;
              margin-left: 0.2rem;
            }
            img:nth-child(2) {
              width: 1.4rem;
              height: 2.0191rem;
              margin-bottom: 0.1rem;
            }
          }
          .text {
            margin-top: 0.5rem;
          }
        }

        .step-4 {
          width: 3.052rem;
          height: 3.7036rem;
          border-bottom: 0.01rem solid #484848;
          padding: 0.35rem 0;
          .image {
            width: 3.052rem;
            height: 1.919rem;
            margin-bottom: 0.25rem;
            img:nth-child(1) {
              width: 1.35rem;
              height: 1.9956rem;
              display: inline-block;
              float: left;
              margin-right: 0.45rem;
              margin-left: 0.2rem;
            }
            img:nth-child(2) {
              width: 0.7rem;
              height: 1.8038rem;
              margin-top: 0.1rem;
            }
          }
          .text {
            margin-top: 0.5rem;
          }
        }
      }
    }
  }
}
</style>
