// 判断页面是否加载完成，然后再显示页面
document.onreadystatechange = function(){
 if(document.readyState == "complete") {
    document.body.style.display = "block";
 }else{
    document.body.style.display = "none";
 }
}


// 获取元素
var getElem = function (selector){
  return document.querySelector(selector);
}

var getAllElem = function (selector){
  return document.querySelectorAll(selector);
}


//获取元素样式
var getCls = function(element){
  return element.getAttribute('class');
}

// 设置元素样式
var setCls = function(element, cls){
  return element.setAttribute('class',cls)
}

//添加元素样式
addCls = function(element, newcls){
  var baseCls = getCls(element);
  if(baseCls.indexOf(newcls) === -1){
    setCls(element, baseCls+ ' ' + newcls)
  }
}

// 删除元素样式
delCls = function(element, delcls){
  var baseCls = getCls(element);
  if(baseCls.indexOf(delcls) !== -1){
    setCls(element, baseCls.split(delcls).join(' ').replace(/\s+/g,' '))
  }
}


// 所有的药切换的动画元素
var setElementsAnimate = {
  '.screen-1': [
    '.screen-1_heading',
    '.screen-1_iphone',
    '.screen-1_shadow'
  ],

  '.screen-2': [
    '.screen-2_heading',
    '.screen-2_iphone',
    '.screen-2_subHeading',
    '.screen-2_point_i-1',
    '.screen-2_point_i-2',
    '.screen-2_point_i-3',
  ],

  '.screen-3': [
    '.screen-3_heading',
    '.screen-3_iphone',
    '.screen-3_subHeading',
    '.screen-3_feature'
  ],

  '.screen-4': [
    '.screen-4_heading',
    '.screen-4_subHeading',
    '.screen-4_type_item_i_1',
    '.screen-4_type_item_i_2',
    '.screen-4_type_item_i_3',
    '.screen-4_type_item_i_4'
  ],

  '.screen-5': [
    '.screen-5_heading',
    '.screen-5_subHeading',
    '.screen-5_background'
  ]
};



var outlines = getAllElem('.outline_item'); //获取大纲元素
var headerItems = getAllElem('.header_wrap_nav_item') //获取导航条样式
var liner = getElem('.header_wrap_nav_item_statusActive——liner') //// 获取滑动线元素
var index = 0; // 保存点击的位置,全局计数器


// 第一步 页面加载完成，初始化样式为init
window.onload = function(){
    for(k in setElementsAnimate){
      goAnimationInit(k);
  }
  //加载完页面，让第一屏动画先执行
  setTimeout(function(){
    goAnimationDone('.screen-1');
  },1000);
}


// 监听滚动条第二步，滚动到哪里，就切换该屏下的动画元素样式为done样式，
window.onscroll = allScreenAnimation;

  // 所有屏幕动画样式，
function allScreenAnimation(){
  var sclTop = document.documentElement.scrollTop; //获取滚动条上面隐藏区域的高度

  for(var i=0; i<outlines.length; i++){
    if(sclTop > i*800 && sclTop < i*800+100){
      // 执行所有屏的动画，滚动到哪里，就切换该屏下的动画元素样式为done样式，
      // 同时监听下划线字、字体样式
      goAnimationDone('.screen-'+(i+1));
      familyColorChange(outlines, headerItems, i);
      clickLineChange(i);
      }

  }
    //监听导航条和大纲样式
  headerItemsAniimation(sclTop);
  outlineAniimation(sclTop);
}
  // 监听导航条和大纲的所有事件
for(var f=0;f<outlines.length; f++){

  goEvent(headerItems, f);
  goEvent(outlines, f);
}


//切换动画元素为init样式
function goAnimationInit(screenClass){
  var setAnimationElements = setElementsAnimate[screenClass];
      for(var i=0; i<setAnimationElements.length; i++){
        var element = document.querySelector(setAnimationElements[i]);
        var oldClass = element.getAttribute('class');
        element.setAttribute('class', oldClass + " " + setAnimationElements[i].substr(1) + '_animate_init');
      }
    }

//切换动画元素为done样式
function goAnimationDone(screenClass){
  var setAnimationElements = setElementsAnimate[screenClass];
  for(var i=0; i<setAnimationElements.length; i++){
    var element = document.querySelector(setAnimationElements[i]);
    var oldClass = element.getAttribute('class');
    element.setAttribute('class', oldClass.replace('init', 'done'));
  }
}


 //导航条动画样式
function headerItemsAniimation(scrollTop){
  if(scrollTop > 50) {
    addCls(getElem('.header'), 'header_status_black');
  }else{
    delCls(getElem('.header'), 'header_status_black');
  }
}

  // 大纲动画样式
function outlineAniimation(scrollTop){
  if(scrollTop > 400) {
    addCls(getElem('.outline'), 'outline_status_init');
  }else{
    delCls(getElem('.outline'), 'outline_status_init');
  }
}


// 监听执行所有事件
function goEvent(elements, count){
  elements[count].addEventListener('click', function(){
   clickLineChange(count);
  }, false);
  elements[count].addEventListener('click', function(){
    goScrollTop(count);
  },false);
  elements[count].addEventListener('mouseover', function(){
    mouseoverLineChange(count);
  }, false);
  elements[count].addEventListener('mouseout', function(){
    clickLineChange(index);
  }, false);
}


// 点击 导航条或大纲 ，跳转到该屏
function goScrollTop(count){
    document.documentElement.scrollTop = count*800+1;
}

// 点击 元素让下划线跳转到该元素的位置；；悬停在某个元素上然后离开，下划线跳转到原来的位置
function clickLineChange(count){
    index=count;
    lineChange(count);
    familyColorChange(outlines, headerItems, count);
}
// 悬停在某个元素上，下划线跟着跳转
function mouseoverLineChange(count){
    lineChange(count);
    familyColorChange(outlines, headerItems, count);
}

//下划线跳转距离
function lineChange(count){
  liner.style.left = count*98+'px';
}

// 事件监听，改变导航条 和 大纲 字体颜色样式
function familyColorChange(outlineElm, headerElm, count){
  for(var j=0; j<outlines.length; j++){
    delCls(outlineElm[j], 'outline_item_statusActive');
    delCls(headerElm[j], 'header_wrap_nav_item_statusActive');
  }

  addCls(outlineElm[count], 'outline_item_statusActive');
  addCls(headerItems[count], 'header_wrap_nav_item_statusActive');
  addCls(outlineElm[index], 'outline_item_statusActive');
  addCls(headerItems[index], 'header_wrap_nav_item_statusActive');
}
