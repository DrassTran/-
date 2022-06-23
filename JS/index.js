
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
/* 给轮播图添加后台服务器数据 🖼️🖼️🖼️*/
let Rotation = document.getElementById("Rotation")
var swiper;
async function change() {
    try {
        let { data: oimg } = await axios({
            method: "get",
            url: "http://localhost:3005/books"
        });
        // console.log(oimg);
        for (let i = 0; i < oimg.data.length; i++) {
            let lunboDiv = document.createElement("div");
            lunboDiv.classList.add("swiper-slide");
            let luboImg = document.createElement("img")
            luboImg.classList.add("img1")
            lunboDiv.appendChild(luboImg)
            Rotation.appendChild(lunboDiv)
            $(".img1").eq(i).attr({ 'src': oimg.data[i].coverImg })
            // 点击轮播图里的图片可以跳转页面
            $(".img1").eq(i).on("click", function () {
                window.location.href = "./books.html?id=" + oimg.data[i].id
            })
        }
        // console.log("1111111111",oimg.data);
        // 给轮播图添加效果💟
        swiper = new Swiper('.swiper-container', {
            slidesPerView: 3,
            spaceBetween: 30,
            centeredSlides: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            loop: true,
            autoplay: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
        // console.log("11111111111",img);

    } catch (e) {
        console.log(e);
    }
}
change();

let paiImg = document.querySelectorAll(".paiimg")
// console.log(paiImg[1]);
//使用AJAX渲染主页排行榜🦄🦄🦄
async function paih() {
    try {
        let { data: paihang } = await axios.get("http://localhost:3005/books?_sort=rate&_order=desc&_start=0&_limit=5");
        for (let i = 0; i < paiImg.length; i++) {
            $(".paiimg").eq(i).attr({ 'src': paihang.data[i].coverImg })
            // console.log(paihang.data[i]);
            //给排行榜添加跳转页面效果
        }
        for (let i = 0; i < paiImg.length; i++) {
            // console.log(i);
            paiImg[i].onclick = function () {
                window.location.href = "./books.html?id=" + paihang.data[i].id
            }
        }
    } catch (e) {
        console.log(e);
    }
}
paih();
// 返回顶部按钮
$(document).ready(function () {
    $(window).scroll(function () {
        if ($(document).scrollTop() === 0) {
            $(".up").hide();
        }
        else if ($(document).scrollTop() > 10) {
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

/*
 *                        ::
 *                       :;J7, :,                        ::;7:
 *                       ,ivYi, ,                       ;LLLFS:
 *                       :iv7Yi                       :7ri;j5PL
 *                      ,:ivYLvr                    ,ivrrirrY2X,
 *                      :;r@Wwz.7r:                :ivu@kexianli.
 *                     :iL7::,:::iiirii:ii;::::,,irvF7rvvLujL7ur
 *                    ri::,:,::i:iiiiiii:i:irrv177JX7rYXqZEkvv17
 *                 ;i:, , ::::iirrririi:i:::iiir2XXvii;L8OGJr71i
 *               :,, ,,:   ,::ir@mingyi.irii:i:::j1jri7ZBOS7ivv,
 *                  ,::,    ::rv77iiiriii:iii:i::,rvLq@huhao.Li
 *              ,,      ,, ,:ir7ir::,:::i;ir:::i:i::rSGGYri712:
 *            :::  ,v7r:: ::rrv77:, ,, ,:i7rrii:::::, ir7ri7Lri
 *           ,     2OBBOi,iiir;r::        ,irriiii::,, ,iv7Luur:
 *         ,,     i78MBBi,:,:::,:,  :7FSL: ,iriii:::i::,,:rLqXv::
 *         :      iuMMP: :,:::,:ii;2GY7OBB0viiii:i:iii:i:::iJqL;::
 *        ,     ::::i   ,,,,, ::LuBBu BBBBBErii:i:i:i:i:i:i:r77ii
 *       ,       :       , ,,:::rruBZ1MBBqi, :,,,:::,::::::iiriri:
 *      ,               ,,,,::::i:  @arqiao.       ,:,, ,:::ii;i7:
 *     :,       rjujLYLi   ,,:::::,:::::::::,,   ,:i,:,,,,,::i:iii
 *     ::      BBBBBBBBB0,    ,,::: , ,:::::: ,      ,,,, ,,:::::::
 *     i,  ,  ,8BMMBBBBBBi     ,,:,,     ,,, , ,   , , , :,::ii::i::
 *     :      iZMOMOMBBM2::::::::::,,,,     ,,,,,,:,,,::::i:irr:i:::,
 *     i   ,,:;u0MBMOG1L:::i::::::  ,,,::,   ,,, ::::::i:i:iirii:i:i:
 *     :    ,iuUuuXUkFu7i:iii:i:::, :,:,: ::::::::i:i:::::iirr7iiri::
 *     :     :rk@Yizero.i:::::, ,:ii:::::::i:::::i::,::::iirrriiiri::,
 *      :      5BMBBBBBBSr:,::rv2kuii:::iii::,:i:,, , ,,:,:i@petermu.,
 *           , :r50EZ8MBBBBGOBBBZP7::::i::,:::::,: :,:,::i;rrririiii::
 *               :jujYY7LS0ujJL7r::,::i::,::::::::::::::iirirrrrrrr:ii:
 *            ,:  :@kevensun.:,:,,,::::i:i:::::,,::::::iir;ii;7v77;ii;i,
 *            ,,,     ,,:,::::::i:iiiii:i::::,, ::::iiiir@xingjief.r;7:i,
 *         , , ,,,:,,::::::::iiiiiiiiii:,:,:::::::::iiir;ri7vL77rrirri::
 *          :,, , ::::::::i:::i:::i:i::,,,,,:,::i:i:::iir;@Secbone.ii:::
 */
