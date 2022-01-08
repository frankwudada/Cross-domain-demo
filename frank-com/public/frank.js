console.log("我是 frank.js ")

function ajax(method, url) {
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
    console.log("这是 AJAX");
    console.log(response);
});

function jsonp(url) {
    return new Promise((resolve, reject) => {
        // 每次访问，random 都是一个随机数，防止 xxx 重复
        const random = "frankJSONPCallbackName" + Math.random();
        // 将 window.random 定义成一个函数，该函数本质是跨域回调函数
        window[random] = data => {
            resolve(data);
        };
        const script = document.createElement("script");
        // 使用占位符 ${} 简化
        script.src = `${url}?callback=${random}`;
        script.onload = () => {
            // 删除操作，防止有大量的 script 标签被插入到 body 中
            // 目的：获取数据
            script.remove();
        };
        script.onerror = () => {
            reject();
        };
        document.body.appendChild(script);
    });
}

jsonp("http://qq.com:8888/friends.js").then(data => {
    console.log(data);
});

