<template>

  <div class='box'>
    <section class='article-cover'>
      <img :src="headImg" alt="">
    </section>

    <!-- 悬浮计算器 -->
    <div class='fix-calculator animated slideInDown' v-show='isBlock'>
      <div class="fix-calculator-content">
        <div class='tit'>
          <i class='iconfont icon-jisuanqi'></i>
        </div>
        <ul>
          <li v-for='(n,index) in energy'>
            <span v-for='m in energy[index]' v-text='m'></span>
          </li>
        </ul>
      </div>
    </div>

    <!-- 主要内容 -->
    <div class='main-table'>
      <div class='share'>
        <a href="#">
          <i class='iconfont icon-weibo'></i>
        </a>
        <button>
          <i class='iconfont icon-xinaixin'></i>
          <span class='count' style='color:#F99D25;font-size:12px;line-height:29.6px'>77901</span>
        </button>
      </div>
      <h4>营养计算器</h4>
      <p class='tips'>饮食需要多样、搭配与适度，选择下方麦当劳美食，计算一餐麦当劳的营养信息，更好搭配你一天的膳食！</p>
      <table class='table-box'>
        <tbody>
          <tr>
            <td v-for='n in arr'>
              <span v-text='n.name'></span>
              <strong>
                {{n.num}}
                <i v-text='n.unit'></i>
              </strong>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="switch-box-wrapper">
      <div class="select">
        <span>
          已选中<i v-text='isSelect'></i>件商品
        </span>
        <button class='view-product-btn' v-show='isSelect>0' @click='goCar'>
          <i class='iconfont icon-sanjicaidan'></i>
          <span>添加至购物车</span>
        </button>
      </div>

      <!-- 开始选择种类 页面 -->
      <div class="switch-content">
        <div class="product-sort" v-show='isShowKinds'>
          <h3>开始选择种类</h3>
          <ul>
            <li v-for='(f,index) in kinds'>
              <a @click='getGoods(index)'>
                <div class="pic">
                  <img :src="f.kindsImg" alt="">
                </div>
                <div class="info" v-text='f.info'>
                </div>
              </a>
            </li>
          </ul>
        </div>

        <!-- 进入种类商品 页面 -->
        <div class="product-list" v-show='isShowDetails'>
          <a class='return' @click='goBack'>
            <i class='iconfont icon-fanhui'></i>
            <span>返回</span>
          </a>
          <div class="goods-list">
            <ul>
              <li v-for='(g,index) in goodsArr'>
                <a @click='changeBorder(g)' :class="{'border':g.isBorder}">
                  <div class="pic">
                    <img :src="g.src">
                  </div>
                  <div class="info" v-text='g.title'>
                  </div>
                  <div class='tips'>
                    <i class='iconfont icon-shandian'>
                      <span>能量约红薯3个</span>
                    </i>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- 进入加入购物车 页面 -->
        <div class="product-result-box" v-show='isGocar'>
          <ul>
            <li v-for='v in selectArr'>

              <div class="check-box">
                <input type="checkbox" v-model="v.isCheck" class="check" :id="v._id">
                <label @click='check' :class="v.isCheck ? 'iconfont icon-gou' :''" :for='v._id'></label>
              </div>
              <div class="pic">
                <img :src="v.src">
              </div>
              <div class="info">
                <a type='button'>
                  <p v-text='v.title'></p>
                </a>
                <div class="power">
                  <div class="popover-content">
                    <i class='iconfont icon-shandian'></i>
                    <span>每份能量约桃子2个</span>
                  </div>
                </div>
              </div>
              <div class="tool-box">
                <div class="choose-amount">
                  <a class='reduce'>-</a>
                  <input type="text" class='buy-num' value='1'>
                  <a class='add'>+</a>
                </div>
                <div class="select-box">
                  <span class='caret'>
                    <i class='iconfont icon-xiala'></i>
                  </span>
                  <select id="sel_1">
                    <option value="75">小</option>
                    <option value="76">中</option>
                    <option value="77">大</option>
                  </select>
                </div>
              </div>
            </li>

          </ul>
          <div class="btn-group">
            <button class="clear-result" @click='remove'>
              <i class='iconfont icon-cha'></i>
              <span>清除当前选中结果</span>
            </button>
            <button class='add-more'>
              <i class='iconfont icon-jian'></i>
              <span>添加更多美味</span>
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import headImg from "../assets/images/cover_desktop.png";
import $ from "jquery";
export default {
  data() {
    return {
      isSelect: 0, //选中多少件商品
      isShowDetails: false, //控制详情页出现或隐藏
      isShowKinds: true, //控制种类选择页面出现或隐藏
      isBlock: false, //控制查看选中商品按钮是否出现
      isGocar: false, //控制是否进入购物车
      headImg,
      arr: [
        {
          name: "能量",
          num: 0,
          unit: "千焦"
        },
        {
          name: "卡路里",
          num: 0,
          unit: "卡路里"
        },
        {
          name: "蛋白质",
          num: 0,
          unit: "克"
        },
        {
          name: "脂肪",
          num: 0,
          unit: "克"
        },
        {
          name: "碳水化合物",
          num: 0,
          unit: "克"
        },
        {
          name: "钠",
          num: 0,
          unit: "毫克"
        },
        {
          name: "钙",
          num: 0,
          unit: "毫克"
        }
      ],
      energy: [
        {
          name: "能量",
          num: 0,
          unit: "卡路里"
        },
        {
          name: "蛋白质",
          num: 0,
          unit: "克"
        },
        {
          name: "脂肪",
          num: 0,
          unit: "克"
        },
        {
          name: "碳水化合物",
          num: 0,
          unit: "克"
        }
      ],
      kinds: [
        {
          kindsImg:
            "http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2017/09/201709100206109796.png",
          info: "汉堡"
        },
        {
          kindsImg:
            "http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2017/09/201709100213403037.png",
          info: "小食"
        },
        {
          kindsImg:
            "http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2017/09/201709100209441235.png",
          info: "甜品"
        },
        {
          kindsImg:
            "http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2017/09/201709100213076144.png",
          info: "饮料"
        },
        {
          kindsImg:
            "http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2017/09/201709100209022602.png",
          info: "早餐"
        },
        {
          kindsImg:
            "http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2017/09/201709111311076055.png",
          info: "开心乐园餐"
        },
        {
          kindsImg:
            "http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2017/09/201709100214113828.png",
          info: "McCafé 咖啡"
        },
        {
          kindsImg:
            "http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2017/09/201709100213221426.png",
          info: "McCafé 亚洲茶饮品"
        },
        {
          kindsImg:
            "http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2017/09/201709100212548471.png",
          info: "McCafé 雪冰"
        },
        {
          kindsImg:
            "http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2017/09/201709100211511668.png",
          info: "McCafé 糕点"
        }
      ],
      goodsArr: [],
      selectArr: []
    };
  },
  methods: {
    getGoods(index) {
      var self = this;
      self.isShowKinds = false;
      self.isShowDetails = true;
      console.log(index);
      self.goodsArr = [];
      $.ajax({
        type: "GET",
        url: "http://localhost:9999/goodsData",
        async: true,
        data: {
          nowIndex: index
        },
        success: function(data) {
          var Data = JSON.parse(data);
          var message = Data.message;
          var Message = JSON.parse(message);
          Message.forEach(ele => {
            ele.isBorder = false;
          });
          self.goodsArr = self.goodsArr.concat(Message);

          //当重新选择种类的时候 要判断是否已经选择了已选中商品数组中的商品

          self.goodsArr.forEach(function(item){
              var b=self.selectArr.filter(function(a){
                return a._id === item._id
              })
            console.log(b)
          })
        }
      });
    },
    goBack() {
      var self = this;
      self.isShowKinds = true;
      self.isShowDetails = false;
    },
    changeBorder(g) {
      var self = this;
      g.isBorder = !g.isBorder;
      if ((g.isBorder = g.isBorder)) {
        //点击商品的时候数量+1
        self.isSelect = self.isSelect + 1;

        if (g.isBorder) {
          self.selectArr.push(g);
        } else {
          var index = self.selectArr.indexOf(g);
          if (index >= 0) {
            self.selectArr.splice(index, 1);
          }
        }
        console.log(self.selectArr);
      } else {
        self.selectArr.forEach(element => {
          element.isBorder === false;
        });
        self.selectArr = self.selectArr.filter(function(ele) {
          return ele.isBorder === true;
        });
        //点击商品的时候数量-1
        self.isSelect = self.isSelect - 1;
        console.log(self.selectArr);
      }
    },
    goCar() {
      var self = this;
      self.isGocar = true;
      self.isShowDetails = false;
      self.isShowKinds = false;
      // var selectFood = JSON.stringify(selectArr);
      // window.sessionStorage.setItem("isSelect", selectFood);
      // window.sessionStorage.getItem("isSelect");
    },
    check() {
      var self = this;
    },
    remove() {
      var self = this;
    }
  },
  //监听滚动距离实现出现计算器
  mounted() {
    var self = this;
    window.addEventListener("scroll", function(e) {
      // console.log(window.scrollY);
      if (window.scrollY >= 600) {
        self.isBlock = true;
      }
      if (window.scrollY < 600) {
        self.isBlock = false;
      }
    });
  }
};
</script>

<style scoped lang='scss'>
//改变选中商品的border
input {
  outline: none;
}

.border {
  border: 0.02rem solid #ffd43d !important;
}

.switch-box-wrapper {
  width: 3.752rem;
  height: 11.926rem;

  .select {
    width: 3.752rem;
    height: 0.516rem;
    padding: 0 0.2rem 0.1rem;
    margin-top: 0.3rem;
    > span {
      display: inline-block;
      width: 1.251rem;
      height: 0.416rem;
      color: #ccc;
      font-size: 0.13rem;
      line-height: 0.416rem;
      i {
        color: #ffd43d;
        font-size: 0.3rem;
      }
    }

    .view-product-btn {
      display: inline-block;
      outline-style: none;
      float: right;
      width: 1.39rem;
      height: 0.5rem;
      padding: 0 0.1rem;
      border: none;
      background: #333;
      color: #ffd43d;
      line-height: 0.5rem;
      i {
        margin-right: 0.05rem;
        font-size: 0.2rem;
      }
    }
  }

  .switch-content {
    width: 3.752rem;
    height: 11.41rem;
    .product-sort {
      // position:relative;
      width: 3.35rem;
      height: 11.41rem;
      margin: 0 0.2rem;
      padding-top: 30px;
      border-top: 0.01rem solid #484848;
      h3 {
        margin-bottom: 0.3rem;
        font-size: 0.22rem;
        color: #ffd43d;
        font-weight: 500;
      }
      ul {
        width: 3.352rem;
        height: 10.56rem;
        li {
          float: left;
          width: 1.676rem;
          height: 1.808rem;
          margin-bottom: 30px;
          padding-right: 10px;
          a {
            display: block;
            width: 1.576rem;
            height: 1.808rem;
            padding-top: 0.1rem;
            .pic {
              width: 1.576rem;
              height: 1.4rem;
              margin-bottom: 0.1rem;
              img {
                display: block;
                width: 1.55rem;
                height: 1.4rem;
                float: right;
              }
            }
            .info {
              width: 1.576rem;
              height: 0.208rem;
              line-height: 0.208rem;
              text-align: center;
              color: #d8d8d8;
              font-size: 0.14rem;
            }
          }
        }
      }
    }
    .product-list {
      background: #333;
      position: absolute;
      top: 7.58rem;
      left: 0rem;
      width: 3.352rem;
      // height: 18.554rem;
      padding-top: 0.3rem;
      border-top: 0.01rem solid #484848;
      margin: 0 0.2rem;
      // display:none;
      .return {
        display: inline-block;
        width: 0.74rem;
        height: 0.248rem;
        margin-bottom: 0.3rem;
        i {
          color: #ffd43d;
          font-size: 0.18rem;
        }
        span {
          display: inline-block;
          width: 0.32rem;
          height: 0.24rem;
          font-size: 0.16rem;
          color: #7f7f7f;
          margin-left: 0.05rem;
        }
      }
      .goods-list {
        width: 3.352rem;
        // height: 17.696rem;
        ul {
          width: 3.352rem;
          // height: 17.696rem;
          li {
            float: left;
            width: 1.676rem;
            height: 2.228rem;
            padding-right: 0.1rem;
            margin-bottom: 0.3rem;
            a {
              display: block;
              float: right;
              width: 1.576rem;
              height: 2.228rem;
              padding-top: 0.1rem;
              padding-bottom: 0.1rem;
              border: 2px solid transparent;
              .pic {
                width: 1.536rem;
                height: 1.4rem;
                margin-bottom: 0.1rem;
                img {
                  display: inline-block;
                  width: 1.536rem;
                  height: 1.0528rem;
                  float: right;
                }
              }
              .info {
                width: 1.576rem;
                height: 0.208rem;
                line-height: 0.208rem;
                text-align: center;
                color: #d8d8d8;
                font-size: 0.14rem;
              }
              .tips {
                width: 1.536rem;
                height: 0.18rem;
                i {
                  margin-left: 0.2rem;
                }
                span {
                  margin-left: 0.1rem;
                  display: inline-block;
                  font-size: 0.11rem;
                  color: #7f7f7f;
                  width: 0.8213rem;
                  height: 0.16rem;
                }
              }
            }
          }
        }
      }
    }
    .product-result-box {
      margin-bottom: 0.3rem;
      width: 3.752rem;
      // height: .9rem;
      ul {
        width: 3.752rem;
        margin: 0 auto 0.3rem;
        // height: .9rem;
        li {
          width: 3.752rem;
          height: 0.9rem;
          padding: 0.12rem 0.13rem 0;
          .check-box {
            float: left;
            width: 0.18rem;
            height: 0.18rem;
            margin-right: 0.13rem;
            margin-top: 0.08rem;
            vertical-align: top;
            .check {
              display: none;
            }
            label {
              display: inline-block;
              width: 0.18rem;
              height: 0.18rem;
              line-height: 0.18rem;
              background: #4c4c4c;
            }
          }
          .pic {
            float: left;
            vertical-align: top;
            margin-right: 0.15rem;
            width: 0.53rem;
            height: 0.76rem;
            img {
              display: inline-block;
              width: 0.53rem;
              height: 0.47rem;
              margin-top: 0.15rem;
            }
          }
          .info {
            float: left;
            // width: 0.72rem;
            height: 0.176rem;
            a {
              display: inline-block;
              height: 0.176rem;
              background: #333;
              text-decoration: none;
              outline: none;
              margin-left: 0.1rem;
              p {
                font-size: 0.12rem;
                color: #d8d8d8;
                background: #333333;
              }
            }

            .power {
              width: 1.4268rem;
              height: 0.304rem;
              margin-top: 0.1rem;
              .popover-content {
                width: 1.3868rem;
                height: 0.264rem;
                padding: 0.02rem 0.05rem;
                font-size: 0.12rem;
                color: #7f7f7f;
                background: #191919;
              }
            }
          }
          .tool-box {
            float: right;
            width: 0.8rem;
            height: 0.76rem;
            .choose-amount {
              width: 0.8rem;
              height: 0.25rem;
              border: 0.01rem solid #4d4d4d;
              a {
                display: inline-block;
                width: 0.24rem;
                height: 0.23rem;
                text-align: center;
                font-size: 0.16rem;
                color: #4c4c4c;
              }
              input {
                display: inline-block;
                width: 0.3rem;
                height: 0.23rem;
                text-align: center;
                font-size: 0.12rem;
                color: #fff;
                background: none;
                border: 0.01rem solid #4d4d4d;
                border-top: none;
                border-bottom: none;
              }
            }
            .select-box {
              position: relative;
              width: 0.8rem;
              height: 0.25rem;
              border: 0.01rem solid #4d4d4d;
              border-radius: 0;
              margin-top: 0.1rem;
              select {
                -webkit-appearance: none;
                position: absolute;
                left: 0;
                top: 0;
                display: inline-block;
                width: 0.8rem;
                height: 0.25rem;
                font-size: 0.11rem;
                color: #d8d8d8;
                padding-left: 55%;
                border: none;
                outline: none;
                background: none;
              }
            }
          }
        }

        li:nth-child(2n + 1) {
          background: #4c4c4c;
          .check-box {
            label {
              background: #333;
            }
          }
          .info {
            a {
              p {
                font-size: 0.12rem;
                color: #d8d8d8;
                background: #4c4c4c;
              }
            }
          }
          .tool-box {
            .choose-amount {
              border: 0.01rem solid #333;
              a {
                color: #333;
              }
              input {
                color: #fff;
                background: none;
                border: 0.01rem solid #333;
                border-top: none;
                border-bottom: none;
              }
            }
            .select-box {
              border: 0.01rem solid #333;
              border-radius: 0;
              margin-top: 0.1rem;
              select {
                color: #d8d8d8;
              }
            }
          }
        }
      }
      .btn-group {
        width: 3.752rem;
        height: 0.5rem;
        text-align: center;
        .clear-result {
          display: inline-block;
          vertical-align: middle;
          height: 0.5rem;
          width: 50%;
          border: 0.02rem solid #ffd43d;
          background: #333;
          outline-style: none;
          color: #ffd43d;
          font-size: 0.13rem;
        }
        .add-more {
          display: inline-block;
          vertical-align: middle;
          height: 0.5rem;
          width: 50%;
          border: none;
          background: #ffd43d;
          outline-style: none;
          font-size: 0.13rem;
        }
      }
    }
  }
}

ul,
li {
  list-style: none;
}

.icon-xinaixin:before {
  content: "\e609";
  color: #f99d25;
  font-size: 0.17rem;
}

.box {
  position: relative;
  margin-top: 0.54rem;
  width: 3.752rem;
  height: 25.7007rem;
  background: #333;
  .article-cover {
    width: 3.752rem;
    height: 1.5007rem;
    img {
      display: block;
      width: 3.752rem;
      height: 1.5007rem;
    }
  }
  //悬浮计算器
  .fix-calculator {
    z-index: 999;
    position: fixed;
    top: 0.54rem;
    left: 0rem;
    background: #ffd43d;
    width: 3.752rem;
    height: 0.9rem;
    .fix-calculator-content {
      width: 3.552rem;
      height: 0.9rem;
      margin: 0 0.1rem;
      position: relative;
      i {
        position: absolute;
        left: 0;
        top: 0.17rem;
      }
      ul {
        width: 3.172rem;
        height: 0.9rem;
        padding-top: 0.07rem;
        padding-bottom: 0.03rem;
        float: right;
        li {
          float: left;
          width: 0.793rem;
          height: 0.8rem;
          span:first-child {
            display: block;
            width: 0.793rem;
            height: 0.128rem;
            margin-bottom: 0.08rem;
            text-align: center;
            font-size: 0.13rem;
          }
          span:nth-child(2) {
            display: block;
            width: 0.793rem;
            height: 0.264rem;
            margin-bottom: 0.08rem;
            font-family: "AkzidenzGroteskBQCnd";
            line-height: 0.264rem;
            font-weight: 900;
            font-size: 0.24rem;
            text-align: center;
          }
          span:nth-child(3) {
            display: block;
            width: 0.793rem;
            height: 0.12rem;
            margin-bottom: 0.08rem;
            text-align: center;
            font-size: 0.13rem;
          }
        }
      }
    }
  }

  .main-table {
    width: 3.752rem;
    height: 5.266rem;
    padding: 0.25rem 0.2rem 0;
    .share {
      width: 3.352rem;
      height: 0.296rem;
      position: relative;
      text-align: right;
      button {
        outline-style: none;
        display: inline-block;
        border: none;
        width: 0.5871rem;
        height: 0.296rem;
        background: #333333;
      }
    }
    h4 {
      width: 3.352rem;
      height: 0.28rem;
      font-size: 0.28rem;
      margin-bottom: 0.3rem;
      color: #f99d25;
      font-weight: 500;
    }
    p {
      display: block;
      width: 3.352rem;
      height: 0.588rem;
      color: #d9d9d9 !important;
      font-size: 0.1rem;
      //   margin-bottom: 0.3rem;
      border-bottom: 0.01rem solid #ccc;
    }
    .table-box {
      width: 3.352rem;
      height: 3.544rem;
      tbody {
        overflow: hidden;
        table-layout: fixed;
        margin: 0;
        border: none;
        border-collapse: collapse;
        width: 3.352rem;
        height: 3.544rem;
        tr {
          width: 3.552rem;
          height: 3.544rem;
          td {
            display: block;
            position: relative;
            text-align: left;
            line-height: 0.45rem;
            border-left: none !important;
            border-right: none !important;
            border-top: none !important;
            border-bottom: 0.01rem solid #4c4c4c !important;
            width: 3.352rem;
            height: 0.506rem;
            background: #262626;
            span {
              display: inline-block;
              width: 1.3407rem;
              height: 0.496rem;
              margin-left: 0.15rem;
              font-size: 0.16rem;
              color: #ccc;

              font-weight: 700;
            }
            strong {
              display: inline-block;
              margin-left: 1rem;
              width: 0.8029rem;
              height: 0.496rem;
              font-family: "AkzidenzGroteskBQCnd";
              font-size: 0.22rem;
              line-height: 0.49rem;
              color: #ccc;
              i {
                display: inline-block;
                width: 0.45rem;
                height: 0.448rem;
                font-size: 0.15rem;
                text-align: right;
                color: #ccc;
              }
            }
          }
          td:nth-child(2n) {
            background: #333;
          }
        }
      }
    }
  }
}
</style>
