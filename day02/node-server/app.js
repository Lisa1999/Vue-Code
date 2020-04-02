//导入http内置模块
const http = require("http")

//这个核心模块，能够帮助我们解析url地址,从而难道 pathname和query
const urlModule = require("url")

//创建一个http服务器
const server = http.createServer()

//监听http服务器的request请求
server.on("request", function(req, res) {
  // const url = req.url

  const { pathname: url, query } = urlModule.parse(req.url, true)

  if (url == "/getscript") {
    //拼接一个合法的js脚本，这里拼接一个方法调用

    var data = {
      name: "王阔",
      age: 18,
      gender: "男孩子"
    }

    var scriptStr = `${query.callback}(${JSON.stringify(data)})`

    res.end(scriptStr)
    //客户端拿到之后解析
  } else {
    res.end("404")
  }
})

//指定端口号并启动服务器监听
server.listen(3000, function() {
  console.log("Wow server listen at http://127.0.0.1:3000")
})
