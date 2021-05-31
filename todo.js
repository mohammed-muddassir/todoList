
//for date
//for hour
$("#no-tasks").css("display","block"); 

function formatHour(num){
    if(num>12){
        num=num-12;
        if(num<10){
            num="0"+num.toString();
        }
    }
    return num.toString()
}

//for month and day
function formatDate(number){
    if(number<10){
        return "0"+number.toString();
    }
    else{
        return number.toString();
    }
    
}

//for time
function time(){
        var currentTime;
        var currTime=new Date();
        var hours=currTime.getHours();
        var minutes=currTime.getMinutes();
        /* var seconds=currTime.getSeconds(); */
        currentTime=(formatHour(parseInt(hours))+":"+formatDate(minutes)/* +":"+formatDate(seconds) */);
        return currentTime;
}
//for time-formatting

function format(x){
    if(x<10){
        x="0"+x.toString();
    }
    return x;
}

 //variables for time

var currdate=new Date().getDate();
var month=new Date().getMonth()+1;
var currentYear=new Date().getFullYear();
var currday = new Date();

//for day 

var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

var n = weekday[currday.getDay()]; //DAY

var newDate=format(currdate)+":"+format(month)+":"+format(currentYear); //current Date

//html for date and day

$("#date").html(newDate);
$("#day").html(n);

//A D D I N G T A S K S

$("#addtask").click(function(){
    $("#addingtasks").css("display","block");
});




$("#check").click(function(){ //when the tick icon is clicked
    var todo=$("input").val(); //in the input field
     if(todo.trim()!=""){
            if(localStorage.getItem('list')==null && localStorage.getItem('listTime')==null)
            {
                items=[];
                assignedTime=[];
                store(todo,items,assignedTime,time());//to add elements to loc.Strorage and arrays
            }
            else{

                items=JSON.parse(localStorage.getItem('list'));
                assignedTime=JSON.parse(localStorage.getItem('listTime')); //parsing these two arrays to add new elements to storage


                store(todo,items,assignedTime,time()); //to add elements in loc.Storage

                var b=JSON.parse(localStorage.getItem('list'));
                var c=JSON.parse(localStorage.getItem('listTime'));
                $("#expand").css({'transform' : 'rotate('+ 275 +'deg)'});
                ordered(b,c);

            }
            
    }
    else{
        alert("No task assigned");
    }
    
    $("input").val("");  //to disappear those tags when a task is entered
    $("#addingtasks").css("display","none");
});

$("input").keypress(function(event) { //incase if a user presses an enter key, it is prevented by taking default action
   
    if ( event.keyCode == 13 ) {
        
        event.preventDefault();
        $("#addingtasks").css("display","block");
    }

});

function store(todo,items,assignedTime,current){
    items.push(todo); //to local storage
    assignedTime.push(current);
    localStorage.setItem('list', JSON.stringify(items));
    localStorage.setItem('listTime', JSON.stringify(assignedTime));
    ordered(items,assignedTime);

    
}
//--------------------------------------------------------


$("#todolist").html(""); //initially the tasks are hided,if ASSIGNED or the down icon is clicked it shows the tasks


$("#work").click(function(){  //assigned icon
    
    if(localStorage.getItem('list')==null){
        $("#no-tasks").css("display","none");
    }

    if($("#todolist").html()==""){ //if the tasks are hided we populate
               $("#expand").css({'transform' : 'rotate('+ 360 +'deg)'});
                var user=JSON.parse(localStorage.getItem('list') );
                var userTime=JSON.parse(localStorage.getItem('listTime') );
                ordered(user,userTime);
                
         
    }
    else{
        //if the tasks are populated we are hiding it
        $("#expand").css({'transform' : 'rotate('+ 180 +'deg)'});
        $("#todolist").html("");
        
    }

    
});


var m;

function ordered(user,userTime){
    $("#todolist").html(""); 
    if(user!=null){
        for(var n=0;n<user.length;n++){
            m=n;
            var userList="<li>"+user[n]+"<span>"+userTime[n]+"</span>"+"<i onclick='deletetask("+m+")'; class='material-icons' id='iconns'>"+'delete'+"</i>"+"</li>";
            $("#todolist").append(userList);
            
        }
    
    }
    $("#no-tasks").css("display","none"); 

}

function deletetask(m){
    items=JSON.parse(localStorage.getItem('list'));
    assignedTime=JSON.parse(localStorage.getItem('listTime'));
    items.splice(m,1);
    assignedTime.splice(n,1);
    localStorage.setItem('list',JSON.stringify(items));
    localStorage.setItem('listTime',JSON.stringify(assignedTime));
    ordered(items,assignedTime);
    
}



