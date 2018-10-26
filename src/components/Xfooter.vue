<template>
  <section class='mobile-bottom-bar'>
    <ul>
      <li @click='touch(index)' v-for='(n,index) in arr' :key='index' :class='{orange:n.orange}'>
        <a>
          <i :class="n.icon"><span v-text='n.title'></span></i>
        </a>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  data() {
    return {
      page:0,
      arr:[
        {
          orange:false,
          icon:'iconfont icon-maidanglaomailesong',
          title:'麦乐送'
        },
        {
          orange:false,
          icon:'iconfont icon-youhuiquan',
          title:'优惠券'
        },
        {
          orange:true,
          icon:'iconfont icon-maidanglao',
          title:'回首页'
        },
        {
          orange:false,
          icon:'iconfont icon-ditu',
          title:'找餐厅'
        },
        {
          orange:false,
          icon:'iconfont icon-xiaozhishi',
          title:'小知识'
        },
      ]
    }
  },
  methods:{
    touch: function(index) {
        this.arr[index].orange=!this.arr[index].orange;
        for(var a = 0;a<this.arr.length;a++){
          if(a!=index){
            this.arr[a].orange=false
          }
        }
				switch(index){
					case 0:
					location.href="https://www.4008-517-517.cn/";
					break;
					case 1:
					location.href="#/Ycoupon";
					break;
					case 2:
					location.href="#/Yhome";
          break;
          case 4:
					location.href="#/Yknowledge";
					break;
				}
			}

  },
  mounted(){

  }
};
</script>

<style lang='scss' scoped>

.orange{
  .iconfont{
    color:orangered;
    span{
      color:orangered;
    }
  }
}


.iconfont {
  font-family: "iconfont"!important;
  font-size: 0.3rem;
  color: #ffc627;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.mobile-bottom-bar {
  height: 0.54rem;
  width: 3.753rem;
  //   display: none;
  position: fixed !important;
  left: 0;
  bottom: 0;
  font-size: 0;
  background: #1a1a1a;

  ul {
    li {
      width: 0.7504rem;
      height: 0.54rem;
      float: left;
      a {
        position: relative;
        display: block;
        width: 0.7504rem;
        height: 0.54rem;
        span {
          position: absolute;
          left: 0.2rem;
          bottom: 0.02rem;
          font-size: 0.12rem;
          color:#808080;
        }
      }
    }
  }
}
</style>
