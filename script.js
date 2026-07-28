let light = false;
let hazard = false;
let mode = "web";


// اتصال به VPS
const socket = io("http://45.94.214.62:3000",{
    transports:["websocket"]
});



socket.on("connect",()=>{

    console.log("Connected to VPS");

});



socket.on("disconnect",()=>{

    console.log("Disconnected from VPS");

});



// وضعیت ربات

socket.on("robot_status",(data)=>{

    console.log("Robot Status:",data);

});




// دریافت اطلاعات ESP32

socket.on("robot_data",(data)=>{


    console.log("Robot Data:",data);



    document.getElementById("speed").innerHTML =
        data.speed;



    document.getElementById("direction").innerHTML =
        data.direction;



    if(data.helmet){


        document.getElementById("helmet").innerHTML="ON";


        document.getElementById("helmet").className=
        "value green";


    }

    else{


        document.getElementById("helmet").innerHTML="OFF";


        document.getElementById("helmet").className=
        "value red";


    }




    let arrow="⏹";



    switch(data.direction){


        case "FORWARD":

            arrow="⬆";

        break;



        case "BACKWARD":

            arrow="⬇";

        break;



        case "LEFT":

            arrow="⬅";

        break;



        case "RIGHT":

            arrow="➡";

        break;


        default:

            arrow="⏹";

        break;


    }



    document.getElementById("arrow").innerHTML=arrow;



});






// حرکت

function sendCmd(cmd){


    socket.emit("control",{


        type:"move",


        value:cmd


    });


}




// تغییر حالت

function setMode(value){


    mode=value;


    socket.emit("control",{


        type:"mode",


        value:value


    });


}





// چراغ

function toggleLight(){


    light=!light;



    document.getElementById("lightBtn").innerHTML =

    light ? 
    "💡 Light OFF" :
    "💡 Light ON";




    socket.emit("control",{


        type:"light",


        value:light


    });



}






// فلاشر

function toggleHazard(){


    hazard=!hazard;



    document.getElementById("hazardBtn").innerHTML =


    hazard ? 
    "🚨 Hazard OFF" :
    "🚨 Hazard ON";



    socket.emit("control",{


        type:"hazard",


        value:hazard


    });



}





// GPS

function openGPS(){


    socket.emit("control",{


        type:"gps",


        value:"get"


    });



}




socket.on("gps",(url)=>{


    window.open(url,"_blank");


});







// صفحات

function openPage(index){


    let pages =
    document.getElementsByClassName("page");


    let tabs =
    document.getElementsByClassName("tab");



    for(let i=0;i<pages.length;i++){


        pages[i].classList.remove("show");


        tabs[i].classList.remove("active");


    }




    pages[index].classList.add("show");


    tabs[index].classList.add("active");


}
