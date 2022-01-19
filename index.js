const wrap = document.getElementById("wrap");
const view = document.getElementById("view");
const selectBox = document.getElementById("selectBox");

// mouseDown记录的数据
const startPoint = {
    x: 0,
    y: 0,
    flag: false
}

// scroll时的相关数据
const scrollTimer = {
    timer: null,
    // x轴是否滚动
    xFlag: false,
    // x轴滚动速度
    xSpeed: 1,
    yFlag: false,
    ySpeed: 1
}

/**
 * mouse定位selectBox, 并初始化宽高
 */
view.addEventListener("mousedown", (e) => {
    const x = e.clientX + wrap.scrollLeft
    const y = e.clientY + wrap.scrollTop
    startPoint.flag = true
    selectBox.style.width = "0px";
    selectBox.style.height = "0px";
    selectBox.style.top = y + "px";
    selectBox.style.left = x + "px";
    startPoint.x = x;
    startPoint.y = y;
})
/**
 * 鼠标抬起所有动作结束, 并清除副作用
 */
wrap.addEventListener("mouseup", (e) => {
    startPoint.flag = false;
    if(scrollTimer) clearInterval(scrollTimer)
})

/**
 * 鼠标在wrap内部状态时候的逻辑
 */
wrap.addEventListener("mousemove", (e) => {
    if(startPoint.flag === true) {
        const x = e.clientX
        const y = e.clientY
        selectBox.style.width = x - startPoint.x + wrap.scrollLeft + "px"
        selectBox.style.height = y - startPoint.y + wrap.scrollTop + "px"
    }
})

/**
 * 鼠标重新移入时，清楚定时器的flag
 */
wrap.addEventListener("mouseenter", () => {
    scrollTimer.xFlag = false
    scrollTimer.yFlag = false
})

/**
 * 鼠标在wrap内部状态时候的逻辑
 */
document.body.addEventListener("mousemove", (e) => {
    
    if(startPoint.flag === true) {
        if(e.clientX > 800 ) {
            scrollTimer.xSpeed = (e.clientX - 800) / 5
            scrollTimer.xFlag = true
        }
        if(e.clientY > 600){
            scrollTimer.ySpeed = (e.clientY - 600) / 5
            scrollTimer.yFlag = true
        }
    }
})

// 定时器 (这里还可以优化 可以用proxy代理flag进行优化， 动态添加定时器)
scrollTimer = setInterval(() => {
    if(scrollTimer.xFlag) {
        wrap.scrollLeft += scrollTimer.xSpeed
        selectBox.style.width = wrap.scrollLeft + 800 - startPoint.x - 20 + "px"
    }
    if(scrollTimer.yFlag) {
        wrap.scrollTop += scrollTimer.ySpeed
        selectBox.style.height = wrap.scrollTop + 600 - startPoint.y - 20 + "px"
    }
}, 40)
