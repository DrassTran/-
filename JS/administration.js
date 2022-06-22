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
            if (InputDiv.innerHTML === "") {
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

                }
            }
        }
        if ($(".form-control").val() === "") {
            InputDiv.innerHTML = "",
                fn();
        } else {
            InputDiv.innerHTML = "",
                fn();
        }
    })
})
$(".headerbtn").on("blur", function () {
    setTimeout(val => {
        $(".inputdiv").css("display", "none")
    }, 2000)
})

let titleinput2 = document.querySelector("#titleinput2")
let authorinput2 = document.querySelector("#authorinput2")
let descinput2 = document.querySelector("#descinput2")
let imgUrl1 = document.querySelector("#imgUrl1");
let fenshu2 = document.querySelector("#fenshu2");
async function fun() {
    try {
        let { data: gen } = await axios.get("http://localhost:3005/books?");
        let curr = 1;
        let limit = 5;
        // console.log(gen.data);
        // console.log(excelimgurl);
        layui.use('table', function () {
            var table = layui.table;
            //行工具事件
            table.on('tool(demo)', function (obj) {
                var data = obj.data;
                console.log(data)
                // 给编辑的input搜索框增添内容
                titleinput2.value = data.name;
                authorinput2.value = data.author;
                descinput2.value = data.desc;
                fenshu2.innerText = data.rate
                imgUrl1.value = data.coverImg;
                if (obj.event === 'del') {
                    layer.confirm('真的删除行么', function (index) {
                        obj.del();
                        layer.close(index);
                        console.log(index);
                        let { data: del } = axios.delete("http://localhost:3005/books/" + data.id).then(data => {
                            console.log(data);
                        })
                    });
                } else if (obj.event === 'edit') {
                    //星星
                    layui.use(['rate'], function () {
                        var rate = layui.rate;
                        let obj = {};
                        var ins1 = rate.render({
                            elem: '#star2'
                            , length: 10,
                            value: +$("#fenshu2").text(),
                            half: true,
                            readonely: true,
                            choose: value => {
                                $("#fenshu2").text(value)
                                // console.log(value);
                            }
                        });
                    })
                    layer.open({
                        type: 1,
                        skin: 'layui-layer-rim', //加上边框
                        area: ['750px', '700px'], //宽高
                        content: $('#model2'),
                        btn: ["确认", "取消"],
                        //给编辑按钮里的确定按钮与AJAX相连并渲染到页面🌈🌈🌈
                        yes: function (index, layero) {
                            if ($("#titleinput2").val() === "" || $("#authorinput2").val() === "" || $("#imgur2").val() === "") {
                                return
                            } else {
                                //编辑功能
                                axios({
                                    method: "put",
                                    url: "http://localhost:3005/books/" + data.id,
                                    data: {
                                        name: $("#titleinput2").val(),
                                        author: $("#authorinput2").val(),
                                        desc: $("#descinput2").val(),
                                        rate: +$("#fenshu2").text(),
                                        coverImg: $("#imgUrl1").val(),
                                    },
                                }).then(data => {
                                    console.log('11111111111', data.data);
                                })
                            }
                            window.location.href = "./administration.html"
                        }
                    });
                    layer.title("编辑")
                }
                //给查看设置页面跳转🐟🐟🐟
                else if (obj.event === 'detail') {
                    window.location.assign('./books.html?id=' + data.id)
                }
            });
            //展示已知数据
            function render(data) {

                data = gen.data
                // console.log(data);
                // 分页器
                layui.use('laypage', function (data) {
                    var laypage = layui.laypage;
                    let currendex
                    // 设置总条数🌸🌸🌸
                    for (let i = 0; i < gen.data.length; i++) {
                        currendex = i;
                    }
                    // console.log(currendex);
                    //执行一个laypage实例
                    laypage.render({
                        elem: 'demo7',
                        count: currendex
                        , layout: ['count', 'prev', 'page', 'next', 'limit', 'skip'],
                        limit: 5,
                        limits: [5, 10, 20, 30, 50],
                        pages: 1
                        , jump: function (obj) {
                            curr = obj.curr;
                            limit = obj.limit
                            console.log(curr);
                            let { data: fenye } = axios.get(`http://localhost:3005/books?_sort=rate&_order=desc&_page=${obj.curr}&_limit=${obj.limit}`).then(data => {
                                console.log();
                                // console.log(data.data.data);
                                datashow(data.data);
                            })
                            // console.log(fenye);
                        }
                    });
                });
                
                //头工具栏事件
                table.on('toolbar(demo)', function (obj) {
                    var checkStatus = table.checkStatus(obj.config.id);
                    // 给页面添加新增按钮😝😝😝
                    if (obj.event === "add") {
                        //星星
                        layui.use(['rate'], function () {
                            var rate = layui.rate;
                            let obj = {};
                            var ins1 = rate.render({
                                elem: '#test8'
                                , length: 10
                                , //初始值
                                half: true,
                                readonely: true,
                                choose: value => {
                                    $("#fenshu1").text(value)
                                }
                            });
                        })
                        //页面层
                        layer.open({
                            type: 1,
                            skin: 'layui-layer-rim', //加上边框
                            area: ['750px', '700px'], //宽高
                            content: $('#model1'),
                            btn: ["确认", "取消"],
                            //给新增按钮里的立即提交按钮与AJAX相连并渲染到页面🌈🌈🌈
                            yes: function (index, layero) {
                                if ($("#titleinput").val() === "" || $("#authorinput").val() === "" || $("#imgurl").val() === "") {
                                    return
                                } else {
                                    //按钮【确认按钮】的回调⛲⛲⛲
                                    axios({
                                        method: "post",
                                        url: `http://localhost:3005/books`,
                                        data: {
                                            name: $("#titleinput").val(),
                                            author: $("#authorinput").val(),
                                            desc: $("#descinput").val(),
                                            coverImg: $("#imgurl").val(),
                                            rate: +$("#fenshu1").text(),
                                        }
                                    }).then(data => {
                                        console.log(data.data);
                                    })
                                    window.location.href = "./administration.html"
                                }
                            }
                        });
                        layer.title("新增");
                    }
                    // 导出Excel功能🌮🌮🌮
                    if (obj.event === "excel") {
                        console.log(gen.data);
                        let aoa = [["书名", "封面图", "作者", "简介"]]
                        gen.data.forEach(item => {
                            let arr = [];
                            arr[0] = item.name;
                            arr[1] = item.coverImg;
                            arr[2] = item.author;
                            arr[3] = item.desc;
                            aoa.push(arr);
                        });
                        var sheet = XLSX.utils.aoa_to_sheet(aoa);
                        openDownloadDialog(sheet2blob(sheet), '书籍.xlsx');
                    }
                    // console.log(gen.data.data);
                });
            }
            // 展示数据
            function datashow(data) {
                table.render({
                    elem: '#demo',
                    toolbar: '#toolbarDemo', //开启头部工具栏，并为其绑定左侧模板
                    autoSort: false
                    , defaultToolbar: ['print',]
                    , title: '书籍管理', cols: [[ //标题栏
                        { type: 'checkbox' }
                        , { field: 'name', title: '书名', width: 140, unresize: true, sort: true },
                        {
                            field: 'coverImg', title: '封面图', width: 220, templet: function (url) {
                                return `<img src=${url.coverImg} >`
                            }
                        }
                        , { field: 'author', title: '作者', width: 180, edit: 'text' }
                        , { field: 'desc', title: '简介', width: 320, edit: 'text' }
                        , {
                            field: 'rate', title: '评分', width: 400, sort: true, templet: function (d) {
                                let i = d.LAY_INDEX
                                layui.use('rate', function () {
                                    // console.log("111111111111111", d.rate);
                                    var rate = layui.rate;
                                    //渲染
                                    let obj = {}
                                    var ins1 = rate.render({
                                        elem: '.bookXing' + i  //绑定元素
                                        , length: 10
                                        , half: true
                                        , value: d.rate
                                        , readonly: true,
                                    });
                                });
                                i++
                                return `<div class = "bookXing${i}"></div>`
                            }
                        }
                        , { title: '操作', toolbar: '#barDemo', width: 200 },
                    ]]
                    , data: data.data
                });
            }
            // 创建容器存储正排序asc函数排序id名
            function ascname() {
                let { data: gs } = axios({
                    method: "get",
                    url: "http://localhost:3005/books?_sort=id&_order=asc&_page="+curr+"&_limit="+limit,
                }).then(data => {
                    datashow(data.data);
                })
            }
            // 创建容器存储逆排序desc函数排序id名
            function descname() {
                let { data: gs } = axios({
                    method: "get",
                    url: "http://localhost:3005/books?_sort=id&_order=desc&_page="+curr+"&_limit="+limit,
                }).then(data => {
                    datashow(data.data);
                })

            }
            // 创建容器存储正排序asc函数排序评分
            function ascrate() {
                let { data: gs } = axios({
                    method: "get",
                    url: "http://localhost:3005/books?_sort=rate&_order=asc&_page="+curr+"&_limit="+limit,
                }).then(data => {
                    datashow(data.data);
                })
            }
            // 创建容器存储逆排序desc函数排序rate评分
            function descrate() {
                let { data: gs } = axios({
                    method: "get",
                    url: "http://localhost:3005/books?_sort=rate&_order=desc&_page="+curr+"&_limit="+limit,
                }).then(data => {
                    datashow(data.data);
                })
            }
            //触发排序事件
            table.on('sort(demo)', function (obj) { //注：sort 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
                console.log(obj);
                if (obj.field === "name") {
                    if (obj.type === "asc") {
                        ascname()

                    } else if (obj.type === "desc") {
                        descname()

                    }
                } else if (obj.field === "rate") {
                    if (obj.type === "asc") {
                        ascrate()

                    } else if (obj.type === "desc") {
                        descrate()
                    }
                }
                /* 
                ----------------------------------------------------------------------------------
                
                */
                console.log(obj.field); //当前排序的字段名
                console.log(obj.type); //当前排序类型：desc（降序）、asc（升序）、null（空对象，默认排序）
                console.log(this); //当前排序的 th 对象

            });
            render();
        });
    } catch (e) {
        console.log(e);
    }
}
fun()

/* 毁灭吧该死的页面。
💀💀💀💀💀💀     
💀          💀
💀          💀           
💀💀💀💀💀💀             
💀          💀   
💀          💀           
💀          💀                     
💀💀💀💀💀💀            
 
*/

/**
 * 通用的打开下载对话框方法，没有测试过具体兼容性
 * @param url 下载地址，也可以是一个blob对象，必选
 * @param saveName 保存文件名，可选
 */
function openDownloadDialog(url, saveName) {
    if (typeof url == 'object' && url instanceof Blob) {
        url = URL.createObjectURL(url); // 创建blob地址
    }
    var aLink = document.createElement('a');
    aLink.href = url;
    aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
    var event;
    if (window.MouseEvent) event = new MouseEvent('click');
    else {
        event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    }
    aLink.dispatchEvent(event);
}

// 将一个sheet转成最终的excel文件的blob对象，然后利用URL.createObjectURL下载
function sheet2blob(sheet, sheetName) {
    sheetName = sheetName || 'sheet1';
    var workbook = {
        SheetNames: [sheetName],
        Sheets: {}
    };
    workbook.Sheets[sheetName] = sheet;
    // 生成excel的配置项
    var wopts = {
        bookType: 'xlsx', // 要生成的文件类型
        bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
        type: 'binary'
    };
    var wbout = XLSX.write(workbook, wopts);
    var blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });
    // 字符串转ArrayBuffer
    function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }
    return blob;
}
// 设置返回顶部按钮的点击事件
$(document).ready(function () {
    $(window).scroll(function () {
        if ($(document).scrollTop() == 0) {
            $(".up").hide();
        }
        else if ($(document).scrollTop() > 300) {
            $(".up").show();
            $(".upimg").on("click", function () {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                });
            })
        }
    });
});
