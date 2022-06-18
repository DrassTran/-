/* 给轮播图添加后台服务器数据 🖼️🖼️🖼️*/
let img = document.querySelectorAll(".img1")
async function change() {
    try {
        let { data: oimg } = await axios({
            method: "get",
            url: "http://localhost:3005/books"
        });
        ;
        for (let i = 0; i <= img.length; i++) {
            $(".img1").eq(i).attr({ 'src': oimg.data[i].coverImg })
        }
        // 点击轮播图里的图片可以跳转页面
        let slide = document.querySelectorAll(".swiper-slide")
        // console.log(slide);
        for (let i = 0; i < slide.length; i++) {
            slide[i].onclick = function () {
                window.location.href = "./books.html?id="+oimg.data[i].id
            }
        }

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
        for(let i = 0;i<paiImg.length;i++){
            console.log(i);
            paiImg[i].onclick = function(){
                window.location.href = "./books.html?id="+paihang.data[i].id
            }
        }
    } catch (e) {
        console.log(e);
    }
}
paih();
