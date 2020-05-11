(function(window) {
if (window !== top) return;
if (!!window.AjaxLoad) {
return window.AjaxLoad;
}
 var document = window.document;
var AjaxLoad = (function() {
    var options = {id:1,//unique instance's id
    //urls
    siteurl: "//"+document.domain,
    home: "//"+document.domain,
    //Search Class
    search_class: 'input_search',
    reloadDocumentReady: false,
    isLoad: false,
    started: false,
    searchPath: null,
    //Content ID
    content: 'content',
    //Ignore List - this is for travisavery who likes my comments... hello
    ignore:["#","/wp-",".pdf",".zip",".rar",".jpg",".jpeg",".png",".gif","/feed",".xls","action=login","action=logout"],
    //Shall we take care of analytics?
    track_analytics: false,
    //Various options and settings
    scroll_top: true,
    //Maybe the script is being a tw**? With this you can find out why...
    warnings: 1,
    loadingsrc: 'loading.gif',//'/tpl/default/img/loading.gif',
    loadingdivid:'ajaxLoadDivElement',
    }, events = {'uri':document.location.pathname};//хранение событий на странице - какие триггеры уже сработали

      function init(params){
        if (params !== undefined){
        var options = this.options;
        for (var key in params){
            options[key] = params[key];
         }
         this.options = options;
         return this.onload();
            }
      };

        function onload(){
        this.options.loadingsrc = jQuery('<img/>').attr('src', this.options.loadingsrc);//loadingIMG
        this.options.loadingDIV = jQuery('<div/>').attr('style', 'display:none;').attr('id', this.options.loadingdivid);
        ////this.loadingIMG.appendTo('body');
        this.options.loadingDIV.appendTo('#'+this.options.loadingdivid);
        //Loading/Error Code
        //now using json_encode - two birds one bullet.
        var str = "<center>\r\n\t<p style=\"text-align: center !important;\">Загрузка страницы...<\/p>\r\n\t<p style=\"text-align: center !important;\">\r\n\t\t<img src=\"{loader}\" border=\"0\" alt=\"\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430\" title=\"Загрузка...\" \/>\r\n\t<\/p>\r\n<\/center>";
        this.options.loading_code = str.replace('{loader}', this.options.loadingsrc.attr('src'));
        str = "<center>\r\n\t<p style=\"text-align: center !important;\">Ошибка!<\/p>\r\n\t<p style=\"text-align: center !important;\">\r\n\t\t<font color=\"red\">Невозможно загрузить страницу.<\/font>\r\n\t<\/p>\r\n<\/center>";
        this.options.loading_error_code = str.replace('{loader}', this.options.loadingsrc.attr('src'));

        window.onpopstate = function(event) {
            if (this.options.started === true && this.check_ignore(document.location.toString()) == true) {
                this.loadPage({url:document.location.toString(),push: 1});
            }
        };//событие кнопки назад сработает только уже после однократного применения ajax-загрузки 

        return this;
    };
    // проверяет url, на которых не надо срабатывать ajax (по шаблону игнорируемых url)
    function check_ignore (url) {
            for (var i in this.options.ignore) {
                if (url.indexOf(this.options.ignore[i]) >= 0) {
                    return false;
                }
            }
            return true;
        };


    function loadPage (params) {
App.events = {'uri':document.location.pathname};
//    options.url, push, getData, e, method;
// актуальные настройки, глобальные
var options = {url:'/',push:0, getData: "",e:undefined,method:"GET"};
for (var key in params){
    options[key] = params[key];
}
    if (this.options.warnings == true)
        console.log({'loadPage':this.options.isLoad});
    if (!this.options.isLoad) {
        if (this.options.scroll_top == true) {
            jQuery('html,body').animate({
                scrollTop: 0
            }, 1500);
        }
        this.options.isLoad = true;
        this.options.started = true;
        if (options.url.lastIndexOf('?_=')>0) options.url = options.url.slice(0,options.url.lastIndexOf('?_='));
        if (options.url.substr(options.url.length - 1) == '/' && options.url.substr(options.url.length - 2, 1) == '/') options.url = options.url.substr(0, options.url.length - 1);
        nohttp = options.url.replace("//", "").replace("https://", "");
        firstsla = nohttp.indexOf("/");
        pathpos = options.url.indexOf(nohttp);
        path = options.url.substring(pathpos + firstsla);
        if (options.push != 1) {
            if (typeof window.history.pushState == "function") {
                var stateObj = {
                    foo: 10000 + Math.random() * 10001
                };
                history.pushState(stateObj, "ajax page loaded...", path);
            } else {}
        }
        if (!jQuery('#' + this.options.content)) {
    if (this.options.warnings == true) console.log('! content return false;');
            return false;
        }
        if (this.options.warnings == true)
        console.log({'loadPage before fadeOut':this.options.content});
        jQuery('#' + this.options.content).fadeOut("slow", function() {
    if (this.options.warnings == true) console.log('fadeOut');
            var prev_content = document.getElementById(this.options.content).innerHTML;
            document.getElementById(this.options.content).innerHTML = this.options.loading_code;            
            jQuery('#' + this.options.content).fadeIn("slow", function() {
            if (this.options.warnings == true) console.log('fadeIn');
                jQuery.ajax({
                    type: options.method,
                    url: options.url,
                    data: options.getData,
                    cache: false,
                    dataType: "html",
                    done: function(data, textStatus, jqXHR) {
                if (this.options.warnings == true) console.log({'jQuery.ajax done':[data, textStatus, jqXHR]});
                        this.options.isLoad = false;
                    },
                    fail: function(data, textStatus, jqXHR) {
                if (this.options.warnings == true) console.log({'jQuery.ajax fail':[data, textStatus, jqXHR]});
                        this.options.isLoad = false;
                    },
                    success: function(data) {
                if (this.options.warnings == true) console.log({'jQuery.ajax success':data});
// parseInt(document.body.className.match( /\d+/ ))||0
                        this.options.isLoad = false;
                        var title = (data.split('<title>')[1]||'').split('</title>')[0]||'';
                        if (title.length > 0)
                            jQuery(document).attr('title', (jQuery("<div/>").html(title).text()));
                        if(typeof options.getData=="undefined"){options.getData='';} else {options.getData='?'+options.getData;}
                        if (this.options.track_analytics == true) {
                            if(typeof _paq!="undefined"){
                            _paq.push(['setCustomUrl', path+options.getData]);
                            _paq.push(['setDocumentTitle', decodeURI(title)]);
                            _paq.push(['trackPageView']);
                            }
                            if(typeof ga!="undefined"){
                            ga('send', 'pageview', path+options.getData);
                            }
                            if(typeof _yaq!="undefined"){
                            _yaq.hit(path+options.getData,decodeURI(title));
                            }
                        }
                        // try {
                        //     this.data_code(data);
                        // } catch (err) {}
                        var body_class = data.match( /<body class="([^\"]+)">/ )||'';
                        if (body_class.length>0)
                            {
                                document.body.className = body_class;
                            }
                        var page_id = document.body.className.match( /\d+/ )||0;
                        if (page_id>0 && $('#wp-admin-bar-edit').length>0){
                            $('#wp-admin-bar-edit a').attr('href',$('#wp-admin-bar-edit a').attr('href').replace(/=\d+/,'='+page_id));
                        }
                        data = data.split('id="' + this.options.content + '"')[1];
                        data = data.substring(data.indexOf('>') + 1);
                        var depth = 1;
                        var output = '';
                        while (depth > 0) {
                            temp = data.split('</div>')[0];
                            i = 0;
                            pos = temp.indexOf("<div");
                            while (pos != -1) {
                                i++;
                                pos = temp.indexOf("<div", pos + 1);
                            }
                            depth = depth + i - 1;
                            output = output + data.split('</div>')[0] + '</div>';
                            data = data.substring(data.indexOf('</div>') + 6);
                        }
                        document.getElementById(this.options.content).innerHTML = output;
                        jQuery('#' + this.options.content).css("position", "absolute");
                        jQuery('#' + this.options.content).css("left", "20000px");
                        jQuery('#' + this.options.content).show();
                        this.loadPageInit("#" + this.options.content + " ");
                        if (this.options.reloadDocumentReady == true) {
                            jQuery(document).trigger("ready");
                        }
                        try {
                            this.reload_code(path);
                        } catch (err) {console.log('reload failed')}
                        jQuery('#' + this.options.content).hide();
                        jQuery('#' + this.options.content).css("position", "");
                        jQuery('#' + this.options.content).css("left", "");
                        jQuery('#' + this.options.content).fadeIn("slow", function() {});
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                    if (this.options.warnings == true) console.log({'jQuery.ajax error':[jqXHR, textStatus, errorThrown]});
                        this.options.isLoad = false;
                        if (typeof ('$.fn.jGrowl') != 'undefined') $.jGrowl("Ошибка при загрузке "+options.url,{theme:'yellow',position:'top-left'});
                        document.getElementById(this.options.content).innerHTML = '<h1>Страница не существует</h1>';
                    }
                });//ajax
            });//fadeIn
        });//fadeOut
    }//!isLoad
};
        function loadPageInit (scope) {
            jQuery(scope + "a").click(function(event) {
                if (this.href.indexOf(this.options.home) >= 0 && this.check_ignore(this.href) == true) {
                    event.preventDefault();
                    this.blur();
                    var caption = this.title || this.name || "";
                    var group = this.rel || false;
                    try {
                        this.click_code(this);
                    } catch (err) {
                        if (this.options.warnings == true) {
                            txt = "ERROR: \nОшибика в click_code.\n";
                            txt += "Описание: " + err.message;
                            console.log(txt);
                        }
                    }
                    this.loadPage({url:this.href});
                }
            });
            jQuery('.' + this.options.search_class).each(function(index) {
                if (jQuery(this).attr("action")) {
                    this.options.searchPath = jQuery(this).attr("action");
                    jQuery(this).submit(function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        this.submitSearch(jQuery(this).serialize());
                        Track.custom_event_handler(e,this,'search');
                    });
                } else {}
            });
            if (jQuery('.' + this.options.search_class).attr("action")) {} else {}
            return this;
        };//loadInit

    function set_watchers(){
    // отслеживаем событие наведения курсора в добавлениях
    $(document).on('mouseenter',".adds_container " + "a", function(event) {Track.adds_event_handler(event,this);});
    // отслеживаем событие нажатия в добавлениях
    $(document).on('click',".adds_container " + "a", function(event) {Track.adds_event_handler(event,this);});
    // отслеживаем событие нажатия на feedback
    $(document).on('click',"#viewform", function(event) {Track.custom_event_handler(event,this,'feedback');});
    // отслеживаем событие нажатия на feedback_form
    $(document).on('click',".cme_btn", function(event) {Track.custom_event_handler(event,this,'feedback_form');});
    // отслеживаем событие нажатия на navigation
    $(document).on('click','#scroll-to-top,.postNavigation.nextPostBox,.postNavigation.prevPostBox', function(event) {Track.custom_event_handler(event,this,'navigation');});
    return this;
    };//\.set_watchers

        function submitSearch (param) {
            if (!this.options.isLoad) {
                this.loadPage({url:this.options.searchPath,push:0,getData:param});
            }
        };

        function reload_code (path) {
         var p = $(window).width()/12;
         var l = $('.lh-left').width();
         var r = $('.lh-right').width();
     if ($('.lh-main').height() > $('.lh-left').height() && $('.lh-main').height() > $('.lh-right').height()) {
         p = p * 10;
         }
         else{ p = p * 4;}

if (typeof Snd != undefined) Snd.init();
// //stackoverflow.com/questions/6868510/grab-a-script-and-reload-it-jquery
        jQuery("#"+this.options.content).find("script").each(function(i, script) {
                            eval($(script).text());
                                var src = $(script).attr("src")||'';
                                var id = $(script).attr("id")||'';
                            if (id.length>0 && $(document.head).find('#'+id).length>0) {
                            }
                            else if (src.length>0)
                            {
                                var sc = $(script).clone();
                                sc.attr("src",src);
                                sc.appendTo(document.header);
                                var n=document.createElement('script'),y=document.getElementsByTagName('head')[0];
                                n.async=1;if (id.length>0) n.setAttribute('id',id); n.src=src;y.appendChild(n);
                                $(script).remove();
                            }
        });
        };

        function click_code (thiss) {
        // highlight the current menu item
        jQuery('ul.menu li').each(function() {
            jQuery(this).removeClass('current-menu-item');
        });
        jQuery(thiss).parents('li').addClass('current-menu-item');
        };

        function data_code (dataa) {
        return undefined;
        };

var exports = {init:init,options:options,events:events,loadPageInit:loadPageInit};
return exports;
})();
 window.AjaxLoad = AjaxLoad;
return AjaxLoad;
})(this);

//свойство объекта, содержащее все функции для аналитики
(function(window) {
if (window !== top) return;
if (!!window.Track) {
return window.Track;
}
 var document = window.document;
var Track = (function() {
var options = {};

function adds_event_handler(e,t){
    var caption = t.title || t.name || "";
    var group = t.rel || false;
    var event_label = $($(".adds_container " + "a")[0]).parent().parent().parent().parent().parent().attr('id')||"";
    var event_id = $(t).data('id')||0;
    var params = {event:e.type,'id':event_id, href:$(t).attr('href')||"",'place':event_label,'caption':caption,'group':group};
    if (typeof App.Events["adds_"+e.type+"_"+event_id+"_"+event_label] == 'undefined') {
    App.Events["adds_"+e.type+"_"+event_id+"_"+event_label] = 1;
    }
    else{return;}
    if(typeof _paq!="undefined"){
    _paq.push(["trackEvent", "adds", e.type+"_"+event_id, event_id, params]);
    }
    if(typeof ga!="undefined"){
    ga('send', {
      'hitType': 'event',          // Required.
      'eventCategory': 'adds',   // Required.
      'eventAction': e.type,      // Required.
      'eventLabel': ""+event_id,
      'eventValue': params
    });
    }
    if(typeof _yaq!="undefined"){
    _yaq.reachGoal('adds_'+e.type,params);
    _yaq.hit('/#'+e.type+"?id="+event_id+"&place="+event_label);
    }
};
function custom_event_handler(e,t,m){
if (typeof App.Events[m+"_"+e.type] == 'undefined') {
App.Events[m+"_"+e.type] = 1;
}
else{return;}
if(typeof _paq!="undefined"){
_paq.push(["setCustomVariable", Math.random()*100, e.type, m, "page"]);
_paq.push(['setCustomUrl', "/#"+m]);
// _paq.push(['trackPageView']);
_paq.push(["trackEvent", m, e.type]);
}
if(typeof ga!="undefined"){
ga('send', {
  'hitType': 'event',          // Required.
  'eventCategory': m,   // Required.
  'eventAction': e.type,      // Required.
});}
if(typeof _yaq!="undefined"){
_yaq.reachGoal(m,e.type);
_yaq.hit('/#'+m);
}};
var exports = {custom_event_handler:custom_event_handler,options:options,adds_event_handler:adds_event_handler};
return exports;
})();
 window.Track = Track;
return Track;
})(this);
