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
$(".headerbtn").on("click",function(){
    // 创建搜索联想框
    group.appendChild(InputDiv)
    $(".inputdiv").css("display","block")
    axios.get("http://localhost:3005/books?&name_like="+$(".form-control").val()).then(data=>{
        // console.log(data.data.data[1].name);
        if(InputDiv.innerHTML===""){
        for(let i = 0;i<data.data.data.length;i++){
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
            $(".pIput").eq(i).on("click",function(){
                window.location.href = "./books.html?id="+data.data.data[i].id
            })
        }}
    })

})