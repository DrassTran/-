
    // 给input框设置搜索事件
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

    let titleinput2 = document.querySelector("#titleinput2")
    let authorinput2 = document.querySelector("#authorinput2")
    let descinput2 = document.querySelector("#descinput2")
    let imgUrl1 = document.querySelector("#imgUrl1");
    let fenshu2 = document.querySelector("#fenshu2");
    async function fun() {
        try {
            let { data: gen } = await axios.get("http://localhost:3005/books?_sort=rate&_order=desc&_start=0");
            // console.log(gen.data);

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
                                value: 0,
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
                function render() {
                    table.render({
                        elem: '#demo',
                        toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
                        , defaultToolbar: ['filter', 'exports', 'print',]
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
                        , data: gen.data
                        //,skin: 'line' //表格风格
                        , even: true
                        , page: true //是否显示分页
                        , limits: [5, 10, 15, 20]
                        , limit: 5 //每页默认显示的数量
                    });
                    //头工具栏事件
                    table.on('toolbar(demo)', function (obj) {
                        var checkStatus = table.checkStatus(obj.config.id);
                        switch (obj.event) {
                            case 'getCheckLength':
                                var data = checkStatus.data;
                                layer.msg('选中了：' + data.length + ' 个');
                                break;
                            case 'isAll':
                                layer.msg(checkStatus.isAll ? '全选' : '未全选');
                                break;
                        };
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
                    });

                }
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