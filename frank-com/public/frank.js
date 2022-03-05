console.log("我是 frank.js ")


// 方法一：直接跨域访问服务器中的 friends.json
function ajax (method, url) {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open(method, url);
        request.onreadystatechange = () => {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    resolve(request.response);
                } else {
                    reject(request);
                }
            }
        };
        request.send();
    });
}

ajax("get", "http://qq.com:8888/friends.json").then(response => {
    console.log("这是 CORS, 正在跨域发送请求和获取数据");
    console.log(response);
});


// 方法二：直接访问服务器中的 friends.js
function jsonp (url) {
    return new Promise((resolve, reject) => {
        // 每次访问，random 都是一个随机数，防止 xxx 重复
        const random = "frankJSONPCallbackName" + Math.random();
        const script = document.createElement("script");
        // 使用占位符 ${} 简化
        script.src = `${url}?callback=${random}`;
        document.body.appendChild(script);
        script.onload = () => {
            // 成功拿到数据
            // 删除操作，防止有大量的 script 标签被插入到 body 中
            // 目的：获取数据
            script.remove();
        };
        script.onerror = () => {
            // 没有拿到数据
            reject();
        };
        // 将 window.random 定义成一个函数
        // qq-com 的服务器会返回一个字符串形式的 window.random(data)
        // 浏览器会解释字符串并执行 window.random(data)
        // window.random 本质是一个回调函数，写给浏览器调用的函数
        window[random] = data => {
            resolve(data);
        };
    });
}

jsonp("http://qq.com:8888/friends.js").then(data => {
    console.log("这是 JSONP，正在跨域发送请求和获取数据");
    console.log(data);
});

