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
}

function goAnimation(screenClass){
  var screen = document.querySelector(screenClass);
  // console.log(scrren)
  var setAnimationElements = setElementsAnimate[screenClass];
  var isAnimation_init = false;
  var isAnimation_done = false;

  screen.onclick = function(){
    //从默认样式，跳到init动画样式
    if(isAnimation_init == false){
      for(var i=0; i<setAnimationElements.length; i++){
        var element = document.querySelector(setAnimationElements[i]);
        var oldClass = element.getAttribute('class');
        element.setAttribute('class', oldClass + " " + setAnimationElements[i].substr(1) + '_animate_init');
      }
      isAnimation_init = true;
      return;
    }

    // 从init动画样式跳到done动画样式
    if(isAnimation_done == false) {
      for(var i=0; i<setAnimationElements.length; i++){
        var element = document.querySelector(setAnimationElements[i]);
        var oldClass = element.getAttribute('class');
        element.setAttribute('class', oldClass.replace('init', 'done'));
      }
      isAnimation_done = true;
      return;
    }

    // 从done动画样式跳到init动画样式
    if(isAnimation_done == true) {
      for(var i=0; i<setAnimationElements.length; i++){
        var element = document.querySelector(setAnimationElements[i]);
        var oldClass = element.getAttribute('class');
        element.setAttribute('class', oldClass.replace('done', 'init'));
      }
      isAnimation_done = false;
      return;
    }
  }
}



// 遍历所有属性名传入函数内,为动画元素添加动画
for(k in setElementsAnimate){
  goAnimation(k);
}
