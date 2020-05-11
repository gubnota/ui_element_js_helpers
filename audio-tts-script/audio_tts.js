"use strict";

(function(window){
if (window !== top) return;
if (!! Snd) return window.Snd;
    var document = window.document;
    var Snd = (function(){
    var options = {
        css:[],//специальный css
        detect_locale:true,
        lang:'en',
        serice:'baidu',
        css_path:false,//можно глобальный
        class:'snd',
    },
    dic = {'en':{}};
      function init(){
      _css();
      _event();
      };
      function _event(){
var aud = {};
var tds = document.querySelectorAll('.snd');
var handleTouch = function(e){
if(window.touched!==undefined || window.sndseq != undefined)return;
window.touched=true; var j = 0; var c = e.target;
while (!c.classList.contains('snd') || j>8) {j++; c = c.parentElement;}
c.className +=' touched';
    setTimeout(function(){c.className=c.className.replace(' touched','')},1500);
    setTimeout(function(){window.touched=undefined},300);
    
    var pl = c.getAttribute('data')||c.innerText, l = c.getAttribute('lang')||'zh';
        var pls = pl.split(';');window.sndseq=[];
        for(var i = 0; i<pls.length; i++){
        if (aud[pls[i]] === undefined) {
            var src = "//fanyi.baidu.com/gettts?lan="+l+"&text="+encodeURIComponent(pls[i])+"&spd=4&source=web";//"//tts.voicetech.yandex.net/tts?text="+encodeURIComponent(pls[i])+"&lang=zh_CN";
        }else {var src = aud[pls[i]];}
        var a = new Audio(src); a.type='audio/mp3';
        sndseq.push(a);
};
if (sndseq.length>0){window.sndseq[sndseq.length-1].addEventListener('ended', function(){window.sndseq=undefined;});}

for(var i = 0; i<sndseq.length-1; i++){
window.sndseq[i].addEventListener('ended', (function(arg1){
    return function(){
      window.sndseq[arg1+1].play();
    };
  }(i)));
}

if (sndseq.length>0){window.sndseq[0].play();}

    };
for (var i=0, max=tds.length; i < max; i++) {
var ClickOrTouchEvent = ("ontouchend" in document.documentElement ? "touchend" : "click");
tds[i].addEventListener(ClickOrTouchEvent, handleTouch, false);
}
}
      function _css(){
            if (document.getElementById('audio_tts_plugin_css') == undefined){
            var css = document.createElement('style');

            css.innerHTML = ['.snd{',
'cursor: pointer;',
'}',
'.snd{transition: all 1s steps(1) steps(1);',
'-webkit-transition: all 1s steps(1)  steps(1);',
'}',
'.snd:active{transition: all 0s;',
'}',
'.snd{background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABbklEQVR42q3VTStEUQDG8TNGXmLpbaUs1JSVmhglDTaSrKYs7CxMCbFQktUoG3sRasZgg9kYNY0aqUHKalghFhRfwEssxl89U5qauffG4nd6zune53br3HNNNpv9V6bb32PHCBJIwgdTgK3CM1xhCDHsab0JFU4KS/CANIzMYkt5HM+Yslt4j0TeWggRGPHhEbtWhRmklPMLw8rDGIBR6Vqu0I1y5PKxCk2Bwk3lDrxjTvM3+H/CBqq1WIogTJHCdWUvyvGJFt2XMgzXcMFYUeGK8i0G0Yk46nBqGE7gdlAYVW7HBcqQQgPifylsxSUqcYR6HBqGcxgHhavKNwigGweoRdroKVFEJIyaIoVryn5U4QMeBJE0moR+2cYrPBbbpk3XTWv+hc5Cr7aILJqLbOwAupRfsGz16c2r1AsjC3mfXi+esGP3tJlR6YTmY9hXnlTZqNPjqx8ZFd1hSeuNcDk+D6UPMcStDth//wV8A6V03AOrefb6AAAAAElFTkSuQmCC) no-repeat left center transparent;',
'background-size: 20px 20px;',
'padding-left: 20px;',
'}',
'.snd.touched{background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABaElEQVR42sXUzyuDcQDH8e9MfsTRr5NyUCsntZhaIhdJTisHNwcrIQ5qyWnKxV00ajNcsIupNTWpIeU0TogDxT/gRxzmrT4rrbZnTzt46vXt8/32PJ+np77P1/zPFciOI4EkPDAFMVg5xzVGEcO+1ttQY6ewAo9Iw0gA28pTeMFsqYUPSOStBRGBEQ+esGdVmEFKOb8wrDyGYRiVhnKFTlQjl09UaAoUbin34AMLmr+j7zdsol6LlfDDFCncUHajGl/o0HMpw3ADB4wVFa4p32EEXsTRhDPDcAqnjcKocjcuUYUUWhAvp7ATV6jFMZpxZBguYGwUrivfwod+HKIRaaO3RBGRMBqKFIaU+1CHT7jgR9JoEvxjB29wWWybLt03p/k3vIU+bRlZtBfZ2D70Kr9i1erXW1SpG0aW8n69ATxjt9TTZl6l05pP4kB5RmUTdo+vIWRUdI8VrbfCYfs8lEHEELd5wJbvB5xcccdx4rqHAAAAAElFTkSuQmCC) no-repeat left center transparent;',
'}'].join("\n").replace(/\.snd/g,'.snd');
            css.id = 'audio_tts_plugin_css';
            document.head.appendChild(css.cloneNode(true));
            }

      }
    var exports = {init:init};
    return exports;
    })();// если без (), то вызывать надо Snd().func()
window.Snd = Snd;
return Snd;
})(this);
// Вызов
