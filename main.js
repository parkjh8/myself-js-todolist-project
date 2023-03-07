//인풋 입력후 버튼 클릭 시 text 탭으로 이동
//text내용을 끝낼시 진행ok버튼을 눌러 text내용에 밑줄
//밑줄친 상태에서 진행ok버튼을 다시 클릭 시 밑줄 제거

//삭제 버튼 클릭시 해당 text내용 없애기

//노란 탭에서 모두 진행중 끝 탭을 클릭시 해당 앱으로 이동


let inputarea = document.getElementById("input-area");
let contentbutton = document.getElementById("content-button");
let tabs=document.querySelectorAll(".meun-area div")
let taskList=[];
let filterList=[];
let mode="all";

for (let i=0;i<tabs.length;i++){
 tabs[i].addEventListener("click",function(event){filter(event);});
}


contentbutton.addEventListener("click",content)


function content(){
    task = {content:inputarea.value,
            excess:false,
            id:generaterandom()}
    taskList.push(task)
    console.log(taskList)
    render()
}

function render(){
    list=[];
    let resultHTML = "";
    if(mode =="all"){
        list = taskList;
    } else if(mode=="ing" || mode=="done"){
        list = filterList;
    }
    for(let i =0;i<list.length;i++){
        if(list[i].excess==false) {
        resultHTML += `<div id="text-area">
        <div>${list[i].content}</div>
        <div>
          <button onclick="contiune(${list[i].id})">진행완료</button>
          <button onclick="deletebutton(${list[i].id})">삭제</button>
        </div>
      </div>`;
    } else{
        resultHTML +=`<div id="text-area">
        <div class="text">${list[i].content}</div>
        <div>
          <button onclick="contiune(${list[i].id})">진행완료</button>
          <button onclick="deletebutton(${list[i].id})">삭제</button>
        </div>
      </div>`;
    }
    
    document.getElementById("context-area").innerHTML=resultHTML
    }
}

function contiune(id){
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList[i].excess = !taskList[i].excess
            break;
        }
    }
    render();
    console.log(taskList)

}

function deletebutton(id){
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList.splice(i,1)
            break;
        }
    }
    render();
    console.log(taskList)

}



function filter(event){
    mode = event.target.id
    filterList=[];
    if(mode =="ing"){
        for(let i =0; i<taskList.length;i++){
            if(taskList[i].excess==true){
                filterList.push(taskList[i]);
            }
        }
    } else if(mode=="done"){
        for(let i=0; i<taskList.length;i++){
            if(taskList[i].excess==false){
                filterList.push(taskList[i]);
            }
        }
       
    }
    render();
}   


function generaterandom(){
    return new Date().getTime() + Math.random();
}