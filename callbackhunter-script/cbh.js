"use strict";

(function(window){
if (window !== top) return;
if (!! Cbh) return window.Cbh;
    var document = window.document;
    var Cbh = (function(){
    var options = {
        id:0,
        officetimezone:8,
        starthour:10,//время начала работы
        endhour:18,//время конца работы
        oriental:false,//если true, то QQ вместо Skype трактуется
        css:[],//специальный css
        detect_locale:true,
        lang:'en',
        css_path:"./style.css",//можно глобальный
        server_url:"http://fenki.net/callbackme/ph.php",
        wrapper:'#wrapper',//wrapper to be blured
    },
    dic = {
'en':{
lets:"Let us call you ",
in_work:" in the working time",
in:"at",
h:' h ',
min:" min",
your_n:"Input your phone",
wait:"Waiting for call!",
conversion:"Increase website conversion",
today:'today',
tomorrow:'tomorrow',
working_d:'in the working day',
error_empty:'please fill the number'
},
'ru':{
lets:"Давайте мы перезвоним вам ",
in_work:" в рабочие часы",
in:"в",
h:' ч. ',
min:" мин",
your_n:"Введите ваш телефон",
wait:"Жду звонка!",
conversion:"Повысьте конверсию сайта!",
today:'сегодня',
tomorrow:'завтра',
working_d:'в рабочий день',
error_empty:'пожалуйста, впишите номер'
},
'zh':{
lets:"让我们来电",
in_work:"在营业时间",
in:"在",
h:'小时',
min:"分",
your_n:"输入手机号",
wait:"等你来电！",
conversion:"提升网站有效率！",
today:"今天",
tomorrow:"明天",
working_d:"在工作日",
error_empty:'请输入您的手机号'
},
        // 'es':{},
        // 'pt':{},
        // 'de':{},
        // 'jp':{},
        // 'fr':{},
        // 'it':{},
        // 'pl':{},
        // 'tr':{},
        // 'id':{},
        };
    var it = {};//current time variables

    var jQuery_inited = false,
jQuery_stack = [
   // (function(){})(),
    function(jQuery) {
var date = new Date(), userhour = date.getHours(), // час в зоне пользователя для даты date
officehour = date.getUTCHours()+options.officetimezone, // час в зоне GMT+8 для даты date
diff = userhour-officehour,// нужно прибавить поправку к часам в офисе, чтобы получить локальное время пользователя
nextdate = 0,//идентификатор след.дня
selecthours='',//селекторы часов
timezone = new Date().getTimezoneOffset()/-60;//
//diff = -15;
if (officehour + 1 > options.endhour) {var fromhour = options.starthour; nextdate++;}
else {var fromhour = officehour;}
// if (endhour < fromhour) {fromhour = starthour;} //commented
for (var i = fromhour; i < options.endhour; i++) {
if (i + diff > 23) {var curhour = diff + i - 24;}
else if (i + diff < 0) {var curhour = diff + i + 24;nextdate=0;}
else {var curhour = diff + i;}
 selecthours +='<option value="'+curhour+'">'+curhour+"</option>";
}
(timezone > -1) ? timezone = " (GMT+"+timezone+")" : timezone = " (GMT"+timezone+")";
console.log(options.lang);
if (nextdate) {timezone += " "+dic[options.lang].tomorrow;}
it={timezone:timezone,nextdate:nextdate,officehour:officehour,fromhour:fromhour,curhour:curhour,diff:diff,selecthours:selecthours};
// отображать форму
$(document).on('click touchend', ".cbh-ph-img-circle,.cbh-callback", function(e){show_cbh_form(e)});
// курсор покидает мышь
$(document).on('mousemove','body',function(e){if (e.clientY*2 < window.prevY) {if (undefined ==window.localStorage.getItem('triggeredY') || (parseInt(window.localStorage.getItem('triggeredY'))+36000*2<(new Date()).getTime())) {window.localStorage.setItem('triggeredY',(new Date()).getTime());show_cbh_form(e);}}window.prevY = e.clientY;});

$(document).on('click touchend',"#clbh_send", function(e){
if(window.localStorage){
    var e = window.localStorage["cbh_db.entrance_page"]||"";
    if ((!e) && (document.referrer)) {
        e = document.referrer;
        window.localStorage.setItem("cbh_db.entrance_page",e);
        var r = e;
    }
}
else {var r = document.referrer; var e = r;}

if ($('#clbh_phone').val().length === 0) {//пустой тел выдаем предупреждение
    $("#clbh_stat").html('<div class="cbh_result"> <div class=c_warning>'+dic[options.lang].error_empty+"</div> </div>");
// setTimeout(function(){$("#clbh_stat").html('')},3000);
}//пустой тел выдаем предупреждение - end 

else {// иначе если есть тел
var t = $('#clbh_today').html()||"today",
    h = $('#clbh_night_hour').val()||"11",
    p = $('#clbh_phone').val()||"undefined",
    m = ($('#clbh_night_minute').val()||"0").length==2? $('#clbh_night_minute').val()||"00" : "0"+($('#clbh_night_minute').val()||"0"),
    w = $('#clbh_send').html()||"Waiting for call!",
    g = $('#clbh_tomorrow_text').html()||" (GMT+8)",
    i = options.id;
    $.ajax({
        type: "GET",
        url: options.server_url,
        data: {t:t,h:h,p:p,m:m,w:w,g:g,i:i,l:window.location.pathname||"неизвестно",d:window.location.hostname,r:r,lang:options.lang}
      }).done(function(d) {
        $("#clbh_stat").html('<div class="cbh_result"> <div class=c_success>'+d+"</div> </div>");
        setTimeout(function(){$("#clbh_stat").html('');close_cbh_bg(e)},1500);
      });
}// иначе если есть тел - end

});
$(document).on('click touchend', "#clbh_exit", function(e){close_cbh_bg(e)});
$(document).on('click',".clbh_blur",function(e){close_cbh_bg(e)})//vm20150520
$(document).on("keyup", function (e) {var code = e.keyCode || e.which;
    if(code == 27){//esc
        close_cbh_bg(e)
    }
});
    }

];

    var init_stack = function(){

        var t = setInterval(function(){if (window.jQuery && window.$(window).width()>=0){clearInterval(t);
       jQuery_inited = true;
      // s[s.length] = (function(){console.log('s');})();
       for (var i = 0; i < jQuery_stack.length; i++){// execute stack events, etc.
        jQuery_stack[i]();
       }
       jQuery_stack=[];
    }},500);};

var button = function (arg) {
    var classes = {'color':'green','state':'static'};//{'gray'|'green','hover'|'active'|'static'} 
    if (arg !== undefined){//arguments[0]
            for(var i in arg){
            if (typeof arg[i] !== 'undefined') {classes[i]=arg[i];}
            }
        }
    var text = '<div class="cbh-phone cbh-'+classes.color+' cbh-show cbh-'+classes.state+' cbh-callback"><div class="cbh-ph-circle"></div><div class="cbh-ph-circle-fill"></div><div class="cbh-ph-img-circle"></div></div>';
    document.write(text);
}

var Form = function(){
if ($('#clbh_div').length === 0){
    var form = $("<div>");
    form.attr({
        id: 'clbh_div',
        style: 'display: none;',
        class: 'clbh_banner-wrapper animated'
    });
    form.html(['<div class="clbh_banner-line-wrapper" id="clbh_banner_pr_line_wrapper" style="display: none;">',
'<div class="clbh_banner-pr-line-left-wrapper">',
'<div class="clbh_banner-pr-line-left" id="clbh_banner_pr_line_left">',
'</div>',
'</div>',
'<div class="clbh_banner-pr-line-right-wrapper">',
'<div class="clbh_banner-pr-line-right" id="clbh_banner_pr_line_right">',
'</div>',
'</div>',
'</div>',
'<div class="clbh_banner" id="clbh_div_ban">',
'<div class="clbh_banner-exit" id="clbh_exit">',
'</div>',
'<div class="clbh_banner-body">',
'<div class="clbh_banner-h1" id="clbh_banner_h1">'+dic[options.lang].lets+'<span id="clbh_today">'+dic[options.lang].in_work+'</span> <br>'+dic[options.lang].in+' <select id="clbh_night_hour">',
'<option value="10">10</option>',
'<option value="11">11</option>',
'<option value="12">12</option>',
'<option value="13">13</option>',
'<option value="14">14</option>',
'<option value="15">15</option>',
'<option value="16">16</option>',
'<option value="17">17</option>',
'<option value="18">18</option>',
'</select>'+dic[options.lang].h+'<select id="clbh_night_minute">',
'<option value="0">0</option>',
'<option value="5">5</option>',
'<option value="10">10</option>',
'<option value="15">15</option>',
'<option value="20">20</option>',
'<option value="25">25</option>',
'<option value="30">30</option>',
'<option value="35">35</option>',
'<option value="40">40</option>',
'<option value="45">45</option>',
'<option value="50">50</option>',
'<option value="55">55</option>',
'</select>'+dic[options.lang].min+'<span id="clbh_tomorrow_text"></span>?</div>',
'<div class="clbh_banner-choose-office" id="clbh_banner_choose_office" style="display:none;">',
'</div>',
'<div class="clbh_banner-form-row-1">',
'<div class="clbh_banner-form" id="clbh_banner_content">',
'<div class="clbh_banner-arrow">',
'</div>',
'<div class="clbh_phone_line" id="clbh_phone_line">',
'<input class="clbh_banner-textbox" type="text" placeholder="'+dic[options.lang].your_n+'" id="clbh_phone" value="" maxlength="18">',
'<button class="clbh_banner-button" id="clbh_send">'+dic[options.lang].wait+'</button>',
// '<a class="clbh_mob_vk" href="http://vk.com/" style="display:none"></a>',
'</div>',
//'<div class="clbh_timer" style="display: none;">',
//'<p id="clbh_timer_result">03:59:59</p>',
//'</div>',
'</div>',
'</div>',
'<div class="clbh_banner-form-row-2">',
'<span id="clbh_stat">',
'</span>',
'</div>',
'</div>',
'<div class="clbh_banner-work-to" id="clbh_banner_work_to">',
'<a id="clbh_banner_work_to_link" href="#">'+dic[options.lang].conversion+'</a>',
'</div>',
'</div>',
//'<div class="clbh_banner_bg" id="clbh_banner_bg" style="display: none;">','</div>'
].join(''));
    $("body").append(form);
}
};

    var help = function(){
    console.log('solved!');
    };// если с (function(){})(), то вызывать надо Cbh.func

    var init = function(arg){
        if (arg !== undefined){//arguments[0]
                for(var i in arg){
                if (typeof arg[i] !== 'undefined') {options[i]=arg[i];}
                }
            }
        // подстановка переданных аргументов
        if (options.detect_locale) options.lang = _get_user_lang();
        console.log(options);
        init_stack();
        var t = setInterval(function(){
        if (jQuery_inited){clearInterval(t);
        // inside what should be inited
        Form();
        Cbh();
        }},500);
    };
    var FillRightTime = function(){
    $('#clbh_night_hour').html(it.selecthours);
    if (!it.nextdate) {$('#clbh_today').html(dic[options.lang].today);}
    $('#clbh_tomorrow_text').html(it.timezone);
};

var Cbh = function () {
    FillRightTime();//заполняет правильные промежутки времени когда будет звонок
    var cme_css = $("<link>");
    cme_css.attr({
        type: 'text/css',
        rel: 'stylesheet',
        href: options.css_path
    });
    $("head").append(cme_css);
    var hr = new Date().getHours();
    var CbhData = {
        fields: Cbh.fields,
        title: Cbh.title,
        calltime: Cbh.calltime,
        time_start: Cbh.start_work,
        time_end: Cbh.end_work,
        button: Cbh.button,
        hr: hr
    };
//     $.ajax({
//         type: "GET",
//         url: options.url,//
//         data: {
//             i: options.id,
//             d: CbhData
//         }
//     }).done(function(d) {
// //        $("body").append(d);
//         $("<span>").prependTo(".cme_btn_place");
//         if (Cbh.bt == 0) {
//             $("#viewform").hide()
//         }

//         var cmeCount = function (s) {
//             var t = "";
//             s = unescape(s.replace("www.", "").toLowerCase());
//             for (var i = 0; i < s.length; i++) {
//                 t += (i % 2 == 0 ? (s.charCodeAt(i) * 7) : (s.charCodeAt(i) * 3))
//             }
//             t = t.split("");
//             for (i = 0; i < t.length; i++) {
//                 t[i] = (i % 3 == 0 ? (Number(t[i]) + 3) : (Number(t[i]) + 5));
//                 t[i] = (i % 2 == 0 ? (t[i] * 2) : (t[i] * 3))
//             }
//             for (i = 0; i < t.length; i++) {
//                 if ((i % 2 == 0) && (i < t.length / 2)) {
//                     var v = t[i];
//                     t[i] = t[t.length - i - 1];
//                     t[t.length - i - 1] = v
//                 }
//             }
//             t = t.join("");
//             t += t;
//             t = t.substr(0, 30);
//             return t
//         }
//     });
    var ref = window.localStorage.getItem("cmeRef");
    if ((!ref) && (document.referrer)) {
        ref = document.referrer;
        window.localStorage.setItem("cmeRef", ref);
    }
};//Cbh


    var show_cbh_form = function(e){
    if ($('#clbh_div').removeClass("zoomOutLeft").prop('style').display != ''){
    $('#clbh_div').addClass("zoomInLeft").prop('style').display="";
    setTimeout(function(){$('#clbh_div').removeClass("zoomInLeft");$(options.wrapper).addClass("clbh_blur");
    },1000);
    }
    }, close_cbh_bg = function(e){// скрыть форму
    if ($('#clbh_div').removeClass("zoomOutLeft").prop('style').display != 'none'){
    $('#clbh_div').addClass("zoomOutLeft");
    setTimeout(function(){$('#clbh_div').removeClass("zoomOutLeft").prop('style').display="none";$(options.wrapper).removeClass("clbh_blur");
    },1000);
    }
    };
    var _get_user_lang = function () {
        var match = document.cookie.match(new RegExp('lang=([^;]+)')); ///ru/g.test(window.navigator.language)
        if (match && match[1] !== undefined) return match[1].toString();
        if (typeof window.navigator.languages[0] !== 'undefined')
          return window.navigator.languages[0].substring(0,2).toLowerCase();
        return lang;
    }

    var exports = {'help':help,init:init,Cbh:Cbh,options:options,show_cbh_form:show_cbh_form,close_cbh_bg:close_cbh_bg,button:button,it:it,dic:dic};
    return exports;
    })();// если без (), то вызывать надо Cbh().func()
window.Cbh = Cbh;
return Cbh;
})(this);
// Вызов
//Cbh.help();