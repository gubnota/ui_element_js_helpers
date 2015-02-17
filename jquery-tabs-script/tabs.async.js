(function(w){var t = setInterval(function(){if (w.jQuery){clearInterval(t);
$(function() {

if (document.getElementById('tab_plugin_css') == undefined){
document.getElementById('tab_plugin_css')
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
            '}',
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

})
}},0);})(window);
