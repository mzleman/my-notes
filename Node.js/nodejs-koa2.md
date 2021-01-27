# Node.js 

## 核心模块

### htttp模块 

```javascript
const http=require('http');
http.createServer(function(request,response){
    
    response.writeHead(200,{'Content-Type':'text/plain;charset=utf-8'});
    //utf-8外侧要么不加引号 要么套双引号
    
    response.end('Hello World');//end方法应传入一个字符串！
    
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081');
```

==原生node.js提取post请求体==

```javascript
http.createServer((req,res)=>{
    let URI=url.parse(req.url).pathname;
    if(req.method==='POST'&& URI==="/postuser"){
        let postData='';//初始化保存请求体的字符串
        req.on('data',chunk=>postData+=chunk);//请求体以流的形式读取，每次读取一段数据时触发data事件
        req.on('end',()=>{
           console.log(postData);
            res.writeHead(200,{'Content-Type':'text/plain;charset=utf-8'});
            res.end(postData);
        });//当请求体全部读取完毕后会触发end事件
    }
});

```

==原生node.js封装提取post请求体的方法==

```javascript

function getPostBody(req){
   	return new Promise((resolve,reject)=>{
       try{
        	let postbody='';
        	req.on('data',chunk=>{postbody+=chunk});
        	req.on('end',()=>resolve(postbody));
    	} 
        catch(err){
            reject(err);
        }
    })
}
```





==原生node.js读取get请求参数==

```javascript
http.createServer((req,res)=>{
    if(req.methold==='GET'){
        let reqobj=url.parse(req.url,true);//第二个参数设置为true
        let query=reqobj.query;
        res.writeHead(200,{'Content-Type':'text/plain;charset=utf-8'});
        res.end(JSON.stringify(query));
    }
});
```



### url模块 

```javascript
const http=require('http');
const url=require('url')
http.createServer(function(request,response){
    
    let queryObj=url.parse(request.url,true).query;//解析get请求中的参数
    let info=JSON.stringfy(queryObj);//将query对象转为字符串
    
    response.writeHead(200,{'Content-Type':'text/plain;charset=utf-8'});
    
    response.end(info);
    
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081');
```

### fs模块

+ **[`fs.stat(path[, options], callback(err,data))`](https://nodejs.org/dist/latest-v14.x/docs/api/fs.html#fs_fs_stat_path_options_callback)**

  检测一个路径是一个路径是目录还是一个目录

  ```javascript
  const fs=require('fs');
  fs.stat('./package.json',(err,data)=>{
      if(err){
          console.log(err);
          return;
      }
     	 console.log(data.isFile());//会输出 true;
       console.log(data.isDirectory());//会输出false
  });
  ```

  

+ **[`fs.mkdir(path[, options], callback)`](https://nodejs.org/dist/latest-v14.x/docs/api/fs.html#fs_fs_mkdir_path_options_callback)**

  创建一个目录

  ==常用mkdirp这个第三方包来创建目录==

  

+ **[`fs.writeFile(file, data[, options], callback)`](https://nodejs.org/dist/latest-v14.x/docs/api/fs.html#fs_fs_writefile_file_data_options_callback))**

  创建并向文件里写入内容 。如果文件已存在，则清空原有内容。

  options为一个对象，包含三个属性

  {

  ​	enconding: 编码，string类型，默认值'utf-8',

  ​	mode :文件读写权限，number类型，默认值438, <font color="red">???这里不太懂</font>

  ​	flag:string类型，默认值 'w'

  }

  

+ **[`fs.appendFile(path, data[, options], callback)`](https://nodejs.org/dist/latest-v14.x/docs/api/fs.html#fs_fs_appendfile_path_data_options_callback)**

  向文件中追加内容，若文件不存在，则创建该文件。

  

+ **[`fs.readFile(path[, options], callback(err,data))`](https://nodejs.org/dist/latest-v14.x/docs/api/fs.html#fs_fs_readfile_path_options_callback)**

  读取文件内容，默认情况下读取到的data为Buffer。可以使用toString()方法转化为字符串。

  ==buffer对象具有toSting方法==

  ==buffer.toString([enconding='utf-8'],[start=0],[end=this.length])==

  options为一个对象，包含两个属性｛

  ​	==enconding : 解码，string类型，默认值为null，即读出一个buffer,==

  ​	flag : 默认值'r'

  ｝

  

+ **[`fs.readdir(path[, options], callback(err,data))`](https://nodejs.org/dist/latest-v14.x/docs/api/fs.html#fs_fs_readdir_path_options_callback)**

  读取一个目录内的信息，data为一个数组，包含了目录内包含的文件名与目录名。

  

+ **[`fs.rename(oldPath, newPath, callback)`](https://nodejs.org/dist/latest-v14.x/docs/api/fs.html#fs_fs_rename_oldpath_newpath_callback)**

  重命名一个文件或目录。

  ```javascript
  //demo
  fs.rename('.\css\a.css','.\css\b.css',(err)=>{
      if(err){
          console.log(err);
          return;
      }
  });
  ```

  移动(剪切粘贴)一个文件或目录。

  ```javascript
  //demo
  fs.rename('.\css\a.css','.\a.css',(err)=>{
          if(err){
          console.log(err);
          return;
      }
  });
  ```

  

+ **[`fs.rmdir(path[, options], callback)`](https://nodejs.org/dist/latest-v14.x/docs/api/fs.html#fs_fs_rmdir_path_options_callback)**

  删除一个目录。

  

+ **[`fs.unlink(path, callback)`](https://nodejs.org/dist/latest-v14.x/docs/api/fs.html#fs_fs_unlink_path_callback)**

  删除一个文件。

## CommonJS

​	CommonJS是一个JS模块化的标准。

​	CommonJS中，将公共的或较为独立的功能封装成模块(JS文件)，模块由module.exports暴露属性或者方法，exports变量指向module.exports对象。

 ```javascript
module.exports={};
let exports=module.exports;


/*   模块代码 */

return module.exports;
 ```

 ###  Node.js模块分为两类 

1. ==核心模块==

2. ==文件模块==

   文件模块的查找规则

   * require(path) ，则按照指定路径查找。path应当为 ./  或 ../  开头的相对路径，以及绝对路径(包括以"/"开头的根目录绝对路径)。

     <font color='red'>若path为相对路径，相对路径设置的值只和当前执行的js文件位置有关(当前执行上下文)。且当想要使用相对路径加载本目录下的js模块时，'./'不能省略</font>

   * require(packageName),则按照以下顺序查找该模块:

     ① 	查找本js文件所在目录下的node_modules目录，若不存在该目录，则向上一级目录查找node_modules目录。

     ②	node_modules目录中查找名为packageName的目录，若不存在，向上一级目录中查找node_modules模块。

     ③	在packageName目录中查找package.json文件，查找该文件中main属性标注的入口js文件。若不存在该入口文件，查找packageName目录中是否有index.js文件，若存在则将index.js作为入口js文件。

     ④ 	若连index.js文件都不存在，则再向上一级目录查找node_modules。
   
     

## npm命令 

* npm install [模块] --save

* npm install [模块] -g

* npm install 

* npm install [模块]@版本号

* npm uninstall 

* npm list 

  查看当前目录安装的所有包

* npm info [模块]

  查看模块信息

### package.json中的dependencies字段

"dependencies":{

​	"express":"^4.13.3"

}

express版本号前:

+ 加==^==表示锁定版本号第一位，后两位加载最新。
+ 加 ==~==表示锁定前两位，最后一位下载最新。
+ 加==*==表示不锁定，下载最新版本。
+ 不加任何符号表示锁定三位。

## MongoDB

### 基本操作

+ 查看数据库

  ```javascript
  show dbs
  ```

  

+ 使用数据库、创建数据库

  ```javascript
  use demoDatabase
  ```

  

+ 查看数据库中的集合

  ```javascript
  show collections
  ```



+ 在数据库中创建集合

  ```javascript
  db.createCollection(name[,options])
  ```

  

+ 对集合进行操作

  ```javascript
  db.users.insert({"name":"mazheng"})//插入一条数据
  db.users.find()//查看集合内所有文档
  ```



+ 删除集合

  ```javascript
  db.users.drop()
  ```

  

+ 删除数据库

  ```javascript
  db.dropDatabase()//在切换到该数据库后可执行删库操作
  ```

  

+ 

  show



## Koa2 

### 配置koa

```bash
npm install koa --save
npm install koa-router --save //koa需要单独配置路由模块
```



### Koa版的hello world 

```javascript
const Koa=require('koa');

let app=new Koa();

app.use((ctx,next)=>{
    ctx.body='hello world';
})

app.listen(3000);
```



### Koa配置路由 

```javascript

const Koa=require('koa');
const Router=require('koa-router');

let app=new Koa();
let router=new Router();

router.get('/',async ctx=>{
    ctx.body='首页';
});

app.use(router.routes())//挂载路由
app.use(router.allowedMethods());/*官方建议配置内容。暂不懂这条配置的含义（根据ctx.status设置response响应头）*/


/*这里可以链式调用
* app.use(router.routes())
	  .use(router.allowedMethods());
*/

app.listen(3000);

```



### 动态路由

```javascript
router.get('/:firstParam/:secondParam',async ctx=>{
   
    console.log(ctx.params);//获取动态路由
    
    ctx.body='hello world';
    
}); //使用冒号+参数名标记一个路由参数

//127.0.0.1:3000/news/mz

/*控制台输出:
*			{firstParam:'news',secondParam:mz}
*/
```



### 获取get请求的参数 

```javascript
router.get('/news',async ctx={
   	//  127.0.0.1:3000/news?aid=123&name=zhangsan
    
    console.log(ctx.querystring);//    aid=123&name=zhangsan
    
    console.log(ctx.query);//         {aid:'123',name='zhangsan'}

	console.log(ctx.url);//           /news?aid=123&name=zhangsan


	//也可以从ctx的属性获取对应信息
	console.log(ctx.request.querystring);//    aid=123&name=zhangsan
    
    console.log(ctx.request.query);//         {aid:'123',name='zhangsan'}

	console.log(ctx.request.url);//           /news?aid=123&name=zhangsan
	
	ctx.body='hello world';
    
});
```



## Koa的中间件

==通俗来说，中间件是匹配路由之前或匹配路由时完成的一系列操作== 

**中间件的功能** 

+ 执行任何代码
+ 修改请求和响应对象
+ 终结请求-响应循环
+ 调用堆栈中的下一个中间件

### 应用级别的中间件 

```javascript
const Koa=require('koa');
const Router=require('koa-router');
let router=new Router();
let app=new Koa();

app.use(async (ctx,next)=>{
    
    console.log('执行第一个中间件');
    console.log(ctx.request);//对请求或响应对象进行访问
    
    await next();//执行下一个中间件
    
    console.log('第一个中间件执行完毕');
});

app.use(async (ctx,next)=>{
    
    console.log('执行第二个中间件');
    console.log(ctx.request);//对请求或响应对象进行访问
    
    await next();//执行下一个中间件
    
    console.log('第二个中间件执行完毕');
});

router.get('/',ctx=>{
    
    console.log('匹配路由');
    
});

app.use(router.routes());//挂载路由 

```



### 中间件执行顺序

**从上到下按next()方法依次执行中间件，直到路由中间件匹配路由(因为路由中间件一般最后挂载)，再按先进后出原则执行next()方法后的代码。如果某个中间件执行过后不再执行next方法，则后续的中间件不再执行**。

上面的应用级别中间件执行顺序：

<font color='red'>假设访问localhost:3000/</font>

+ 执行第一个中间件
+ 执行第二个中间件
+ 匹配路由
+ 第二个中间件执行完毕
+ 第一个中间件执行完毕



### 路由级别的中间件

```javascript

router.get('/',(ctx,next)=>{
    
    console.log(ctx.request);//当匹配该条路由时，执行一系列操作，如访问请求对象。、
    
    next();//继续匹配路由,如果不执行next(),则结束路由匹配。
});

router.get('/',(ctx)=>{
    
    ctx.body=‘执行过了路由级别中间件的结果’;
    
});
```



### Koa常用中间件 

+ 获取post请求体 koa-bodyparser

+ 路由模块 koa-router

+ 配置视图目录以及模板引擎 koa-views

  ```javascript
  const Koa = require("koa"),
        views = require("koa-views");
  const app = new Koa();
  app.use(
    views("views", {
      map: {
        html: "ejs"
      }
    })
  );
  ```

  

+ 配置静态资源 koa-static

  ```javascript
  const Koa = require("koa"),
        serve = require("koa-static");
  const app = new Koa();
  app.use(serve(__dirname + "/static"));
  app.use(serve(__dirname + "/public"));
  ```

  

+ art-template 模板引擎 koa-art-template与art-template





## cookie与session

 ### cookie

cookie保存在浏览器端，可以让我们用同一个浏览器访问同一个域名时共享数据。

1. 保存用户信息
2. 浏览器历史记录
3. 10天免登陆
4. 购物车内容
5. .....



### 使用Koa操作cookie

```javascript
ctx.cookies.get(key);//获取cookie

ctx.cookies.set(key,val[,options])//设置cookie
```



==options可设置的属性==

+ maxAge cookie的寿命，单位为毫秒
+ expires  到期的时间戳
+ path 可以访问的页面
+ domain  正常情况下不用设置该值，当前域下面的所有页面都可以访问
+ httpOnly  客户端是否可以访问该cookie

<font color="red">Koa中设置cookie的键值对不可以使用中文</font>



### session 

当浏览器访问服务器并发送第一次请求时，服务器端会创建一个session对象，生成一个类似于key:value的键值对，然后将key(cookie)返回到浏览器（客户端），浏览器下次再访问时，携带key（cookie），找到对应的session(value)。客户的信息都保存在session中。



### 在Koa中使用session

需要配置koa-session中间件，比较麻烦，具体参考官网。



## 使用JS实现简单的单例模式

```javascript
//实现数据库连接的单例模式

class DataBase
{
    //由于是单例模式，输入的dbPath一般是确定的固定值
    constructor(dbPath){
        console.log('DataBase的构造函数');
        this.connect(dbPath);
    }
    
    connect(path){
        console.log('连接数据库');
    }
    
    find(){
        console.log('在数据库中查询数据');
    }
    
    static getInstance(dbPath){
        
        if(!DataBase.instance){
            DataBase.instance=new DataBase(dbPath)
        }
        
        return DataBase.instance;
    } 
}

let dbPath='localhost:27017';

let db1=DataBase.getInstance();
let db2=DataBase.getInstance();

//db1和db2指向同一个单例
```































































































































