var http = require('http');
var fs = require("fs");
var qs = require("querystring");
var querystring = require('querystring');

var MongoClient = require("mongodb").MongoClient;
var dbUrl="mongodb://localhost:27017";
//const dbUrl = "mongodb://localhost:27017";
//const Client = new MongoClient(dbUrl,{useUnifiedTopology: true } );

//var dbUrl = "mongodb://localhost:32768/";





//create a server object:
http.createServer(function (req, res) {
    //console.log(querystring.parse("http://127.0.0.1:8888/feedback?id=11"));
//	var a=req.url;
	//console.log("SSS="+a);
	//var b=a.indexOf("?");
	//req.url=req.url.substring(1,15);
	//console.log(req.url);
	//console.log("S");
	//console.log("myurl="+req.url.substring(1,9));
	a=req.url.substring(1,9);
    if(req.url === "/apple"){
		res.write('Hello World!'); //write a response to the client
        res.end(); //end the response
	}else if(req.url === "/orange"){
		sendFileContent(res, "webjquery.html", "text/html");
	}
	
		else if(req.url === "/login"){
		console.log("affdsafdjs")
		sendFileContent(res, "login.html", "text/html");
	}
	else if(req.url === "/index"){
		sendFileContent(res, "index.html", "text/html");
	}
	
		else if(req.url === "/list"){
		sendFileContent(res, "list.html", "text/html");
		}
		
		else if(req.url === "/kmbroutedata"){
		sendFileContent(res, "kmbroutedata.html", "text/html");
		}
		
		else if(req.url === "/qiandaolake"){
		sendFileContent(res, "qiandaolake.html", "text/html");
		}
		
		else if(req.url === "/nwfbroutedata"){
		sendFileContent(res, "nwfbroutedata.html", "text/html");
		
		}
		
		else if(req.url === "/Dadongshan"){
		sendFileContent(res, "Dadongshan.html", "text/html");
		
		}
				
		else if(req.url === "/devilsmountain"){
		sendFileContent(res, "devilsmountain.html", "text/html");
		
		}
		
		else if(req.url === "/haktsui"){
		sendFileContent(res, "haktsui.html", "text/html");
		
		}
		
		else if(req.url === "/dragonsback"){
		sendFileContent(res, "dragonsback.html", "text/html");
		
		}
		
		else if(req.url === "/showfeedback"){
		sendFileContent(res, "showfeedback.html", "text/html");
		
		}
		
		else if(req.url === "/addfeedback"){
		sendFileContent(res, "addfeedback.html", "text/html");
		
		}
		else if(req.url === "/add_feedback"){
		console.log("Requested URL is url" +req.url);
		if(req.method==="POST"){
			formData = '';
			return req.on('data', function(data) {
				
			    formData='';
				formData+=data;
				console.log(formData);
				//apple=777&orange=iiii
				
				
				return req.on('end', function() {
				
				var data;
				var tit;
				var comt;
				
				
				data=qs.parse(formData);
				tit=data['title'];
				comt=data['content'];
	
				
				
				console.log(tit);
				console.log(comt);
		
				
				console.log("ok");
				//res.end("dat="+ user + pwd);
				
					// login get data
				//var query={"Title": tit, "Comment" : comt};
				var query={"title": tit, "content" : comt};
				
				//var myobj = {"name":"alex"};
				MongoClient.connect(dbUrl, function(err,db){
					if (err) throw err;
					
					//database table name
					var dbo = db.db("apple");
						//	var myobj = stringMsg;
							dbo.collection("feedbackdata").insertOne(query, function(err, res) {
								if (err) throw err;
								console.log(" document inserted");
								//res.end("Account created!!");
								db.close();
							});
							
				});
				
				
				
			
			       });
				
				
			
			});
		}
		
	}

		//comment data
	else if(req.url === "/com_data"){
		console.log("Requested URL is url" +req.url);
		
		console.log(req.method);
		if(req.method=="POST"){
			formData = '';
			return req.on('data', function(data) {
		
				return req.on('end', function() {
			
				console.log("content data");
			
				MongoClient.connect(dbUrl, function(err, db) {
						if (err) throw err;
							var dbo = db.db("apple");
							
							dbo.collection("feedbackdata").find().toArray(function(err, result) {
						
	
								if (err) throw err;				
								console.log("content find");
								
								
								console.log(JSON.stringify(result));
								
						
								db.close();
								
							if(result.length >0){
								
								
								return res.end(JSON.stringify(result));
								//return res.end("ok");
							} else{
								
				return res.end("Can not find");
									
							};
							});
						});
				});
				});
			}
		}
		
		
		else if(a === "feedback"){
		sendFileContent(res, "feedback.html", "text/html");
		}
	
		// update
	else if(req.url === "/fed_back"){
		console.log("Requested URL is url" +req.url);
		if(req.method==="POST"){
			formData = '';
			return req.on('data', function(data) {
				
			    formData='';
				formData+=data;
				console.log(formData);
				//apple=777&orange=iiii
				
				
				return req.on('end', function() {
				
				var data;
				var tit;
				var comt;
				
				
				data=qs.parse(formData);
				console.log(data);
				id=data['id'];
				comt=data['content'];
	
				
				
				console.log(id);
				console.log(comt);
		
				
				console.log("ok");
				
				var myquery = { content: id };
				var newvalues = { $set: {content: comt} };
				
				//var myobj = {"name":"alex"};
				MongoClient.connect(dbUrl, function(err,db){
					if (err) throw err;
					
					//database table name
					var dbo = db.db("apple");
						//	var myobj = stringMsg;
							dbo.collection("feedbackdata").updateOne(myquery, newvalues, function(err, res) {
								if (err) throw err;
								console.log(" document inserted");
								//res.end("Account created!!");
								db.close();
							});
							
				});
				
				
				
			
			       });
				
				
			
			});
		}
		
	}
	
	
			// BACK UP LOGIN LINK
			else if(req.url === "/login-b"){
		sendFileContent(res, "login-b.html", "text/html");
	}
	
		
	

	else if(req.url === "/delete"){
		console.log("Requested URL is url" +req.url);
		console.log("delete");
		if(req.method==="POST"){
			formData = '';
			return req.on('data', function(data) {
						
			    formData='';
				formData+=data;
				console.log(formData);
				//apple=777&orange=iiii
				
				
				return req.on('end', function() {
				
			    var user;
				var data;
				var pwd;
				
				data=qs.parse(formData);
				content=data['content'];
			
	
				console.log(content);
				//var myobj = {"name":"alex"};
				
				MongoClient.connect(dbUrl, function(err, db) {
						if (err) throw err;
							var dbo = db.db("apple");
							var myquery = { "content": content };
								dbo.collection("feedbackdata").deleteOne(myquery, function(err, obj) {
						
	
								if (err) throw err;				
								console.log("content find");
								
								
								//console.log(JSON.stringify(result));
								
								
												
							
									
								db.close();
						
							});
						
						
						});
				
				});

		
				});
		
			}
		}	
		
//login
	else if(req.url === "/login"){
		console.log("affdsafdjs")
		sendFileContent(res, "login.html", "text/html");
		
	}
	else if(req.url === "/check_login"){
		console.log("Requested URL is url" +req.url);
		if(req.method==="POST"){
			formData = '';
			return req.on('data', function(data) {
						
			    formData='';
				formData+=data;
				console.log(formData);
				//apple=777&orange=iiii
				
				
				return req.on('end', function() {
				
			    var user;
				var data;
				var pwd;
				
				data=qs.parse(formData);
				user=data['login'];
				pwd=data['password'];
				console.log(user);
				console.log(pwd);
				console.log("login");
				//res.end("dat="+ user + pwd);
				
					// login get data
				var query={"login": user, "password" : pwd};
				
				//var myobj = {"name":"alex"};
				
				MongoClient.connect(dbUrl, function(err, db) {
						if (err) throw err;
							var dbo = db.db("apple");
							var query={"Registername": user,"password":pwd};
							console.log(query);
							dbo.collection("cpplecollection").find(query).toArray(function(err, result) {
						
	
								if (err) throw err;				
								console.log("content find");
								
								
								console.log(JSON.stringify(result));
								
								
												
							
									
								db.close();
								
							if(result.length >0){
								
								
								
								return res.end("Success");
							} else{
								
								
								
								//return res.end(JSON.stringify(result));
								
								
																	
									return res.end("Can not success");
									
							};
							});
						
						
						});
				
				});

		
				});
		
			}
		}

	
		//register
	else if(req.url === "/check_reg"){
		console.log("Requested URL is url" +req.url);
		if(req.method==="POST"){
			formData = '';
			return req.on('data', function(data) {
				
			    formData='';
				formData+=data;
				console.log(formData);
				//apple=777&orange=iiii
				
				
				return req.on('end', function() {
				
			    var user;
				var data;
				var pwd;
				var emil;
				var repwd;
				
				
				data=qs.parse(formData);
				user=data['Registername'];
				pwd=data['password'];
				emil=data['email'];
				repwd=data['repassword'];
				
				
				console.log(user);
				console.log(pwd);
				console.log(emil);
				console.log(repwd);
				
				console.log("rejister");
				//res.end("dat="+ user + pwd);
				
					// login get data
				var query={"Registername": user, "password" : pwd, "email": emil, "repassword": repwd};
				
				//var myobj = {"name":"alex"};
				
				MongoClient.connect(dbUrl, function(err,db){
					if (err) throw err;
					
					//database table name
					var dbo = db.db("apple");
							//var myobj = stringMsg;
							dbo.collection("cpplecollection").insertOne(query, function(err, res) {
								if (err) throw err;
								console.log("1 document inserted");
								//res.end("Account created!!");
								db.close();
							});
							
				});
				
				
				
			
			       });
				
				
			
			});
			
		}else{
				
				
			     res.end("abc");
			}		
		
	}
	

else if(/^\/[a-zA-Z0-9\/-/]*.js$/.test(req.url.toString())){
sendFileContent(res, req.url.toString().substring(1), "text/javascript");
}else if(/^\/[a-zA-Z0-9\/-/]*.bundle.min.js$/.test(req.url.toString())){
sendFileContent(res, req.url.toString().substring(1), "text/javascript");
}else if(/^\/[a-zA-Z0-9\/-/]*.css$/.test(req.url.toString())){
sendFileContent(res, req.url.toString().substring(1), "text/css");
}else if(/^\/[a-zA-Z0-9\/-]*.min.css$/.test(req.url.toString())){
sendFileContent(res, req.url.toString().substring(1), "text/css");
}else if(/^\/[a-zA-Z0-9\/-]*.jpg$/.test(req.url.toString())){
sendFileContent(res, req.url.toString().substring(1), "image/jpg");
}else if(/^\/[a-zA-Z0-9-._\/]*.min.js$/.test(req.url.toString())){
sendFileContent(res, req.url.toString().substring(1), "text/javascript");
}else if(/^\/[a-zA-Z0-9-]*.min.css.map$/.test(req.url.toString())){
sendFileContent(res, req.url.toString().substring(1), "text/map");
}else if(/^\/[a-zA-Z0-9\/-/]*.min.js.map$/.test(req.url.toString())){
sendFileContent(res, req.url.toString().substring(1), "text/map");
}else if(/^\/[a-zA-Z0-9\/-/]*.css.map$/.test(req.url.toString())){
sendFileContent(res, req.url.toString().substring(1), "text/map");
}else if(/^\/[a-zA-Z0-9\/-/]*.png$/.test(req.url.toString())){
sendFileContent(res, req.url.toString().substring(1), "image/png");
}else if(/^\/[a-zA-Z0-9\/-/]*.ico$/.test(req.url.toString())){
sendFileContent(res, req.url.toString().substring(1), "text/ico");
}else if(/^\/[a-zA-Z0-9\/-/?]*.ttf$/.test(req.url.toString())){
sendFileContent(res, req.url.toString().substring(1), "text/font");
}else if(/^\/[a-zA-Z0-9\/-/?]*.woff$/.test(req.url.toString())){
sendFileContent(res, req.url.toString().substring(1), "text/woff");
}else if(/^\/[a-zA-Z0-9\/-/?]*.woff2$/.test(req.url.toString())){
sendFileContent(res, req.url.toString().substring(1), "text/woff2");
}else{
console.log("Requested URL is: " + req.url);
res.end();
}
}).listen(8888); //the server object listens on port 8080


function sendFileContent(response, fileName, contentType){
	fs.readFile(fileName, function(err, data){
		if(err){
			response.writeHead(404);
			response.write("Not Found!");
		}
		else{
			response.writeHead(200, {'Content-Type': contentType});
			response.write(data);
		}
		response.end();
	});
}