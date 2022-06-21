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