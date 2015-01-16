var NOBBB = {};

NOBBB.config = {};

NOBBB.Util = {
	bool: function(val){
		if(val === 'false'){
			return false;
		}else if(val === "true"){
			return true;
		}
	},
	contains: function (value, arr){
		var i;
		for (i = 0; i < arr.length; i++) {
			if (arr[i] === value) {
				return true;
			}
		}
		return false;
	}
};

//window.setTimeout(function(){
chrome.extension.sendRequest({method: "getLocalStorage"}, function(response) {

	//console.log('response', response);
	if (response.frozen_init){
		NOBBB.config.general = {
		
			social_network: null, // current social network
			twitter: NOBBB.Util.bool(response.twitter),
			facebook: NOBBB.Util.bool(response.facebook),
			uol: NOBBB.Util.bool(response.uol),
			globo: NOBBB.Util.bool(response.globo),
			r7: NOBBB.Util.bool(response.r7),
			terra: NOBBB.Util.bool(response.terra),
			ig: NOBBB.Util.bool(response.ig),
			msn: NOBBB.Util.bool(response.msn),
			yahoo: NOBBB.Util.bool(response.yahoo),
			default_words: response.words,
			divcontent_class: 'noBBBblocker'
			
		}
	} else {
		NOBBB.config.general = {
		
			social_network: null, // current social network
			twitter: true,
			facebook: true,
			uol: true,
			globo: true,
			r7: true,
			terra: true,
			ig: true,
			msn: true,
			yahoo: true,
			default_words: 'bbb|big ?brother|boninho|paredao|estalecas|casa ? de ?vidro',
			divcontent_class: 'noBBBblocker'
			
		}
	}
	
	jQuery(document).ready(function() {
		NOBBB.init();
	});
  
});
//},1000);

// Class 




NOBBB.config.facebook = {
	
	content_stream: '#contentArea',
	content_list_selector: 'div._5uch',
	content_logo: '#pageLogo',
	content_logo_href: 'http://www.facebook.com/?ref=logo',
	alert_component: "<div style='padding:10px; height:18px; background:#F0E68C;'  class='nobbb_portal_container'><img src='"+chrome.extension.getURL("resources/logo19.png")
		+"' style='float:left' ><div style='margin:2px 0 0 30px;'>conte&uacute;do bloqueado pela extens&atilde;o NoBBB, se quiser ver clique aqui<br>"
		+"<a style='font-size: 9px; float:right;' href='http://facebook.com/luiscesarcoimbra' target='_blank'>by luiscoimbra</a></div></div>"
	
}

NOBBB.config.twitter = {
	
	content_stream: '.stream-container',
	content_logo: '#pageLogo',
	content_logo_href: 'http://www.facebook.com/?ref=logo',
	alert_component: "<div style='padding:10px; height:40px; background:#F0E68C;'><img src='"+chrome.extension.getURL("resources/logo19.png")
		+"' style='float:left' ><div style='margin:2px 0 0 30px;'>conte&uacute;do bloqueado pela extens&atilde;o NoBBB, se quiser ver clique aqui<br>"
		+"<a style='font-size: 9px; float:right;' href='http://twitter.com/luiscoimbra' target='_blank'>by luiscoimbra</a></div></div>"
}

NOBBB.config.uol = {
	content_stream: '#corpo',
	content_list_selector: '.modulo',
	alert_component: "<div style='background:#F0E68C; padding:10px; height:100%;' ><img src='"+chrome.extension.getURL("resources/logo19.png")
		+"' style='float:left; width: 19px; height: 19px' ><div style='margin:2px 0 0 30px;'>conte&uacute;do bloqueado pela extens&atilde;o NoBBB, se quiser ver clique aqui<br>"
		+"<a style='font-size: 9px; float:right;' href='http://twitter.com/luiscoimbra' target='_blank'>by luiscoimbra</a></div><div style='clear:both;'></div></div>"
}

NOBBB.config.portal = {
	alert_component: "<div style='background:#F0E68C; position:absolute; padding:2px; width:100%; height:100%; z-index:9999;'  class='nobbb_portal_container' ><img src='"+chrome.extension.getURL("resources/logo19.png")
		+"' style='float:left; width: 19px; height: 19px' ><div style='margin:2px 0 0 30px; font-size:10px;'>conte&uacute;do bloqueado pela extens&atilde;o NoBBB, se quiser ver clique aqui<br>"
		+"<a style='font-size: 9px; float:right;' href='http://twitter.com/luiscoimbra' target='_blank'>by luiscoimbra</a></div><div style='clear:both;'></div></div>"
}



// Make control


/*
c*hrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
	console.log(NOBBB);
    console.log(request, sender, sendResponse);
  }
);
*/

// \\Make control



NOBBB.init = function(){

	//console.log('NOBBB',NOBBB);
	NOBBB.util.getSocialNetwork();

	switch(NOBBB.config.general.social_network){
		case 'facebook':
			if(NOBBB.config.general.facebook)
				NOBBB.facebook();
		break;
		case 'twitter':
			if(NOBBB.config.general.twitter)
			NOBBB.twitter();
		break;
		case 'uol':
			if(NOBBB.config.general.uol)
			NOBBB.uol();
		break;
		case 'globo':
			if(NOBBB.config.general.globo)
			NOBBB.globo();
		break;
		case 'r7':
			if(NOBBB.config.general.r7)
			NOBBB.r7();
		break;
		case 'terra':
			if(NOBBB.config.general.terra)
			NOBBB.terra();
		break;
		case 'ig':
			if(NOBBB.config.general.ig)
			NOBBB.ig();
		break;
		case 'msn':
			if(NOBBB.config.general.msn)
			NOBBB.msn();
		break;
		case 'yahoo':
			if(NOBBB.config.general.yahoo)
			NOBBB.yahoo();
		break;
	}

};

NOBBB.util = {};

NOBBB.util.getSocialNetwork = function(){
	
	var url = document.location.href;
	var sn = ""; 
	if(url.match(/facebook.com/)){
		sn = "facebook";
	}
	if(url.match(/twitter.com/)){
		sn = "twitter";
	}
	if(url.match(/uol.com.br/)){
		sn = "uol";
	}
	if(url.match(/terra.com.br/)){
		sn = "terra";
	}
	if(url.match(/globo.com/)){
		sn = "globo";
	}
	if(url.match(/ig.com.br/)){
		sn = "ig";
	}
	if(url.match(/r7.com/)){
		sn = "r7";
	}
	if(url.match(/msn.com\/pt-br/)){
		sn = "msn";
	}
	if(url.match(/yahoo.com/)){
		sn = "yahoo";
	}
	NOBBB.config.general.social_network = sn;
	return sn;
	
}


//var qualredesocial = document.location.href;



NOBBB.facebook = function(){

	var parentEl, parentParentEl, userContentLength = 0;

	var userContentEach = function() {
		$('.userContent').each(function() {
			if (!$(this).hasClass('nobbb_edited_content')) {
				if ($(this).text().match(new RegExp('(' + NOBBB.config.general.default_words + ')','gi'))) {
					$(this).addClass('nobbb_edited_content');
					parentEl = $(this).parent();
					parentParentEl = parentEl.parent();
					parentParentEl.find('.userContentWrapper').hide();
					if (!parentParentEl.has('.nobbb_portal_container').length) {
						parentParentEl.prepend(NOBBB.config.facebook.alert_component);
						$('.nobbb_portal_container').on('click', function() {
							$(this).hide();
							$(this).parent().find('.userContentWrapper').show();
						});
					}
				}
			}
		});
	};

	$('#contentArea').on('DOMNodeInserted', function() {
		userContentEach();
	});

	userContentEach();

	$('#u_0_e a').on('click', function() {
		window.location.href =  NOBBB.config.facebook.content_logo_href;
	});
	
};

NOBBB.twitter = function(){

	var main_contentArea = document.querySelector(NOBBB.config.twitter.content_stream);
		
	function detectContent(){
		if(!main_contentArea){
			main_contentArea = document.querySelector(NOBBB.config.twitter.content_stream);
			window.setTimeout(detectContent, 100);
		}else{
			main_contentArea.addEventListener('DOMNodeInserted', function(){ searchBBB(); });
		}
	}
	
	detectContent();
	
	var itemsChanged = {};
	
	if(document.querySelector('.js-hover')){
		document.querySelector('.js-hover').onmousedown = function(){itemsChanged = {}; window.location.href = '/#!/';   }
	}else if(document.querySelector('#logo')){
		document.querySelector('#logo').onmousedown = function(){itemsChanged = {}; window.location.href = 'http://twitter.com/';   } 
	}

	searchBBB = function(){

			if(!window.location.href.match(/your_activity/gi)){
		
				var hists = document.querySelectorAll('.stream-item');
				for(var h = 0; h < hists.length; h++){
					
					var tt = hists[h].getElementsByClassName('tweet-text')[0];
					if(!tt) 
						tt = hists[h].getElementsByClassName('js-tweet-text')[0]; // NOVO TWITTER
					
					
					//debugger;
					if(NOBBB.config.general.default_words != ""){
						if(tt && tt.innerHTML.match(new RegExp('(' + NOBBB.config.general.default_words + ')','gi')) && !itemsChanged.hasOwnProperty(hists[h].id)){
							
							if(hists[h].getElementsByClassName('stream-item-content')[0]){
								hists[h].getElementsByClassName('stream-item-content')[0].style.display = "none";
							}else{
								hists[h].getElementsByClassName('js-stream-tweet')[0].style.display = "none"; // NOVO TWITTER
							}
							
							if(!hists[h].getElementsByClassName('noBBBblocker')[0]){
							
								var d = document.createElement('div');
								d.className = "noBBBblocker";
								d.innerHTML = NOBBB.config.twitter.alert_component;
								
								d.onmousedown = function(evt,a){

									var itemcontent = evt.target.parentElement.parentElement;
									if(itemcontent.className == "noBBBblocker"){
										itemcontent = itemcontent.parentElement;
									}
									itemsChanged[itemcontent.id] = true;
									itemcontent.getElementsByClassName('js-stream-tweet')[0].style.display = 'block';
									itemcontent.removeChild(itemcontent.getElementsByClassName('noBBBblocker')[0]);			
								}
								
								hists[h].appendChild(d);
							}
								
						}
					}
				}
			}
			
		}
	searchBBB();
};

NOBBB.uol = function() {
	NOBBB.portal('#corpo');
}

NOBBB.terra = function(){
	NOBBB.portal('#trr-ctn-general', 'terra');
}

NOBBB.globo = function(){
	NOBBB.portal('#home-pagecontent');
}

NOBBB.ig = function(){
	NOBBB.portal('#geral');
}

NOBBB.r7 = function(){
	NOBBB.portal('#content_scheme');
}

NOBBB.msn = function(){
	NOBBB.portal('#maincontent');
}

NOBBB.yahoo = function(){
	NOBBB.portal('.yui3-skin-sam');
}

NOBBB.portal = function (main_area, portal){

	var searchBBB = function(){
		
		if (portal && portal === "terra") {
			items = main_contentArea.find('p');
			console.log('terra selec', items);
		} else {
			items = main_contentArea.find('a');
		}
		jQuery(items).each(function() {
			if ($(this).text().match(new RegExp('(' + NOBBB.config.general.default_words + ')','gi'))) {
				$(this).css('position', 'relative');
				$(this).prepend(NOBBB.config.portal.alert_component);
			}
		});

		$('.nobbb_portal_container').on('click', function(event) {
			event.preventDefault();
			event.stopPropagation();
			$(this).parent().find('.nobbb_portal_container').remove();
			
		});

	};
	
	var main_contentArea = $(main_area);
	//main_contentArea.addEventListener('DOMNodeInserted', function(){ searchBBB(); });
	searchBBB();
}


