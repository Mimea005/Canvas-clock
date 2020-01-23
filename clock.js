const 
    canvas = document.getElementById("canvas"),
    digital = document.getElementById("time");
const ctx = canvas.getContext("2d");
const 
    origoX = canvas.width/2,
    origoY = canvas.height/2;


let 
    size = 250,
    fillColor = "#333333",
    refColor = "#ffffff",
    refHourWidth = 10,
    refMinWidth = 8,
    secColor = "#ff0000",
    secWidth = 6,
    minColor = "#33ccee",
    minWidth = 7,
    hourColor = "#ffcc00",
    hourWidth = 8;

let drawClock = function (){
    //clear canvas
    ctx.clearRect(0,0,origoX*2,origoY*2);


    //definerer ny tid
    let time = new Date();

    digital.innerHTML = time.toLocaleTimeString();

    let milisec = time.getMilliseconds(),
        seconds = time.getSeconds() + (milisec/1000),
        minutes = time.getMinutes() + (seconds/60),
        hours = time.getHours() + (minutes/60);

    //Hours referance background
    for (let i = 0; i< 12; i++){
        let angle = i * (Math.PI*2) / 12 - Math.PI/2;

        ctx.beginPath();
        ctx.lineWidth = refHourWidth + 15;
        ctx.strokeStyle = secColor;
        ctx.moveTo(origoX + (size + 35) * (Math.cos(angle)), origoY + (size + 35) * (Math.sin(angle)));
        ctx.lineTo(origoX + (size + 80) * (Math.cos(angle)), origoY + (size + 80) * (Math.sin(angle)));
        ctx.stroke();
    }

    //Hours referance
    for (let i = 0; i < 12; i++){
        let angle = i * (Math.PI*2) / 12 - Math.PI/2;

        ctx.beginPath();
        ctx.lineWidth = refHourWidth;
        ctx.strokeStyle = refColor;
        ctx.moveTo(origoX + (size + 20) * (Math.cos(angle)), origoY + (size + 20) * (Math.sin(angle)));
        ctx.lineTo(origoX + (size + 60) * (Math.cos(angle)), origoY + (size + 60) * (Math.sin(angle)));
        ctx.stroke();
    }

    //shows numbers for 12, 3, 6 and 9
    ctx.textAlign = "center";
    ctx.font = "26px sans-serif";
    for (let i = 1; i <= 4; i++){
        let angle = i * (Math.PI*2)/4 - Math.PI/2;
        ctx.fillText(i*3, origoX + (size + 100) * (Math.cos(angle)), origoY + 10 + (size + 100) * (Math.sin(angle)))
    }

    //shows every 5 minutes between the hour markings
    ctx.font = "16px sans-serif";
    for (let i = 0; i < 12; i++){
        let angle = i * (Math.PI*2)/12 - Math.PI/2;
        if (i==0||i == 3 ||i == 6 ||i == 9){
            continue;
        }
        ctx.fillStyle = "#aaccff";
        ctx.fillText((i/12)*60, origoX + (size + 95) * (Math.cos(angle)), origoY + 5 + (size + 95) * (Math.sin(angle)))
    }

    //seconds/minutes referance background
    for (let i = 0; i < 60; i++){
        let angle = i * (Math.PI*2) / 60 - Math.PI/2;

        if (!(i%5==0)){
            ctx.beginPath();
            ctx.lineWidth = refMinWidth + 10;
            ctx.strokeStyle = refColor;
            ctx.moveTo(origoX + (size + 40) * (Math.cos(angle)), origoY + (size + 40) * (Math.sin(angle)));
            ctx.lineTo(origoX + (size + 70) * (Math.cos(angle)), origoY + (size + 70) * (Math.sin(angle)));
            ctx.stroke();
        }
    }

    //seconds/minutes referance
    for (let i = 0; i < 60; i++){
        let angle = i * (Math.PI*2) / 60 - Math.PI/2;

        if (!(i%5==0)){
            ctx.beginPath();
            ctx.lineWidth = refMinWidth;
            ctx.strokeStyle = minColor;
            ctx.moveTo(origoX + (size + 30) * (Math.cos(angle)), origoY + (size + 30) * (Math.sin(angle)));
            ctx.lineTo(origoX + (size + 60) * (Math.cos(angle)), origoY + (size + 60) * (Math.sin(angle)));
            ctx.stroke();
        }
    }



    //minutes pointer root
    let minAngle = minutes * (Math.PI*2)/60 - Math.PI/2;
    ctx.beginPath();
    ctx.lineWidth = minWidth;
    ctx.strokeStyle = refColor;
    ctx.moveTo(origoX,origoY);
    ctx.lineTo(origoX + (size - 40) * Math.cos(minAngle), origoY + (size - 40) * Math.sin(minAngle));
    ctx.stroke();

    //minutes pointer tip
    ctx.beginPath();
    ctx.lineWidth = minWidth;
    ctx.strokeStyle = minColor;
    ctx.moveTo(origoX + (size - 40) * Math.cos(minAngle), origoY + (size - 40) * Math.sin(minAngle));
    ctx.lineTo(origoX + (size + 5) * Math.cos(minAngle), origoY + (size + 5) * Math.sin(minAngle));
    ctx.stroke();

    //hours pointer root
    let hourAngle = hours * (Math.PI*2)/12 - Math.PI/2;
    ctx.beginPath();
    ctx.lineWidth = hourWidth;
    ctx.strokeStyle = refColor;
    ctx.moveTo(origoX, origoY);
    ctx.lineTo(origoX + (size - 50) * Math.cos(hourAngle), origoY + (size - 50) * (Math.sin(hourAngle)));
    ctx.stroke();

    //hours pointer tip
    ctx.beginPath();
    ctx.lineWidth = hourWidth;
    ctx.strokeStyle = hourColor;
    ctx.moveTo(origoX + (size - 100) * Math.cos(hourAngle), origoY + (size - 100) * Math.sin(hourAngle));
    ctx.lineTo(origoX + (size - 50) * Math.cos(hourAngle), origoY + (size - 50) * (Math.sin(hourAngle)));
    ctx.stroke();

    //seconds pointer
    let secAngle = seconds * (Math.PI*2)/60 - Math.PI/2;
    ctx.beginPath();
    ctx.lineWidth = secWidth;
    ctx.strokeStyle = secColor;
    ctx.moveTo(origoX, origoY);
    ctx.lineTo(origoX + (size + 20) * Math.cos(secAngle), origoY + (size + 20) * (Math.sin(secAngle)));
    ctx.stroke();

    //dekker til midten
    ctx.beginPath();
    ctx.arc(origoX, origoY, 10, 0, Math.PI*2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
}

    
let pross = setInterval(drawClock, 10);