var x = location.hash;
var z = x.substring(1);
if(z!='')
{
var database = firebase.database();
document.title = "Forum Application || User - " +z;
localStorage.setItem("username",z);
var c = document.getElementById('jumb');
c.innerHTML=z;
var container;
var increment=0 ;
var myVar = setInterval(load, 10000);
var topicinformation ;
var mode = localStorage.getItem("mode");
	var pagestyle = document.getElementById('pagestyle');
	if(mode == "dark"){
		pagestyle.setAttribute('href', 'css/dark.css');
	}
	else if (mode == "advance") {
		pagestyle.setAttribute('href', 'css/advance.css');
	}
	else {
		pagestyle.setAttribute('href', 'css/style.css');
	}
load();
function logout()
{
	var a = confirm('Are you sure ?');
	if(a==true)
	{
  window.location="index.html#"+z;
}
else {
	location.reload();
}
}
function addTopic()
{
  container = document.getElementById('containerdo2');
  document.getElementById('myModal').style.display="none";
  document.getElementById('c').style.visibility="visible";
  topicinformation = document.getElementById('topicinformation').value;
  if(topicinformation!='')
  {
  save();
  topicinformation.value='';
  load();
}
}
function save()
{
  database.ref('topics/').push(
      { topic:topicinformation,
         by:z
       }
  );
}
function load()
{
  var container = document.getElementById('containerdo2');
  var comment = document.getElementById('comment');
  database.ref('topics/').once('value').then(function(snapshot) {
    for (var i in snapshot.val()) {
      container.innerHTML += "<div id="+i+"><img src='./img/topic.png' width='25px' id='img2'><h4 id='topic'>&nbsp&nbsp&nbsp<a href='comment.html#"+snapshot.val()[i].topic+"'>"+snapshot.val()[i].topic+"</a> by "+snapshot.val()[i].by+" </h4> </div><hr>";
  database.ref('comment/'+snapshot.val()[i].topic).once('value').then(function(snapshot) {
    for (var z in snapshot.val()) {
      increment++;
    }
    comment.innerHTML +="<h6>Number of comments <span class='label label-default'>"+increment+"</span></h6>";
  increment=0;
  });
}});
comment.innerHTML = "";
container.innerHTML='';
}
function newM()
{
  document.getElementById('myModal').style.display="inline-block";
  document.getElementById('c').style.visibility="hidden";
  document.getElementById('adt').style.visibility="hidden";
}
function ss()
{
  document.getElementById('myModal').style.display="none";
  document.getElementById('c').style.visibility="visible";
  document.getElementById('adt').style.visibility="visible";
}
function clearContent(element)
{
  element.value='';
}
}
