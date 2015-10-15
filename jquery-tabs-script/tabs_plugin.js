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
            'margin: 0 0 30px;',
            '}',
            '.tab_plugin ul.tabs {',
            'height: 36px;',
            'line-height: 33px;',
            'list-style: none;',
            'border-bottom: 1px solid #DDD;',
            'padding:0;',
            'margin-bottom:0;',
            '}',
            '.tab_plugin .tabs li:before{display:none}',
            '.tab_plugin .tabs li {',
            'border-radius: 3px 3px 0 0;',
            'float: left;',
            'display: inline;',
            'background: #fff;',
            'margin: 0 2px -1px 2px;',
            'padding: 0 10px 0 10px;',
            'color: #777;',
            'cursor: pointer;',
            'border: 1px solid transparent;',
            'border-bottom: 1px solid #F9F9F9;',
            'position: relative;',
            '}',
            '.tab_plugin .tabs li:hover,',
            '.tab_plugin.vertical .tabs li:hover {',
            '}',
            '.tab_plugin .tabs li.current {',
            'color: #444;',
            'padding: 0 13px 2px;',
            'border: 1px solid #D4D4D4;',
            'border-bottom: 1px solid transparent;',
            '}',
            '.tab_plugin .box {',
            'display: none;',
            'padding: 0 12px;',
            '}',
            '.tab_plugin .box.visible {',
            'display: block;',
            '}',
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
            'border-radius:3px 0 0 3px;',
            'border-width: 0 1px;',
            'padding: 0 13px;',
            'margin: 0 0 0 2px;',
            'border: 1px solid transparent;',
            'width: 134px;',
            'border-right: 1px solid #D4D4D4;',
            'overflow: hidden;',
            '}',
            '.tab_plugin.vertical ul.tabs{border-bottom: none;}',
            '.tab_plugin.vertical .tabs li.current {',
            'width: 134px;',
            'color: #444;',
            'border: 1px solid #D4D4D4;',
            'border-right: 1px solid transparent;',
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
