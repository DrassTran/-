/* 给轮播图添加后台服务器数据 🖼️🖼️🖼️*/
let Rotation = document.getElementById("Rotation")
var swiper;
async function change() {
    try {
        let { data: oimg } = await axios({
            method: "get",
            url: "http://localhost:3005/books"
        });
        console.log(oimg);
        for (let i = 0; i < oimg.data.length; i++) {
            let lunboDiv = document.createElement("div");
            lunboDiv.classList.add("swiper-slide");
            let luboImg = document.createElement("img")
            luboImg.classList.add("img1")
            lunboDiv.appendChild(luboImg)
            Rotation.appendChild(lunboDiv)
            $(".img1").eq(i).attr({ 'src': oimg.data[i].coverImg })
            // 点击轮播图里的图片可以跳转页面
            $(".img1").eq(i).on("click",function(){
                window.location.href = "./books.html?id="+oimg.data[i].id
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
        let { data: paihang } = await axios.get("http://localhost:3005/books?_sort=rate&_order&_start=0&_limit=5");
        for (let i = 0; i < paiImg.length; i++) {
            $(".paiimg").eq(i).attr({ 'src': paihang.data[i].coverImg })
            // console.log(paihang.data[i]);
            //给排行榜添加跳转页面效果
        }
        for (let i = 0; i < paiImg.length; i++) {
            console.log(i);
            paiImg[i].onclick = function () {
                window.location.href = "./books.html?id=" + paihang.data[i].id
            }
        }
    } catch (e) {
        console.log(e);
    }
}
paih();