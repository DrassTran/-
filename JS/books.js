/* 根据ID查询书籍来制作跳转页面🥳🥳🥳 */
//获取网页上的拼接参数值
console.log(location.search);
//将参数值转成数组进行调用
var prom = location.search.substr(1);
console.log(prom);
// console.log("------------------------");
let arr = prom.split("=")
console.log(arr);
(async function(){
    try{
        let {data:content} = await axios.get("http://localhost:3005/books?id="+arr[1])
        console.log("http://localhost:3005/books?id="+arr[1]);
        console.log(content.data[0].coverImg);
        function booksCotent (){
            $("#booksImg").attr({"src":content.data[0].coverImg})
            $("#booksTitle").text(content.data[0].name)
            $("#booksAuthor").text(content.data[0].author)
            $("#booksDesc").text(content.data[0].desc)
            $("#booksRate").text(content.data[0].rate)
            layui.use('rate', function () {
                // console.log(d.rate);
                var rate = layui.rate;
                //渲染
                var ins1 = rate.render({
                    elem: '#star'  //绑定元素
                    , length: 10
                    , half: true
                    , value: content.data[0].rate
                    , readonly: true
                });
            });
        }
        booksCotent();
    }catch(e){
        console.log(e);
    }
})()
let InputDiv = document.createElement("div")
InputDiv.classList.add("inputdiv")
// 给input搜索框增添事件😹😹😹
let group = document.querySelector(".form-group")
$(".headerbtn").on("click", function () {
    // 创建搜索联想框
    group.appendChild(InputDiv)
    $(".inputdiv").css("display", "block")
    axios.get("http://localhost:3005/books?&name_like=" + $(".form-control").val()).then(data => {
        function fn() {
            if(InputDiv.innerHTML===""){
            for (let i = 0; i < data.data.data.length; i++) {
                let pInput = document.createElement("p")
                pInput.classList.add("pIput")
                let spanInputname = document.createElement("span");
                spanInputname.innerText = data.data.data[i].name;
                spanInputname.classList.add("spanName")
                let spanInputauthor = document.createElement("span");
                spanInputauthor.innerText = data.data.data[i].author;
                spanInputauthor.classList.add("spanAuthor")
                InputDiv.appendChild(pInput);
                pInput.appendChild(spanInputname);
                pInput.appendChild(spanInputauthor);
                $(".pIput").eq(i).on("click", function () {
                    window.location.href = "./books.html?id=" + data.data.data[i].id
                })

            }}
        }
        if($(".form-control").val()===""){
            InputDiv.innerHTML="",
            fn();
        }else{
            InputDiv.innerHTML="",
            fn();
        }
    })
})
$(".headerbtn").on("blur", function () {
    setTimeout(val => {
        $(".inputdiv").css("display", "none")
    }, 2000)
})

// ------------------------------------------------------------------------------------------------------------------------------------------------
/*
 *                        _oo0oo_
 *                       o8888888o
 *                       88" . "88
 *                       (| -_- |)
 *                       0\  =  /0
 *                     ___/`---'\___
 *                   .' \\|     |// '.
 *                  / \\|||  :  |||// \
 *                 / _||||| -:- |||||- \
 *                |   | \\\  - /// |   |
 *                | \_|  ''\---/''  |_/ |
 *                \  .-\__  '-'  ___/-. /
 *              ___'. .'  /--.--\  `. .'___
 *           ."" '<  `.___\_<|>_/___.' >' "".
 *          | | :  `- \`.;`\ _ /`;.`/ - ` : | |
 *          \  \ `_.   \_ __\ /__ _/   .-` /  /
 *      =====`-.____`.___ \_____/___.-`___.-'=====
 *                        `=---='
 * 
 * 
 *      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * 
 *            佛祖保佑     永不宕机     永无BUG
 * 
 *        佛曰:  
 *                写字楼里写字间，写字间里程序员；  
 *                程序人员写程序，又拿程序换酒钱。  
 *                酒醒只在网上坐，酒醉还来网下眠；  
 *                酒醉酒醒日复日，网上网下年复年。  
 *                但愿老死电脑间，不愿鞠躬老板前；  
 *                奔驰宝马贵者趣，公交自行程序员。  
 *                别人笑我忒疯癫，我笑自己命太贱；  
 *                不见满街漂亮妹，哪个归得程序员？
 */
