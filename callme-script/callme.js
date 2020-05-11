"use strict";

(function(window){
if (window !== top) return;
if (!! Callme) return window.Callme;
	var document = window.document;
	var Callme = (function(){
    var options = {
        id:0,
        css:[],
        css_path:"./templates/vk/style.css",
        url:"//fenki.net/callbackme/f.php",
        img:"./templates/vk/tab.png",///callme/templates/vk/tab.png
        send_url:"//fenki.net/callbackme/send.php",
      messages:{
        form_where_req:"Откуда запрос",
        traffic_source:"Источник трафика",
        page_request_made:"Страница с запросом",
        time_to_call:"Время звонка",
        from:"с ",
        to:" до ",
        clock:" часов",
        fill_time_to_call: "Укажите время звонка",
        sending:"Идёт отправка..."
      },

    };

    var jQuery_inited = false,
jQuery_stack = [
(function(jQuery) {
    if (typeof jQuery.Storage === 'undefined'){

    var isLS = typeof window.localStorage !== 'undefined';

    var wls = function (n, v) {
        var c;
        if (typeof n === "string") {// && typeof v === "string"
            localStorage[n] = "" + v;
            return true;
        } else if (typeof n === "object" && typeof v === "undefined") {
            for (c in n) {
                if (n.hasOwnProperty(c)) {
                    localStorage[c] = n[c];
                }
            }
            return true;
        }
        return false;
    }

    var wc = function (n, v) {
        var dt, e, c;
        dt = new Date();
        dt.setTime(dt.getTime() + 31536000000);
        e = "; expires=" + dt.toGMTString();
        if (typeof n === "string") {// && typeof v === "string"
            document.cookie = n + "=" + v + e + "; path=/";
            return true;
        } else if (typeof n === "object" && typeof v === "undefined") {
            for (c in n) {
                if (n.hasOwnProperty(c)) {
                    document.cookie = c + "=" + n[c] + e + "; path=/";
                }
            }
            return true;
        }
        return false;
    }

    var rls = function (n) {
        return localStorage[n];
    }

    var rc = function (n) {
        var nn, ca, i, c;
        nn = n + "=";
        ca = document.cookie.split(';');
        for (i = 0; i < ca.length; i++) {
            c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nn) === 0) {
                return c.substring(nn.length, c.length);
            }
        }
        return null;
    }

    var dls = function(n) {
        return delete localStorage[n];
    }

    var dc = function(n) {
        return wc(n, "", -1);
    }
    jQuery.extend({
        Storage: {
            set: isLS ? wls : wc,
            get: isLS ? rls : rc,
            remove: isLS ? dls : dc
        }
    });
    }// if jQuery.Storage not defined
    })(jQuery),
    (function(){jQuery(document).on("mouseover", ".cme_btn", function() {
        cmePr(".cme_btn", 0.8, 150);
    }).on("mouseleave", ".cme_btn", function() {
        cmePr(".cme_btn", 1, 100);
    })})(),
    (function(){jQuery(document).on("click", ".callme_viewform", function(e) {
        cmeShow(e);
        return false;
    })})(),
    (function(){jQuery(document).on("click", ".cme_cls", function(e) {
        cmeHide();
        return false;
    })})(),
    (function(){jQuery(document).on("click", "#cme_back", function() {
        cmeHide();
    })})(),
    (function(){jQuery(document).on("click", ".cme_btn", function() {
        cmeSend();
    })})(),
    (function(){jQuery(document).on("keypress", ".cme_form .cme_txt", function() {
        jQuery(this).css("border", "").css("background", "");
    })})(),
    (function(){jQuery(document).on("change", ".cme_ct_start", function() {
    var cme_h = Number(jQuery(this).find(":selected").text()) + 1;
    jQuery(".cme_ct_finish option").each(function() {
        jQuery(this).removeAttr('disabled');
    var cme_h = Number(jQuery(this).find(":selected").text()) + 1;
    jQuery(".cme_ct_finish option").each(function() {
        if (jQuery(this).val() < cme_h) {
            jQuery(this).attr('disabled', 'disabled');
        }
    })})(),
    jQuery('.cme_ct_finish').css('background', '#97FF89');
    })})(),
    (function(){jQuery(document).on("change", ".cme_ct_finish", function() {
        jQuery(this).css("background", "");
    })})(),
    (function(){jQuery(document).keyup(function(a) {
        if ((a.keyCode == 27) && (jQuery(".cme_form").is(":visible"))) {
            cmeHide();
        }
    })})(),
    (function(){
        var ref = jQuery.Storage.get("cmeRef");
    if ((!ref) && (document.referrer)) {
        ref = document.referrer;
        jQuery.Storage.set("cmeRef", ref);
    }
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




var callme = function () {
    var cme_css = jQuery("<link>");
    cme_css.attr({
        type: 'text/css',
        rel: 'stylesheet',
        href: options.css_path
    });
    jQuery("head").append(cme_css);
    var hr = new Date().getHours();
    var callmeData = {
        fields: Callme.fields,
        title: Callme.title,
        calltime: Callme.calltime,
        time_start: Callme.start_work,
        time_end: Callme.end_work,
        button: Callme.button,
        hr: hr
    };
    jQuery.ajax({
        type: "GET",
        url: options.url,//
        data: {
            i: Callme.options.id,
            img: Callme.options.img,
            d: callmeData
        }
    }).done(function(d) {
        jQuery("body").append(d);
        jQuery("<span>").prependTo(".cme_btn_place");
        if (Callme.bt == 0) {
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
        if ((Callme.license == cmeCount(document.domain)) && (Callme.show_cr == 0)) {
            jQuery(".cme_btn_place span").remove()
        }
    });
    var ref = jQuery.Storage.get("cmeRef");
    if ((!ref) && (document.referrer)) {
        ref = document.referrer;
        jQuery.Storage.set("cmeRef", ref);
    }
};//callme

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
        jQuery(".callme_result").html(c.length > 0 ? "<div class='" + c + "'>" + t + "</div>" : "");
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
        var cnt = jQuery.Storage.get('callme-sent');
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
        var rf = jQuery.Storage.get("cmeRef");
        if ((rf) && (rf.length > 0)) {
            cs.push(options.messages.traffic_source);
            os.push(rf);
        }
        cs.push(options.messages.page_request_made);
        os.push(location.href);
        jQuery.getJSON(options.send_url + "?i="+Callme.options.id, {//'/callme/' + "lib/send.php"
            contentType: "text/html; charset=utf-8",
            cs: cs,
            os: os,
            ctime: cnt,l:window.location.pathname||"/",d:window.location.hostname
        }, function(i) {
            cmeMsg(i.cls, i.message);
            if (i.result == "success") {
                jQuery.Storage.set("callme-sent", i.time);
                dl('cmeHide', 4);
                dl('cmeClr', 5);
            }
        });
    };


	var help = function(){
	console.log('solved!');
	};// если с (function(){})(), то вызывать надо Callme.func

    var init = function(arg){
        var t = setInterval(function(){
            if (jQuery_inited){clearInterval(t);
        // inside what should be inited
        // подстановка переданных аргументов
        if (arg !== undefined){//arguments[0]
                for(var i in arg){
                    console.log({i:arg[i]});
                if (typeof arg[i] !== 'undefined') {Callme.options[i]=arg[i];}
                }
            }
        // console.dir(options);
        callme();
        }},500);
    };

	var exports = {'help':help,init:init,callme:callme,options:options};
	return exports;
	})();// если без (), то вызывать надо Callme().func()
window.Callme = Callme;
return Callme;
})(this);
// Вызов
//Callme.help();