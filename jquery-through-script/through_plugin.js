//////////////////////
// Плагин through: добавляем классы в детей переданного объекта 
// когда блок в зоне отображения при прокручивании, иначе убираем их
//////////////////////
(function(w){var t = setInterval(function(){var $ = w.jQuery; if ($){clearInterval(t);
  $.fn.through = function(children,classes) {
  var scrollDiv = $(this),
  checker = function() {
    console.log($(scrollDiv).find(children));
    if ($(scrollDiv).offset().top > $(window).scrollTop() + $(window).innerHeight() || 
      $(scrollDiv).offset().top + $(scrollDiv).innerHeight() < $(window).scrollTop()
    )// объект вне экрана: ниже или выше
    {
     $(scrollDiv).find(children).removeClass(classes);
    }
    else if (($(window).scrollTop()+$(window).innerHeight()/2) > 
        (($(scrollDiv).offset()||{}).top||0+$(scrollDiv).innerHeight()/2||0) && 
        !$($(scrollDiv).find(children)).hasClass(classes)) {// примерно по центру экрана объект
      $(scrollDiv).find(children).addClass(classes);
      }
    else {}
  };checker;
  $(window).scroll(checker);
    };
}},500);})(window);
///////////////////
