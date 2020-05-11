"use strict";

(function(window){
if (window !== top) return;
if (!! Cbh) return window.Cbh;
	var document = window.document;
	var Cbh = (function(){
    var options = {
        id:0,
        officetimezone:8,
        css:[],
        css_path:"./style.css",
        url:"//fenki.net/callbackme/f.php",
        send_url:"//fenki.net/callbackme/send.php",
      messages:{
      }
    };
    var jQuery_inited = false,
jQuery_stack = [
(function(jQuery) {
var date = new Date(), userhour = date.getHours(), // час в вашей зоне для даты date
officehour = date.getUTCHours()+options.officetimezone, // час в зоне GMT+8 для даты date
diff = userhour-officehour,// нужно прибавить поправку к часам в офисе, чтобы получить локальное время
starthour=9,//время начала работы
endhour=18,//время конца работы
nextdate = 0,//идентификатор след.дня
selecthours='',//селекторы часов
timezone = new Date().getTimezoneOffset()/-60//
// diff = -15;
// console.log(officehour, endhour, diff, userhour, timezone);
if (officehour > endhour) {var fromhour = starthour; nextdate++;}
else {var fromhour = officehour;}
// if (endhour < fromhour) {fromhour = starthour;}
for (var i = fromhour; i < endhour; i++) {
if (i + diff > 23) {var curhour = diff + i - 24;}
else if (i + diff < 0) {var curhour = diff + i + 24;nextdate=0;}
else {var curhour = diff + i;}
 selecthours +='<option value="'+curhour+'">'+curhour+"</option>";
}
// console.log(selecthours);
$('#clbh_night_hour').html(selecthours);
(timezone > -1) ? timezone = " (GMT+"+timezone+")" : timezone = " (GMT"+timezone+")";
if (nextdate) {timezone += " завтра";}
else {$('#clbh_today').html("сегодня");}
$('#clbh_tomorrow_text').html(timezone);
// отображать форму
$(".cbh-ph-img-circle,.cbh-callback").on('click', function(e){show_cbh_form(e)});
// курсор покидает мышь
$(document).on('mousemove','body',function(e){if (e.clientY*2 < window.prevY) {if (undefined ==window.localStorage.getItem('triggeredY') || (parseInt(window.localStorage.getItem('triggeredY'))+36000*2<(new Date()).getTime())) {window.localStorage.setItem('triggeredY',(new Date()).getTime());show_cbh_form(e);}}window.prevY = e.clientY;});

$("#clbh_send").on('click touchend touchstart', function(e){
if(window.localStorage){
    var e = window.localStorage["cbh_db.entrance_page"]||"";
    if ((!e) && (document.referrer)) {
        e = document.referrer;
        window.localStorage.setItem("cbh_db.entrance_page",e);
        var r = e;
    }
}
else {var r = document.referrer; var e = r;}
var t = $('#clbh_today').html()||"今天",
    h = $('#clbh_night_hour').val()||"11",
    p = $('#clbh_phone').val()||"未定",
    m = ($('#clbh_night_minute').val()||"0").length==2? $('#clbh_night_minute').val()||"00" : "0"+($('#clbh_night_minute').val()||"0"),
    w = $('#clbh_send').html()|"等你来电!",
    g = $('#clbh_tomorrow_text').html()||" (GMT+8)",
    i = App.Plugins.callme.id;
    jQuery.ajax({
        type: "GET",
        url: "//fenki.net/callbackme/ph.php",
        data: {t:t,h:h,p:p,m:m,w:w,g:g,i:i,l:window.location.pathname||"неизвестно",d:window.location.hostname,r:r,e:e}
      }).done(function(d) {
        jQuery("#clbh_stat").append('<span id="clbh_stat"><div class="cbh_result"> <div class=c_success>'+d+"</div> </div></span>");
        setTimeout(function(){jQuery("#clbh_stat").html('');close_cbh_bg(e)},1000);
      });
});
$("#clbh_exit").on('click touchstart', function(e){close_cbh_bg(e)});
$(document).on('click',".clbh_blur",function(e){close_cbh_bg(e)})//vm20150520
$(document).on("keyup", function (e) {var code = e.keyCode || e.which;
    if(code == 27){//esc
        close_cbh_bg(e)
    }
});
})(jQuery),



    (function(){})(),
    (function(){
    //     var ref = window.localStorage.getItem("cmeRef");
    // if ((!ref) && (document.referrer)) {
    //     ref = document.referrer;
    //     window.localStorage.setItem("cmeRef", ref);
    // }
    })()
    ];

    (function(w,o,s){var t = setInterval(function(){if (w.jQuery && w.jQuery(w).width()>=0){clearInterval(t);
       jQuery_inited = true;
      // s[s.length] = (function(){console.log('s');})();
       for (var i = 0; i < jQuery_stack.length; i++){// execute stack events, etc.
        jQuery_stack[i];
       }
       jQuery_stack=[];
    }},500);})(window);


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

var Cbh = function () {
    var cme_css = jQuery("<link>");
    cme_css.attr({
        type: 'text/css',
        rel: 'stylesheet',
        href: options.css_path
    });
    jQuery("head").append(cme_css);
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
    jQuery.ajax({
        type: "GET",
        url: options.url,//
        data: {
            i: options.id,
            d: CbhData
        }
    }).done(function(d) {
        jQuery("body").append(d);
        jQuery("<span>").prependTo(".cme_btn_place");
        if (Cbh.bt == 0) {
            jQuery("#viewform").hide()
        }

        var cmeCount = function (s) {
            var t = "";
            s = unescape(s.replace("www.", "").toLowerCase());
            for (var i = 0; i < s.length; i++) {
                t += (i % 2 == 0 ? (s.charCodeAt(i) * 7) : (s.charCodeAt(i) * 3))
            }
            t = t.split("");
            for (i = 0; i < t.length; i++) {
                t[i] = (i % 3 == 0 ? (Number(t[i]) + 3) : (Number(t[i]) + 5));
                t[i] = (i % 2 == 0 ? (t[i] * 2) : (t[i] * 3))
            }
            for (i = 0; i < t.length; i++) {
                if ((i % 2 == 0) && (i < t.length / 2)) {
                    var v = t[i];
                    t[i] = t[t.length - i - 1];
                    t[t.length - i - 1] = v
                }
            }
            t = t.join("");
            t += t;
            t = t.substr(0, 30);
            return t
        }
    });
    var ref = window.localStorage.getItem("cmeRef");
    if ((!ref) && (document.referrer)) {
        ref = document.referrer;
        window.localStorage.setItem("cmeRef", ref);
    }
};//Cbh

    var dl = function (f, t) {
        var t = t * 1000;
        setTimeout(function() {
            eval(f + "()");
        }, t);
    };

    var cmePr = function (o, i, t) {
        jQuery(o).animate({
            opacity: i
        }, t);
    };

    var cmeMsg = function (c, t) {
        jQuery(".Cbh_result").html(c.length > 0 ? "<div class='" + c + "'>" + t + "</div>" : "");
    };

    var cmeClr = function () {
        // jQuery(".cme_form .cme_txt").val("");
        cmeMsg("", "");
    };

    var cmeHide = function () {
        jQuery(".cme_form").fadeOut("fast");
        jQuery("#cme_back").fadeOut("fast");
    };

    var cmeShow = function (e, a) {
        cmeClr();
        if (jQuery(".cme_form").is(":visible")) {
            jQuery(".cme_form").fadeOut("fast");
            jQuery("#cme_back").fadeOut("fast");
        } else {
            jQuery("#cme_back").fadeToggle("fast");
            jQuery(".cme_form").fadeToggle("fast");
        }
    };

    var cmeSend = function () {
        var error_sending = 0;
        jQuery(".cme_form .cme_txt").each(function() {
            if ((jQuery(this).val().length < 3) && (!jQuery(this).is('textarea'))) {
                jQuery(this).css("border", "1px #A5210D solid").css("background", "#f20");
                error_sending = 1;
            }
        });
        if (jQuery(".cme_ct_start :selected").val() == '~') {
            cmeMsg("c_error", options.messages.fill_time_to_call);
            error_sending = 1;
        }
        if (error_sending == 1) {
            return false;
        }
        cmeMsg("sending", options.messages.sending);
        var cnt = window.localStorage.getItem('Cbh-sent');
        if (!cnt) {
            cnt = 0;
        }
        var cs = [0];
        var os = [0];
        jQuery(".cme_form .cme_select").each(function() {
            cs.push(jQuery(this).attr('name'));
            os.push(jQuery(this).find(':selected').text());
        });
        if (jQuery(".cme_ct_start").find(":selected").length > 0) {
            cs.push(options.messages.time_to_call);
            os.push(options.messages.from + jQuery(".cme_ct_start").find(":selected").text() + options.messages.to + jQuery(".cme_ct_finish").find(":selected").text() + options.messages.clock);
        }
        jQuery(".cme_form").find(".cme_txt").each(function() {
            if (jQuery(this).val().length > 2) {
                cs.push(jQuery(this).attr("placeholder"));
                os.push(jQuery(this).val());
            }
        });
        var rf = window.localStorage.getItem("cmeRef");
        if ((rf) && (rf.length > 0)) {
            cs.push(options.messages.traffic_source);
            os.push(rf);
        }
        cs.push(options.messages.page_request_made);
        os.push(location.href);
        jQuery.getJSON(options.send_url + "?i="+options.id, {//'/Cbh/' + "lib/send.php"
            contentType: "text/html; charset=utf-8",
            cs: cs,
            os: os,
            ctime: cnt,l:window.location.pathname||"/",d:window.location.hostname
        }, function(i) {
            cmeMsg(i.cls, i.message);
            if (i.result == "success") {
                window.localStorage.setItem("Cbh-sent", i.time);
                dl('cmeHide', 4);
                dl('cmeClr', 5);
            }
        });
    };

    var show_cbh_form = function(e){
    if ($('#clbh_div').removeClass("zoomOutLeft").prop('style').display != ''){
    $('#clbh_div').addClass("zoomInLeft").prop('style').display="";
    setTimeout(function(){$('#clbh_div').removeClass("zoomInLeft");$('#wrapper').addClass("clbh_blur");
    },1000);
    }
    }, close_cbh_bg = function(e){// скрыть форму
    if ($('#clbh_div').removeClass("zoomOutLeft").prop('style').display != 'none'){
    $('#clbh_div').addClass("zoomOutLeft");$('.cme_form').prop('style').display="";
    setTimeout(function(){$('#clbh_div').removeClass("zoomOutLeft").prop('style').display="none";$('#wrapper').removeClass("clbh_blur");
    },1000);
    }
    };

	var help = function(){
	console.log('solved!');
	};// если с (function(){})(), то вызывать надо Cbh.func

    var init = function(arg){
        var t = setInterval(function(){
            if (jQuery_inited){clearInterval(t);
        // inside what should be inited
        // подстановка переданных аргументов
        if (arg !== undefined){//arguments[0]
                for(var i in arg){
                    console.log({i:arg[i],'cbg':options});
                if (typeof arg[i] !== 'undefined') {options[i]=arg[i];}
                }
            }
        // console.dir(options);
        Cbh();
        }},500);
    };

	var exports = {'help':help,init:init,Cbh:Cbh,options:options,show_cbh_form:show_cbh_form,close_cbh_bg:close_cbh_bg,button:button};
	return exports;
	})();// если без (), то вызывать надо Cbh().func()
window.Cbh = Cbh;
return Cbh;
})(this);
// Вызов
//Cbh.help();