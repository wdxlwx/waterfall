window.onload = function () {

    waterfall();
}

function waterfall()
{
    var boxes = $(".box"),bodyW;
    
    bodyW = document.body.offsetWidth || document.documentElement.offsetWidth;
    //得到一排可以放多少个
    var count = Math.floor(bodyW / boxes[0].offsetWidth);
    
    //设置容器的居中显示
    $("#container").style.width = (count * (boxes[0].offsetWidth + 2)) + "px";
    

    var heightArr = [];
    
    for (var i = 0; i < boxes.length; i++) {
        if (i < count) {
            heightArr.push(boxes[i].offsetHeight);
        } else {
            var minHeight= Math.min.apply(null, heightArr);
           
            var minIdx = getIdx(heightArr, minHeight);
            
            with (boxes[i].style)
            {
                position = "absolute";
                left = boxes[minIdx].offsetLeft + "px";
                top = heightArr[minIdx] + "px"

            }
            heightArr[minIdx] = heightArr[minIdx] + boxes[i].offsetHeight;
        }
    }
}

function getIdx(arr, val)
{

    for (var i in arr) {
        if (arr[i] == val)
        {
            return i;
        }
    }
}
var jsonFunc = getJsonData();
window.onscroll = function () {
    var boxes=$(".box");
    var fullH = (document.body.clientHeight || document.documentElement.clientHeight) + (document.body.scrollTop || document.documentElement.scrollTop);
   //此处是根据最后一个图片遇上面的高度判断的，有点不科学
    if (fullH > boxes[boxes.length - 1].offsetTop) {
        for (var i = 0; i < jsonFunc.jsonData().data.length; i++) {
            var oBox = document.createElement("div");
            oBox.className = "box";
            var oPic = document.createElement("div");
            oPic.className = "pic";
            var oImg = document.createElement("img");
            oImg.src = "images/" + jsonFunc.jsonData().data[i].src;
            $("#container").appendChild(oBox);
            oBox.appendChild(oPic);
            oPic.appendChild(oImg);
        }
        waterfall();
    }
}

function getJsonData()
{
    return {
        //此处可以通过ajax从后台获取分页数据
        jsonData: function () {
            
            return { data: [{ src: "0" + getRandom(0, 9) + '.jpg' }, { src: "0" + getRandom(0, 9) + '.jpg' }, { src: "0" + getRandom(0, 9) + '.jpg' }, { src: "0" + getRandom(0, 9) + '.jpg' }, { src: "0" + getRandom(0, 9) + '.jpg' }, { src: "0" + getRandom(0, 9) + '.jpg' }] }
        }
    }
}

/**
*生成m到n之间的随机数
*/
function getRandom(m,n)
{
return Math.round(m+ Math.random()*(n-m))
}




/*
*封装类似于jq的选择器
*/
function $(idOrClass) {
    if (idOrClass.indexOf(".") > -1) {
        return document.querySelectorAll(idOrClass);
    } else if (idOrClass.indexOf("#") > -1) {
        return document.querySelector(idOrClass);
    }
    return null;
}