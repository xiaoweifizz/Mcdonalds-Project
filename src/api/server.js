var express = require("express");
var request = require("request");
var cheerio = require("cheerio");
var mongo = require('./db.js');
const assert = require('assert');
var app = express();

app.all('*', function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header("Acczpoess-Control-Allow-Headers", "X-Requested-With");
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});
// *********************************首页***************************************

//爬虫首页的数据 存进数据库
app.get("/getHomeData", function (req, res) {

	res.append("Access-Control-Allow-Origin", "*")
	request('https://www.mcdonalds.com.cn', function (err, response, body) {
		var $ = cheerio.load(body);
		var arrImg = [];
		var arrTitle = [];
		$('.inner a img').each(function (i, e) {
			if ($(e).attr('_src')) {
				arrImg.push($(e).attr('_src'));
			}
		})

		$('.inner a .info h4').each(function (i, e) {
			arrTitle.push($(e).text());
		})
		var arr = [];
		for (var i = 0; i < arrImg.length; i++) {
			arr.push({
				url: arrImg[i],
				name: arrTitle[i]
			})
			console.log(arr)
		}

		mongo.insert({
			'collectionName': 'home', 'data': arr, 'callback': function (err, result1) {
				if (err) {
					console.log('出错了！')
					res.send(JSON.stringify({ result: false, message: '写入不到数据' }))
					return
				} else {
					console.log('成功写入数据')
				}
			}
		})

	})
})

//根据前段的要求 从数据库请求数据
app.get("/homeData", function (req, res) {

	//请求到前端发过来的数据
	var Num = req.query.nowNum
	console.log(Num)

	mongo.find({
		'collectionName': 'home', 'condition': {}, 'skip': 12 + ((Num - 1) * 8), 'limit': 8, 'callback': function (err, result) {
			if (err) {
				console.log('出错了！')
				res.send(JSON.stringify({ result: false, message: '获取不到数据' }))
				return
			} else {
				if (result && result.length > 0) {
					console.log('成功拿到数据')
					res.send(JSON.stringify({ result: true, message: JSON.stringify(result) }));
				} else {
					console.log('no')
					console.log(result)
					res.send(JSON.stringify({ result: false, message: '获取不到数据' }));
				}
				// console.log(res)
			}
		}
	})

})
// *********************************购物车***************************************
//把商品写进数据库
app.get("/getGoodsData", function (req, res) {

	var arr = [
		{
			src: 'http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2015/11/201511061700247469.png',
			title: '汉堡包'
		},
		{
			src: 'http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2015/11/201511061701025899.png',
			title: '吉士汉堡包'
		},
		{
			src: 'http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2015/11/201511061701346777.png',
			title: '双层吉士汉堡'
		},
		{
			src: 'http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2015/11/201511061702344905.png',
			title: '麦香鸡'
		},
		{
			src: 'http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2015/11/201511061704079580.png',
			title: '麦香鱼'
		},
		{
			src: 'http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2015/11/201511061723486318.png',
			title: '麦辣鸡腿汉堡'
		},
		{
			src: 'http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2015/11/201511061707075050.png',
			title: '培根蔬萃双层牛堡'
		},
		{
			src: 'http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2015/11/201511061706277305.png',
			title: '巨无霸'
		},
		{
			src: 'http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2015/11/201511061705331634.png',
			title: '原味板烧鸡腿堡'
		},
		{
			src: 'http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2017/09/201709081640184570.png',
			title: '吉士蛋堡'
		},
		{
			src: 'http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2018/06/201806271648252562.png',
			title: '不素之霸'
		},
		{
			src: 'http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2018/06/201806281011087265.png',
			title: '双层阿拉斯加狭鳕鱼堡'
		},
		{
			src: 'http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2018/06/201806281017214247.png',
			title: '俄式红肠双鸡堡'
		},
		{
			src: 'http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2017/09/201709121705307453.png',
			title: '蜜汁鸡腿满碗饭'
		},
		{
			//小食
			src: 'http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2015/10/201510282102533259.png',
			title: '薯条'
		},
		{
			src: 'http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2015/10/201510282052093110.png',
			title: '麦乐鸡 (5块)'
		},
		{
			src: 'http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2015/10/201510282055166446.png',
			title: '玉米杯'
		},
		{
			src: 'http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2015/10/201510282100275134.png',
			title: '香骨鸡腿'
		},
		{
			src: 'http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2015/10/201510282110539567.png',
			title: '麦辣鸡翅'
		},
		{
			src: 'http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2016/10/201610141806169974.png',
			title: '那么大鸡排'
		},
		{
			src: 'http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2018/06/201806281020595933.png',
			title: '那么大鸡小块'
		},
		{
			src: 'http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2017/09/201709121707237655.png',
			title: '苹果片'
		},
		{
			src: 'http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2017/09/201709121712579051.png',
			title: '美味鲜蔬杯'
		},
		//甜品
		{
			src: 'http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2015/11/201511061757476079.png',
			title: '圆筒冰淇淋'
		},
		{
			src: 'http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2015/11/201511061759166715.png',
			title: '朱古力新地'
		},
		{
			src: 'http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2015/11/201511061759374646.png',
			title: '草莓新地'
		},
		{
			src: 'http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2015/11/201511061800053078.png',
			title: '奥利奥麦旋风'
		},
		{
			src: 'http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2015/11/201511061800383013.png',
			title: '草莓奥利奥麦旋风'
		},
		{
			src: 'http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2015/11/201511061801006455.png',
			title: '香芋派'
		},
		{
			src: 'http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2015/11/201511061801166151.png',
			title: '菠萝派'
		},
		{
			src: 'http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2018/06/201806281028595903.png',
			title: '那么大甜筒'
		},
		{
			//饮料
			src: 'http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2015/11/201511061810017423.png',
			title: '可口可乐'
		},
		{
			src: 'http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2015/11/201511061811257892.png',
			title: '美汁源阳光橙'
		},
		{
			src: 'http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2017/09/201709081643041929.png',
			title: '柠檬红茶味饮料'
		},
		{
			src: 'http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2017/09/201709121553526409.png',
			title: '冰露包装饮用水'
		},
		{
			src: 'http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2015/11/201511061811032770.png',
			title: '零度可口可乐'
		},
		{
			src: 'http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2015/11/201511061810291535.png',
			title: '雪碧'
		},
		{
			src: 'http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2017/09/201709081645486008.png',
			title: '美汁源100%苹果汁'
		},
		{
			src: 'http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2015/11/201511061817247401.png',
			title: '麦炫酷阳光橙'
		},
		{
			src: 'http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2016/02/201602171846327169.png',
			title: '优品豆浆'
		},
		{
			src: 'http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2015/11/201511061813048606.png',
			title: '热朱古力'
		},
		{
			src: 'http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2015/11/201511061823032589.png',
			title: '红茶'
		},
		{
			src: 'http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2015/11/201511061812111837.png',
			title: '鲜煮咖啡'
		},
		{
			//早餐
			src: 'http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2016/10/201610141825068448.png',
			title: '脆薯饼'
		},
		{
			src: 'http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2016/10/201610181552401579.png',
			title: '脆香油条'
		},
		{
			src: 'http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2015/11/201511061654225468.png',
			title: '猪柳麦满分'
		},
		{
			src: 'http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2015/11/201511061654446415.png',
			title: '猪柳蛋麦满分'
		},
		{
			src: 'http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2015/11/201511061655104476.png',
			title: '烟肉蛋麦满分'
		},
		{
			src: 'http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2015/11/201511061722302213.png',
			title: '吉士蛋麦满分'
		},
		{
			src: 'http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2015/11/201511061657219723.png',
			title: '火腿扒麦满分'
		},
		{
			src: 'http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2015/11/201511061723077048.png',
			title: '大脆鸡扒麦满分'
		},
		{
			src: 'http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2015/11/201511061658221610.png',
			title: '原味板烧鸡腿麦满分'
		},
		{
			src: 'http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2015/11/201511061658408782.png',
			title: '双层原味板烧鸡腿麦满分'
		},
		{
			src: 'http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2017/09/201709081710371818.png',
			title: '悠享早餐全餐 (猪柳饼、炒蛋、脆薯饼、松饼)'
		},
		{
			src: 'http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2017/09/201709081712171757.png',
			title: '板烧鸡腿早餐全餐 (板烧鸡腿、炒蛋、脆薯饼、松饼)'
		},
		{
			src: 'http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2017/09/201709081713313851.png',
			title: '鲜美烟肉早餐全餐 (烟肉片、炒蛋、脆薯饼、松饼)'
		},
		{
			src: 'http://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2017/09/201709081714441347.png',
			title: '猪柳蛋堡'
		}
		


	]

	mongo.insert({
		'collectionName': 'goods', 'data': arr, 'callback': function (err, result1) {
			if (err) {
				console.log('出错了！')
				res.send(JSON.stringify({ result: false, message: '写入不到数据' }))
				return
			} else {
				console.log('成功写入数据')
			}
		}
	})
})

//根据前端的要求 从数据库拿出数据到前端
app.get("/goodsData", function (req, res) {
	var index = req.query.nowIndex
	console.log(index)

	if (index == 0) {
		mongo.find({
			'collectionName': 'goods', 'condition': {}, 'skip': 0, 'limit': 14, 'callback': function (err, result) {
				if (err) {
					console.log('出错了！')
					res.send(JSON.stringify({ result: false, message: '获取不到数据' }))
					return
				} else {
					if (result && result.length > 0) {
						console.log('成功拿到数据')
						res.send(JSON.stringify({ result: true, message: JSON.stringify(result) }));
					} else {
						console.log('no')
						console.log(result)
						res.send(JSON.stringify({ result: false, message: '获取不到数据' }));
					}
					// console.log(res)
				}
			}
		})
	}

	if (index == 1) {
		mongo.find({
			'collectionName': 'goods', 'condition': {}, 'skip': 14, 'limit': 9, 'callback': function (err, result) {
				if (err) {
					console.log('出错了！')
					res.send(JSON.stringify({ result: false, message: '获取不到数据' }))
					return
				} else {
					if (result && result.length > 0) {
						console.log('成功拿到数据')
						res.send(JSON.stringify({ result: true, message: JSON.stringify(result) }));
					} else {
						console.log('no')
						console.log(result)
						res.send(JSON.stringify({ result: false, message: '获取不到数据' }));
					}
					// console.log(res)
				}
			}
		})
	}
	if (index == 2) {
		mongo.find({
			'collectionName': 'goods', 'condition': {}, 'skip': 23, 'limit': 8, 'callback': function (err, result) {
				if (err) {
					console.log('出错了！')
					res.send(JSON.stringify({ result: false, message: '获取不到数据' }))
					return
				} else {
					if (result && result.length > 0) {
						console.log('成功拿到数据')
						res.send(JSON.stringify({ result: true, message: JSON.stringify(result) }));
					} else {
						console.log('no')
						console.log(result)
						res.send(JSON.stringify({ result: false, message: '获取不到数据' }));
					}
					// console.log(res)
				}
			}
		})
	}
	if (index == 3) {
		mongo.find({
			'collectionName': 'goods', 'condition': {}, 'skip': 31, 'limit': 12, 'callback': function (err, result) {
				if (err) {
					console.log('出错了！')
					res.send(JSON.stringify({ result: false, message: '获取不到数据' }))
					return
				} else {
					if (result && result.length > 0) {
						console.log('成功拿到数据')
						res.send(JSON.stringify({ result: true, message: JSON.stringify(result) }));
					} else {
						console.log('no')
						console.log(result)
						res.send(JSON.stringify({ result: false, message: '获取不到数据' }));
					}
					// console.log(res)
				}
			}
		})
	}
	if (index == 4) {
		mongo.find({
			'collectionName': 'goods', 'condition': {}, 'skip': 43, 'limit': 14, 'callback': function (err, result) {
				if (err) {
					console.log('出错了！')
					res.send(JSON.stringify({ result: false, message: '获取不到数据' }))
					return
				} else {
					if (result && result.length > 0) {
						console.log('成功拿到数据')
						res.send(JSON.stringify({ result: true, message: JSON.stringify(result) }));
					} else {
						console.log('no')
						console.log(result)
						res.send(JSON.stringify({ result: false, message: '获取不到数据' }));
					}
					// console.log(res)
				}
			}
		})
	}
})




// 把数据库的内容返回给前端
app.listen(9999)

