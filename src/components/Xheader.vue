<template>
  <header>
    <div class='inner-wrap'>
      <div class="inner">
        <h1>
          <a href="#/Yhome">
            <img src="http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/files/css/img/logo.gif">
          </a>
        </h1>
        <nav class='main-nav' :class='{transition:isNavShow}'>
          <button class="close"><i @click="toggle" class="iconfont icon-x"></i></button>
          <ul class='menu-ul'>
            <li v-for='(n,index) in arr' :key='index' class='fl menu-1' :class="n.isShow ? 'animated slideInUp' :''">
              <a class="disabled" href="javascript:;">
                <span @click="changeYellow(index)" >
                  <i :class='[n.icon,{changeYellow:n.isShow}]'></i><br>
                  <p :class='{changeYellow:n.isShow}'>{{n.name}}</p>
                </span>
              </a>
              <div class='sub-inner' v-show='n.isShow'>
                <ul class=''>
                  <li v-for='a in Arr[index]'>
                    {{a}}
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </nav>
        <button @click="toggle" class="menu-toggle">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

    </div>
  </header>

</template>

<script>
export default {
  data() {
    return {
      page: -1,
      isNavShow: false,
      show: false,
      isHideIndex:-1,
      arr: [
        {
					isShow: false,
          icon: "iconfont icon-maidanglao3",
          name: "麦当劳"
        },
        {
					isShow: false,
          icon: "iconfont icon-iconcopy",
          name: "爱美食"
        },
        {
					isShow: false,
          icon: "iconfont icon-icon-test",
          name: "爱品质"
        },
        {
					isShow: false,
          icon: "iconfont icon-chengchangzhi",
          name: "爱成长"
        }
      ],
      Arr:[
        ['关于我们','中国发展','加入麦当劳','企业社会责任','媒体中心','常见问题','品牌活动'
        ],
        ['经典餐单','McCafe','便捷服务','麦当劳会员','未来体验','当期新品优惠'],
        ['汉堡研究所','从农场到餐桌','信息公示'],
        ['爱成长','开心乐园餐','点亮梦想','开心生日会','麦麦体验营','为爱麦跑','麦麦童乐会']
      ]
    };
  },
  methods: {
    toggle: function() {
      this.isNavShow = !this.isNavShow;
    },
    changeYellow: function(index) {
      this.arr[index].isShow = !this.arr[index].isShow;
      for(var i = 0; i < this.arr.length; i++) {
							if(i != index) {
								this.arr[i].isShow = false
							}
						}

    }
  }
};
</script>

<style scoped lang='scss'>
.transition {
  transform: translateY(6.672rem);
}

.appear {
  display:block;
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 0.5rem;
  color: #7f7f7f;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.icon-maidanglao3 {
  margin-left: 0rem;
}

i.changeYellow {
  color: #ffc627;
}
p.changeYellow {
  color: #ffc627;
}
header {
  position: fixed;
  top: 0rem;
  left: 0rem;
  z-index: 100000;
}

header .inner-wrap {
  /* overflow: hidden; */

  display: block;
  position: relative;
  width: 3.752rem;
  height: 0.54rem;
  background: #000;
  border-bottom: 0.01rem solid #717171;
  z-index: 7000;
}
header .inner-wrap .menu-toggle {
  /* display: none; */
  position: absolute;
  width: 0.53rem;
  height: 0.53rem;
  left: 0rem;
  top: 0rem;
  padding: 0.14rem 0rem;
  box-sizing: border-box;
}
button {
  background: none;
  border: none;
  outline: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  -ms-appearance: none;
  appearance: none;
}
header .inner-wrap .menu-toggle span {
  display: block;
  width: 0.25rem;
  height: 0.03rem;
  margin: 0rem auto 0.05rem auto;
  background: #7f7f7f;
  border-radius: 0.05rem;
}
header h1 {
  overflow: hidden;
  display: block;
  position: absolute;
  width: 2.24rem;
  height: 0.53rem;
  left: 0.8rem;
  top: 0rem;
  z-index: 100;
}
header h1 a {
  display: block;
  position: relative;
  height: 1.2rem;
  overflow: hidden;
  /* transition: margin .3s ease-out; */
}
header h1 img {
  display: block;
  position: relative;
  position: absolute;
  top: -0.33rem;
  left: 0rem;
  width: 2.24rem;
  height: 1.2rem;
}
img {
  vertical-align: middle;
  border: 0rem;
}

header .main-nav {
  position: absolute;
  /* position: relative; */
  width: 3.752rem;
  height: 6.672rem;
  left: 0rem;
  top: -6.672rem;
  background: rgba(0, 0, 0, 0.9);
  z-index: 1000000;
  transition: all 1.5s ease;
}

header .main-nav .close {
  width: 0.7rem;
  height: 0.7rem;
  position: absolute;
  right: 0rem;
  top: 0rem;
  line-height: 0.5rem;
}

header .main-nav > ul {
  
  padding: 0rem 0.36rem;
  position: absolute;
  width: 3.752rem;
  max-height: 80%;
  top: 50%;
  left: 0rem;
  overflow: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  transform: translate(0, -50%);
}
header .main-nav > ul > li {
  transition-delay: 2s;
  list-style: none;
  padding: 0rem 0rem;
  width: 3.032rem;
  /* height: 1.21rem; */
  margin-top: 0.3rem;
  /* margin-bottom: .3rem; */

  // border-bottom: 0.01rem solid white;
}

header .main-nav > ul > li > a {
  display: block;
  /* margin-bottom: .2rem; */
  position: relative;
  width: 3.032rem;
  height: 1.092rem;
  color: #7f7f7f;
  text-align: center;
  font-size: 0rem;
  z-index: 500;
  border-bottom: 1px solid white;
}

header .main-nav > ul > li > a > span {
  margin-top: 0.25rem;
  display: inline-block;
  vertical-align: middle;
  font-size: 0.14rem;
  line-height: 0.14rem;
}

header .main-nav > ul > li > a > span p:nth-child(3) {
  margin-top: 0.2rem;
  display: inline-block;
  vertical-align: middle;
}

* {
  margin: 0rem;
  padding: 0rem;
}


*{
  ul,li{
    list-style: none;
  }
}

.main-nav {
  .menu-ul {
    .menu-1 {
      .sub-inner {
        width: 3.032rem;
        height: 3.35rem;
        transition: all 1s ease;
        ul{
          width: 3.032rem;
          height: 3.45rem;
          li{
            width: 3.032rem;
            height: .47rem;
            border-bottom:1px solid #ccc;
            color:white;
            line-height: .47rem;
            font-size: 14px;
            text-indent: .1rem;
          }
        }
      }
    }
  }
}
</style>