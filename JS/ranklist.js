
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


// 添加上Eachers排行榜
axios.get("http://localhost:3005/books?_sort=rate&_order=desc&_start=0&_limit=10").then(data => {
    console.log(data.data.data);
    var booksname = [];
    var booksrate = [];
    for (let i = 0; i < data.data.data.length; i++) {
        booksname[i] = data.data.data[i].name
        booksrate[i] = data.data.data[i].rate
    }
    console.log(booksrate);
    // 排行榜数据渲染
    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);
    var data = booksrate;
    var titlename = booksname;
    var valdata = booksrate;
    var myColor = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"];
    option = {
        backgroundColor: "#0e2147",
        xAxis: {
            show: false,
        },
        yAxis: [
            {
                show: true,
                data: titlename,
                inverse: true,
                axisLine: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    textStyle: {
                        fontSize:15,
                        color: function (value, index) {
                            var num = myColor.length;
                            return myColor[index % num];
                        },
                    },
                    formatter: function (value, index) {
                        return ["{title|" + value + "} "].join("\n");
                    },
                    rich: {},
                },
            },
            {
                show: true,
                inverse: true,
                data: valdata,
                axisLabel: {
                    textStyle: {
                        fontSize:15,
                        color: function (value, index) {
                            var num = myColor.length;
                            return myColor[index % num];
                        },
                    },
                },
                axisLine: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
            },
        ],
        series: [
            {
                name: "条",
                type: "bar",
                yAxisIndex: 0,
                data: data,
                barWidth:20,
                itemStyle: {
                    normal: {
                        barBorderRadius: 20,
                        color: function (params) {
                            var num = myColor.length;
                            return myColor[params.dataIndex % num];
                        },
                    },
                },
                label: {
                    normal: {
                        fontSize:15,
                        show: true,
                        position: "inside",
                        formatter: "{c}星",
                    },
                },
            },
        ],
    };
    myChart.setOption(option);
})
// ------------------------------------------------------------------------------------------------------------------------------------------------
/*
 *                                                     __----~~~~~~~~~~~------___
 *                                    .  .   ~~//====......          __--~ ~~
 *                    -.            \_|//     |||\\  ~~~~~~::::... /~
 *                 ___-==_       _-~o~  \/    |||  \\            _/~~-
 *         __---~~~.==~||\=_    -_--~/_-~|-   |\\   \\        _/~
 *     _-~~     .=~    |  \\-_    '-~7  /-   /  ||    \      /
 *   .~       .~       |   \\ -_    /  /-   /   ||      \   /
 *  /  ____  /         |     \\ ~-_/  /|- _/   .||       \ /
 *  |~~    ~~|--~~~~--_ \     ~==-/   | \~--===~~        .\
 *           '         ~-|      /|    |-~\~~       __--~~
 *                       |-~~-_/ |    |   ~\_   _-~            /\
 *                            /  \     \__   \/~                \__
 *                        _--~ _/ | .-~~____--~-/                  ~~==.
 *                       ((->/~   '.|||' -_|    ~~-/ ,              . _||
 *                                  -_     ~\      ~~---l__i__i__i--~~_/
 *                                  _-~-__   ~)  \--______________--~~
 *                                //.-~~~-~_--~- |-------~~~~~~~~
 *                                       //.-~~~--\
 *                       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * 
 *                               神兽保佑            永无BUG
 */