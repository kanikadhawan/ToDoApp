<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>ToDo App</title>
<script type="text/javascript" src="./js/todo.js"></script>
<link rel="stylesheet" type="text/css" href="./css/todo.css">
</head>
<body >
<div><input type="text" id="textValue" placeholder="What's on your mind...">
<br>
<a id="allTask" class="active" href="#" onclick="getAllTasks()">All Task</a><label>/</label>
<a id="pendTask" class="inactive" href="#" onclick="getPendingTasks()">Pending Task</a><label>/</label>
<a id="compTask" class="inactive" href="#" onclick="getCompleteTasks()">Completed Task</a>
<br><br><br>
<table id="dataTable"></table>
</div>
</body>
</html>