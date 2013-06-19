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
	
   NOBBB.init();
});
//},1000);

// Class 




NOBBB.config.facebook = {
	
	content_stream: '#home_stream',
	content_list_selector: 'li.uiStreamStory',
	content_logo: '#pageLogo',
	content_logo_href: 'http://www.facebook.com/?ref=logo',
	alert_component: "<div style='padding:10px; height:18px; background:#F0E68C;'><img src='"+chrome.extension.getURL("resources/logo19.png")
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
	alert_component: "<div style='background:#F0E68C; padding:2px; height:100%;' class='nobbb_portal_container' ><img src='"+chrome.extension.getURL("resources/logo19.png")
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
	if(url.match(/msn.com/)){
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

	var itemsChanged = {};

	var searchBBB = function(){
		var hists = document.querySelectorAll(NOBBB.config.facebook.content_list_selector);
		
		for(var h = 0; h < hists.length; h++){
			
			var cont = hists[h].getElementsByClassName('storyContent')[0];
			var mainWrapper = cont.getElementsByClassName('mainWrapper')[0];
			var messageBody = mainWrapper.getElementsByClassName('messageBody')[0];
			if(NOBBB.config.general.default_words != ""){
				if(messageBody && messageBody.innerHTML.match(new RegExp('(' + NOBBB.config.general.default_words + ')','gi')) && !itemsChanged.hasOwnProperty(hists[h].id)){
					itemsChanged[hists[h].id] = true;
					cont.style.display = "none";
					var d = document.createElement('div');
					d.className = NOBBB.config.general.divcontent_class;
					d.innerHTML = NOBBB.config.facebook.alert_component;
					d.onmousedown = function(evt,a){
						if(evt.target.parentElement.parentElement.getElementsByClassName('storyContent')[0]){
							evt.target.parentElement.parentElement.getElementsByClassName('storyContent')[0].style.display = "block";
							evt.target.parentElement.parentElement.removeChild(evt.target.parentElement.parentElement.getElementsByClassName(NOBBB.config.general.divcontent_class)[0]);
						}else{
							evt.target.parentElement.parentElement.parentElement.getElementsByClassName('storyContent')[0].style.display = "block";
							evt.target.parentElement.parentElement.parentElement.removeChild(evt.target.parentElement.parentElement.parentElement.getElementsByClassName(NOBBB.config.general.divcontent_class)[0]);
						}				
					}
					hists[h].appendChild(d);
				}
			}
			
		}
	};
	
	var main_contentArea = document.querySelector(NOBBB.config.facebook.content_stream);
	
	var getMain = function (){
        if (!main_contentArea){
            console.log(main_contentArea);
            main_contentArea = document.querySelector(NOBBB.config.facebook.content_stream);
            window.setTimeout(getMain, 500);
        } else {
            main_contentArea.addEventListener('DOMNodeInserted', function(){ searchBBB(); });
        }
    }
    
    getMain();
	
	document.querySelector(NOBBB.config.facebook.content_logo).onmousedown = function(){this.itemsChanged = {}; window.location.href =  NOBBB.config.facebook.content_logo_href;   } 
	
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
	NOBBB.portal('#trr-ctn-content');
}

NOBBB.globo = function(){
	NOBBB.portal('#bloco-principal');
}

NOBBB.ig = function(){
	NOBBB.portal('#geral');
}

NOBBB.r7 = function(){
	NOBBB.portal('.r7-container');
}

NOBBB.msn = function(){
	NOBBB.portal('#page');
}

NOBBB.yahoo = function(){
	NOBBB.portal('#y-cols');
}

NOBBB.portal = function (main_area){
	
	var itemsChanged = [], cont, h, i, hists, d, e, prov, pe, evtpe, divnb;

	var searchBBB = function(){
		hists = main_contentArea.getElementsByTagName('a');
		for(h = 0; h < hists.length; h++){
			
			cont = hists[h];
			if(NOBBB.config.general.default_words != ""){
				if(cont && (cont.innerHTML.match(new RegExp('(' + NOBBB.config.general.default_words + ')','gi')) || cont.href.match(new RegExp('(' + NOBBB.config.general.default_words + ')','gi'))) && !NOBBB.Util.contains(cont, itemsChanged)){
					itemsChanged.push(cont);
					pe = cont.parentElement;
					pe.style.position = "relative";

					d = document.createElement('div');
					d.style.position = "absolute";
					d.style.top = 0;
					d.style.width = "100%";
					d.style.height = "100%";
					d.className = NOBBB.config.general.divcontent_class + " nobbb_portal_blocker";
					d.innerHTML = NOBBB.config.portal.alert_component;
					d.onmousedown = function(evt,a){
						evtpe = evt.target.parentElement;
						while(evtpe.className.match(/nobbb/)){
							evtpe = evtpe.parentElement;
						}
						divnb = evtpe.getElementsByClassName('noBBBblocker');
						for (i = 0; i < divnb.length; i++) {
							try {
								evtpe.removeChild(divnb[i]);
							} catch (e) {}
						}
					}
					if (pe.appendChild) {
						pe.appendChild(d);
					}
				}
			}
			
		}
	};
	
	var main_contentArea = document.querySelector(main_area);
	//main_contentArea.addEventListener('DOMNodeInserted', function(){ searchBBB(); });
	searchBBB();
}


