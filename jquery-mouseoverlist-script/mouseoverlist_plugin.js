//////////////////////
// Плагин doMouseEnterLeave: добавляем классы ParentClass в родитель и ChildClass 
// в потомка когда наводим (или тычем на touchscreen)
// убираем оба класса по времени / удалению курсора
//////////////////////
(function(w){var t = setInterval(function(){var $ = w.jQuery; if ($){clearInterval(t);
  $.fn.doMouseEnterLeave = function(Children, ParentClass, ChildClass) {
  var ParentObj = $(this).selector,
  hideline = function(e){
  $(ParentObj+' '+Children).removeClass(ChildClass);
  $(this).parent().removeClass(ParentClass);
  }
  handlerOut = function(e){
  setTimeout(function(a,b,c,d){$(a).removeClass(b);$(a+' '+c).removeClass(d)},1000, ParentObj, ParentClass, Children, ChildClass);
  },
  handlerIn = function(e){
  if ($(this).hasClass(ChildClass)) return;
  hideline(e);
  $(ParentObj).addClass(ParentClass);$(this).addClass(ChildClass);
  };
  $( ParentObj+' '+Children ).mouseenter( handlerIn );
  $( ParentObj ).mouseleave( handlerOut );
  $(ParentObj+' '+Children).bind('touchstart mouseclick mousemove', function(e) {
    $(e.target).trigger('mouseenter');
  });
  };
///////////////////
// (function(w){var t = setInterval(function(){var $ = w.jQuery; if ($){clearInterval(t);
//$('.mouseoverlist').doMouseEnterLeave('.item', 'active', 'active');
}},500);})(window);
