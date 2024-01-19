var total = document.querySelector("#total"),
    safty = document.querySelector("#safty"),
    conv = document.querySelector("#conv"),
    infoDiv = document.querySelector('#infoDiv'),
    checkBtn = document.querySelector('#check_btn'),
    selected = document.querySelector('#preference');


// checkBtn.addEventListener('click',totalScore);
// selected.addEventListener('change',totalScore);


// document.querySelectorAll('.graphBar').forEach(function(e) {
//     e.addEventListener('mouseover', function(e) {
//         infoDiv.style.display = 'flex';
//         infoDiv.style.left = e.pageX+8 + 'px';
//         infoDiv.style.top = e.pageY+12 + 'px';
// })})
// document.querySelectorAll('.graphBar').forEach(function(e) {
//     e.addEventListener('mouseout',function() {
//         infoDiv.style.display = 'none';
// })})
// document.querySelectorAll('.graphBar').forEach(function(e) {
//     e.addEventListener('mousemove',function(e) {
//         infoDiv.style.left = e.pageX+8 + 'px';
//         infoDiv.style.top = e.pageY+12 + 'px';
// })})
// //각 그래프마다 다른 설명 입력
// total.addEventListener('mouseover', function() {
//     document.querySelector('#infoDivDetail').innerHTML = iconChange(total);
//     document.querySelector('#infoDivScore').innerHTML = Math.round(parseFloat(total.style.width)) + "점"
// })
// safty.addEventListener('mouseover', function() {
//     document.querySelector('#infoDivDetail').innerHTML = iconChange(safty);
//     document.querySelector('#infoDivScore').innerHTML = Math.round(parseFloat(safty.style.width)) + "점"
// })
// conv.addEventListener('mouseover', function() {
//     document.querySelector('#infoDivDetail').innerHTML = iconChange(conv);
//     document.querySelector('#infoDivScore').innerHTML = Math.round(parseFloat(conv.style.width)) + "점"
// })

// function colorChange(e, value) {
//     e.style.width = value + "%";

//     if (Math.round(parseFloat(e.style.width)) < 30) {
//         e.style.backgroundColor = '#1c498d';
//     } else if (Math.round(parseFloat(e.style.width)) >= 70) {
//         e.style.backgroundColor = '#6da7ff';
//     } else {
//         e.style.backgroundColor = '#4082e6';
//     }
// }

// function iconChange(e) {
//     if (Math.round(parseFloat(e.style.width)) < 30) {
//         return '<i class="fa-solid fa-face-angry fa-2xl"></i>';
//     } else if (Math.round(parseFloat(e.style.width)) >= 70) {
//         return '<i class="fa-solid fa-face-laugh-beam fa-2xl"></i>';
//     } else {
//         return '<i class="fa-solid fa-face-smile fa-2xl"></i>';
//     }
// }

// function totalScore() {
//     var sfScore = parseFloat(safty.style.width),
//         cvScore = parseFloat(conv.style.width),
//         value;
//     if (selected.value === 'none') {
//         value = (sfScore + cvScore)/2;
//     } else if (selected.value === 'safty') {
//         value = (sfScore*1.3 + cvScore*0.7)/2;
//     } else {
//         value = (cvScore*1.3 + sfScore*0.7)/2;
//     }
    
//     if (checkBtn.checked) {
//         getDensity(circle.getPosition(), async function(callback) {
//             value = await value * (Math.min((callback.density/50),1)*0.1 + 1)
//             total.style.width = value + "%";
//             colorChange(total, value);
//         });
//     } else {
//         total.style.width = value + "%";
//         colorChange(total, value);
//     }

// }

function saftyScore(callbacks, latlng, finalCallback) {
    const results = [];
    let count = 0;
  
    callbacks.forEach((callback, index) => {
      callback(latlng, (result) => {
        results[index] = result;
        count++;
  
        if (count === callbacks.length) {
          finalCallback(results);
        }
      });
    });
    // // R 데이터 분석을 통한 검거율 상관분석 회귀식
    // var arrest_rate = 0.8104 - 3374*Math.pow(10,-7)*population + 0.006977*poCount - 6682*Math.pow(10,-6)*density;

    // // 각각의 가중치
    // // 거리 d, cctv수 c, 검거율 r

    // // 파출소의 거리와 반경 안 cctv대수, 검거율에 가중치를 부여해 안전성 점수 산출
    // var value = distance*weight.d + cctvScore*weight.c + arrest_rate*weight.r;
    // colorChange(safty, value);
    
    // totalScore();
    // console.log("{ " + "\"거리\"\t:\t" + distance + ",\n  \"CCVT수\"\t:\t" + cctvScore + ",\n  \"검거율\"\t:\t" + arrest_rate + " }");
}

// function convScore(amenity, density) {
//     var value = amenity - Math.min((density/0.5),100)*0.1;
//     colorChange(conv, value);
// }

export {saftyScore}