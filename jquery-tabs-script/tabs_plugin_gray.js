/*
Copyright 2015 Gubnota Tech (Shenzhen) Ltd, Art Well Enterprise (HK) Ltd.
All rights reserved. Licensed under the Apache License,
Version 2.0 (the "License"); you may not use this file except in
compliance with the License. You may obtain a copy of the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
Written by: Vladislav Muravyev
Inspired by: simplest-universal-jquery-tabs-script
To Load button, call it like:
<script>(function(f,e,n,k,i){
if(!e.getElementById('tabs_plugin_script'))
      {var n=e.createElement(n),y=e.getElementsByTagName(i)[0];n.setAttribute('id','tabs_plugin_script');n.async=1;n.src=k;y.appendChild(n);n.onload = function() {
TabsPlugin.init();}}
else{TabsPlugin.init();}
})(window,document,'script','/assets/js/jquery/tabs_plugin.js','head');
</script>
Or:
<script src="/assets/js/jquery/tabs_plugin.js"></script>
<script>
TabsPlugin.init();
</script>
*/

(function(window) {
if (window !== top) return;
if (!!window.TabsPlugin) {
return window.TabsPlugin;
}
 var document = window.document;
var TabsPlugin = (function() {
      function init(){
      _css();
      _event();
      };

      function _event(){
      var t = setInterval(function(){if (window.jQuery){clearInterval(t);
                  $('.tab_plugin ul.tabs').each(function() {
                        if ($(this).find('li.current').length==0)
                        {
                              $(this).find('li:first').addClass('current').siblings().removeClass('current')
                                          .parents('.tab_plugin').find('div.box').eq($(this).index()).fadeIn(150).siblings('div.box').hide();
                        }
                  });
                  $('.tab_plugin ul.tabs').each(function() {
                        $(this).find('li').each(function(i) {
                              $(this).click(function(){
                                    $(this).addClass('current').siblings().removeClass('current')
                                          .parents('.tab_plugin').find('div.box').eq($(this).index()).fadeIn(150).siblings('div.box').hide();
                              });
                        });
                  });
      }},0);

      };

      function _css(){
            if (document.getElementById('tab_plugin_css') == undefined){
            var css = document.createElement('style');

            css.innerHTML = ['.tab_plugin {',
            'min-width: 300px;',
            'max-width: 100%;',
            'background: #EFEFEF;',
            'margin: 0 0 30px;',
            '}',
            '.tab_plugin ul.tabs {',
            'height: 28px;',
            'line-height: 25px;',
            'list-style: none;',
            'border-bottom: 1px solid #DDD;',
            'background: #FFF;',
            'padding:0;',
            'margin-bottom:0;',
            '}',
            '.tab_plugin .tabs li:before{display:none}',
            '.tab_plugin .tabs li {',
            'float: left;',
            'display: inline;',
            'margin: 0 1px -1px 0;',
            'padding: 0 13px 1px;',
            'color: #777;',
            'cursor: pointer;',
            'background: #F9F9F9;',
            'border: 1px solid #E4E4E4;',
            'border-bottom: 1px solid #F9F9F9;',
            'position: relative;',
            '}',
            '.tab_plugin .tabs li:hover,',
            '.tab_plugin.vertical .tabs li:hover {',
            'color: #F70;',
            'padding: 0 13px;',
            'background: #FFFFDF;',
            'border: 1px solid #FFCA95;',
            '}',
            '.tab_plugin .tabs li.current {',
            'color: #444;',
            'background: #EFEFEF;',
            'padding: 0 13px 2px;',
            'border: 1px solid #D4D4D4;',
            'border-bottom: 1px solid #EFEFEF;',
            '}',
            '.tab_plugin .box {',
            'display: none;',
            'border: 1px solid #D4D4D4;',
            'border-width: 0 1px 1px;',
            'background: #EFEFEF;',
            'padding: 0 12px;',
            '}',
            '.tab_plugin .box.visible {',
            'display: block;',
            '}',
            '',
            '.tab_plugin.vertical {',
            'min-width: 140px;',
            'border-left: 160px solid #FFF;',
            '}',
            '.tab_plugin.vertical .tabs {',
            'width: 160px;',
            'float: left;',
            'display: inline;',
            'margin: 0 0 0 -160px;',
            '}',
            '.tab_plugin.vertical .tabs li {',
            'padding: 0 13px;',
            'margin: 0 0 1px;',
            'border: 1px solid #E4E4E4;',
            'border-right: 1px solid #F9F9F9;',
            'width: 132px;',
            'height: 25px;',
            'overflow: hidden;',
            '}',
            '.tab_plugin.vertical .tabs li:hover {',
            'width: 131px;',
            '}',
            '.tab_plugin.vertical .tabs li.current {',
            'width: 133px;',
            'color: #444;',
            'background: #EFEFEF;',
            'border: 1px solid #D4D4D4;',
            'border-right: 1px solid #EFEFEF;',
            'margin-right: -1px;',
            '}',
            '.tab_plugin.vertical .box {',
            'border-width: 1px;',
            '}'].join("\n");
            css.id = 'tab_plugin_css';
            document.head.appendChild(css.cloneNode(true));
            }

      }
var exports = {init:init};
return exports;
})();
 window.TabsPlugin = TabsPlugin;
return TabsPlugin;
})(this);
