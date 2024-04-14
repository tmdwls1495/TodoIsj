let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div")
let underLine = document.getElementById("under-line")
let taskList = []
let filterList = []
let mode = "all"
addButton.addEventListener("click", addTask)
taskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});
for(let i=1;i<tabs.length;i++){
    tabs[i].addEventListener("click",function(event){
        filter(event)
    })
}


function addTask(){
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
         isComplete: false
    }
    taskList.push(task);
    render();
}

function render(){
    let resultHTML = "";
    let list =[]
    if (mode === "all"){
        list = taskList;
    }else if(mode === "ongoing" || mode === "done"){
        list = filterList
    }
    for(let i=0;i<list.length;i++){
        if(list[i].isComplete == true) {
            resultHTML += `<div class="task">
            <div class="task-done">${list[i].taskContent}</div>
                <div>
                    <button onclick= "toggleComplete('${list[i].id}')">완료</button>
                    <button onclick= "deleteTask('${list[i].id}')">삭제</button>
                </div>
             </div>`;
        } else {
            resultHTML += `<div class="task">
            <div>${list[i].taskContent}</div>
                <div>
                    <button onclick = "toggleComplete('${list[i].id}')">완료</button>
                    <button onclick = "deleteTask('${list[i].id}')">삭제</button>
                </div>
            </div>`;
        }
    }
    document.getElementById("task-board").innerHTML = resultHTML;
}
function toggleComplete(id) {
    for(let i = 0; i < taskList.length; i++) {
        if(taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
    console.log(taskList);
     
}
function deleteTask(id){
    for(let i = 0; i < taskList.length; i++) {
        if(taskList[i].id == id) {
            taskList.splice(i, 1)
            filterList.splice(i,1)
            break;
        }
    }
    render();
}
function filter(event){
    if (event) {
    underLine.style.width = event.target.offsetWidth + "px";
    console.log(underLine.style.width)
    underLine.style.left = event.target.offsetLeft + "px";
    underLine.style.top =
      event.target.offsetTop + (event.target.offsetHeight - 4) + "px";
    }
    mode = event.target.id;
    filterList = [];
    if (mode === "ongoing"){
        for(let i=0;i < taskList.length;i++){
            if(taskList[i].isComplete === false){
                filterList.push(taskList[i])
            }
        }
        
    }else if(mode === "done"){
        for(let i=0;i < taskList.length;i++){
            if(taskList[i].isComplete === true){
                filterList.push(taskList[i])
            }
        }
        
    }
    render();
    }

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substring(2, 9);
}