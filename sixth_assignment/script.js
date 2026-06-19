const taskName= document.querySelector("#task-title");
const form = document.querySelector("form");
const task= document.querySelector(".task");
let rmAll= document.querySelector("#rm-all-btn")
const search = document.querySelector("#search")
const grandParent = document.querySelector(".grand-parent");
const parent = document.querySelector(".parent");
const child = document.querySelector(".child");

const bubbleBtn = document.querySelector("#bubble-btn");
const captureBtn = document.querySelector("#capture-btn");

const logBox = document.querySelector(".log-box");

let mode="bubbling"

let taskArr= JSON.parse(localStorage.getItem("task"))||[]

let updateIndex=null;

bubbleBtn.addEventListener("click", () => {

    logBox.innerHTML = "";

    grandParent.addEventListener("click", () => {
        logBox.innerHTML += "Grand Parent <br>";
    }, false);

    parent.addEventListener("click", () => {
        logBox.innerHTML += "Parent <br>";
    }, false);

    child.addEventListener("click", () => {
        logBox.innerHTML += "Child <br>";
    }, false);

});
captureBtn.addEventListener("click", () => {

    logBox.innerHTML = "";

    grandParent.addEventListener("click", () => {
        logBox.innerHTML += "Grand Parent <br>";
    }, true);

    parent.addEventListener("click", () => {
        logBox.innerHTML += "Parent <br>";
    }, true);

    child.addEventListener("click", () => {
        logBox.innerHTML += "Child <br>";
    }, true);

});
form.addEventListener("submit",(event)=>{
event.preventDefault();
let Tname= event.target[0].value;
let tType= event.target[1].value;

let obj={
    Tname,
    tType,
    tStatus:"pending"
}

if(obj.Tname.trim()==="") return alert("you have empty fields");
 

if(updateIndex!==null){
taskArr[updateIndex]=obj;
localStorage.setItem("task",JSON.stringify(taskArr))
updateIndex=null
form.reset();
ui(taskArr)
   
    
}
else{
 console.log(obj)
    taskArr.push(obj); 
    form.reset()
    localStorage.setItem("task",JSON.stringify(taskArr))
    ui(taskArr);
    console.log(taskArr)
}


})
rmAll.addEventListener('click',(delAll))

function ui(array){
    task.innerHTML=""
    array.forEach((t,index)=>{
        task.innerHTML+=`<div class="task-card">
                        <div id="task-detail">
                            <h1 id="task-name">${t.Tname}</h1>
                             <div id="task-types">
                                <div class="task-type"> <p>${t.tType}</p></div>
                                <div class="task-status"> <p>${t.tStatus}</p></div>
                             </div>
                        </div>
                        <div class="task-editing">
                            <button onclick="edit(${index})">🖊️</button>
                            <button onclick="complete(${index})">✔️</button>
                            <button onclick="del(${index})">🗑️</button>
                        </div>
                       
                    </div>`

    })
}

function del(index){
taskArr.splice(index,1);
localStorage.setItem("task",JSON.stringify(taskArr));
ui(taskArr);

}

function delAll(){
    taskArr=[]
    localStorage.setItem("task",JSON.stringify(taskArr));
    ui(taskArr);
}
console.log(typeof(taskArr))
ui(taskArr);

search.addEventListener('input',(data)=>{
console.log(search.value);
let val= data.target.value.trim();


if(val===""){
ui(taskArr)
}
else{
let searchedElement= taskArr.filter((elem)=>{
    return elem.Tname.toLowerCase().includes(val)

})
ui(searchedElement)
console.log(searchedElement)
}


})

function edit(index){
let updateElem= taskArr[index];
console.log(updateElem)
taskName.value=taskArr[index].Tname;
updateIndex=index;

}

function complete(index){
    if(taskArr[index].tStatus === "pending"){
        taskArr[index].tStatus = "completed";
    }
    else{
        taskArr[index].tStatus = "pending";
    }

    localStorage.setItem("task", JSON.stringify(taskArr));
    ui(taskArr);
}
function logMessage(msg){
    logBox.innerHTML += `${msg}<br>`;
}