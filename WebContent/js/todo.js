var serviceIP ="http://localhost:8080";  //to access database through rest web service

window.onload = function loadFun(){
	var textValue = document.getElementById("textValue");
	textValue.onkeyup = function (e) {
		//add task on click event
	    if (e.keyCode === 13) {  
	    	insertDataValue(textValue.value);
	    	document.getElementById("textValue").value="";
	    }
	}
	getAllTasks();
}

//insert tasks dynamically
function createDynamicTable(textValue,taskType,taskId){
	var table= document.getElementById("dataTable");
	var len = table.rows.length;
	var taskId,taskStatus;
	var row = table.insertRow(len);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    if(taskType=='P'){
    	cell1.innerHTML = "<img src='../images/pending.png' onclick='updateTaskStatus(\""+taskId+"\",\""+taskType+"\")'></img>";
    }else{
    	cell1.innerHTML = "<img src='../images/completed.png' onclick='updateTaskStatus(\""+taskId+"\",\""+taskType+"\")'></img>";
    }
    cell1.width=40;
    cell2.innerHTML = textValue;
    cell2.width=800;
    cell3.innerHTML = "<img src='../images/remove.png' onclick='deleteTask("+taskId+")'></img>";
    cell3.width=40;
}

//add task into database
function insertDataValue(textVal){
	var xhr = new XMLHttpRequest();
	var url = serviceIP+"/ToDoAppServer/AddNewTask";
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.onreadystatechange = function () {
	    if (xhr.readyState === 4 && xhr.status === 200) {
	        getAllTasks();
	    }
	};
	xhr.send(textVal);
}

//fetch all task from database
function getAllTasks(){
	document.getElementById("allTask").className="active";
	document.getElementById("pendTask").className="inactive";
	document.getElementById("compTask").className="inactive";
	var xhr = new XMLHttpRequest();
	var url = serviceIP+"/ToDoAppServer/ShowTask/A";
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.onreadystatechange = function () {
	    if (xhr.readyState === 4 && xhr.status === 200) {
	        var json = JSON.parse(xhr.responseText);
	        document.getElementById("dataTable").innerHTML="";
	        for(var i in json){
	        	createDynamicTable(json[i].taskDescription,json[i].taskType,json[i].taskID);
	        }
	    }
	};
	xhr.send();
}

//fetch all pending task from database
function getPendingTasks(){
	document.getElementById("allTask").className="inactive";
	document.getElementById("pendTask").className="active";
	document.getElementById("compTask").className="inactive";
	var xhr = new XMLHttpRequest();
	var url = serviceIP+"/ToDoAppServer/ShowTask/P";
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.onreadystatechange = function () {
	    if (xhr.readyState === 4 && xhr.status === 200) {
	        var json = JSON.parse(xhr.responseText);
	        document.getElementById("dataTable").innerHTML="";
	        for(var i in json){
	        	createDynamicTable(json[i].taskDescription,json[i].taskType,json[i].taskID);
	        }
	    }
	};
	xhr.send();
}

//fetch all completed task from database
function getCompleteTasks(){
	document.getElementById("allTask").className="inactive";
	document.getElementById("pendTask").className="inactive";
	document.getElementById("compTask").className="active";
	var xhr = new XMLHttpRequest();
	var url = serviceIP+"/ToDoAppServer/ShowTask/C";
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.onreadystatechange = function () {
	    if (xhr.readyState === 4 && xhr.status === 200) {
	    	var json = JSON.parse(xhr.responseText);
	        document.getElementById("dataTable").innerHTML="";
	        for(var i in json){
	        	createDynamicTable(json[i].taskDescription,json[i].taskType,json[i].taskID);
	        }
	    }
	};
	xhr.send();
}

//update status of pending/completed tasks
function updateTaskStatus(taskId,taskStatus){
	var obj ={
			"taskID": taskId, 
			"taskType": taskStatus
	};
	var xhr = new XMLHttpRequest();
	var url = serviceIP+"/ToDoAppServer/UpdateTask";
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.onreadystatechange = function () {
	    if (xhr.readyState === 4 && xhr.status === 200) {
	        document.getElementById("dataTable").innerHTML="";
	        getAllTasks();
	    }
	};
	xhr.send(JSON.stringify(obj));
}

//delete existing task
function deleteTask(taskId){
	var xhr = new XMLHttpRequest();
	var url = serviceIP+"/ToDoAppServer/DeleteTask";
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.onreadystatechange = function () {
	    if (xhr.readyState === 4 && xhr.status === 200) {
	        document.getElementById("dataTable").innerHTML="";
	        getAllTasks();
	    }
	};
	xhr.send(JSON.stringify(taskId));
}