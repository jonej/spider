var jsdom = require("jsdom");

function ecms(ord){

jsdom.env(
		"https://www.ecmsglobal.com/oms/showtracking?trackingno="+ord+"&lang=cn",
		["https://ss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/www/cache/static/protocol/https/jquery/jquery-1.10.2.min_f2fb5194.js"],
		function (errors, window) {
			var $ = window.$;
			console.log($(".row").first().text());
		}
);

}

function _360hitao(){

	var http = require("http");

	var options = {
	  host: 'member.360hitao.com',
	  port: 80,
	  path: '/member/ashx/member.ashx?methods=LoadInStockPacks',
	  method: 'POST',
	  headers: {'Cookie': 'NickName=wjj.name@163.com; can_login=Y; ASP.NET_SessionId=20cy53ym4sicg3xpep0ajjdx; devicetype=mobile; NickName=wjj.name@163.com; UserName=%e7%8e%8b%e4%bf%8a%e6%9d%b0; token=64b842aaf8b746739068ea9e9e66bba4; user_name=\xe7\x8e\x8b\xe4\xbf\x8a\xe6\x9d\xb0; CNZZDATA3997759=cnzz_eid%3D592415857-1418113108-null%26ntime%3D1418625298'}
	};

	var req = http.request(options, function(res) {
			res.setEncoding('utf8');

			res.on('data', function (chunk) {
				var json =  eval("(" + chunk + ")");
				console.log("纽约仓库包裹:" + json.NYCNumber);
				});
			});

	req.on('error', function(e) {
			console.log('problem with request: ' + e.message);
			});

	// write data to request body
	//req.write('data\n');
	//req.write('data\n');
	req.end();
}

function _360hitao2(ord){
	
	var http = require("http");
	
	var options = {
	  host: 'member.360hitao.com',
	  port: 80,
	  path: '/member/ashx/orderList.ashx?_=1418629653006&methods=track&DDHM='+ord,
	  method: 'GET',
	  headers: {'Cookie': 'NickName=wjj.name@163.com; can_login=Y; ASP.NET_SessionId=20cy53ym4sicg3xpep0ajjdx; devicetype=mobile; NickName=wjj.name@163.com; UserName=%e7%8e%8b%e4%bf%8a%e6%9d%b0; token=64b842aaf8b746739068ea9e9e66bba4; user_name=\xe7\x8e\x8b\xe4\xbf\x8a\xe6\x9d\xb0; CNZZDATA3997759=cnzz_eid%3D592415857-1418113108-null%26ntime%3D1418625298'}
	};

	var str = "";

	var req = http.request(options, function(res) {
			res.setEncoding('utf8');

			res.on('data', function (chunk) {
				str += chunk;
			});
			
			res.on('end',function(e){
				var json =  eval("(" + str + ")");
				jsdom.env(
					unescape(json.view),
					["https://ss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/www/cache/static/protocol/https/jquery/jquery-1.10.2.min_f2fb5194.js"],
					function (errors, window) {
					var $ = window.$;
					console.log($(".endLine").first().text());
					}
					);
				});
			});

	req.on('error', function(e) {
			console.log('problem with request: ' + e.message);
			});


	// write data to request body
	req.write('data\n');
	req.write('data\n');
	req.end();

}

function main(){

	console.log("\n---------------------------------------");
	console.log("\nOrder Check Time:" + (new Date()).toLocaleString());
	console.log("\n---------------------------------------");

	ecms("APELAX1110012044");
	ecms("APECHI1250029514");
	_360hitao();
	_360hitao2("90577419");
	_360hitao2("90574882");

	setTimeout(main, 180 * 1000);
}

main();
