var NOBBB;

NOBBB = {
	Message: null
};

NOBBB.setEvents = function () {
	var i, 
		chks = document.getElementsByClassName("chksites");
	
	document.getElementById('config-button').onclick = function () {
		NOBBB.Controller.select('config');
	};

	document.getElementById('words-button').onclick = function () {
		NOBBB.Controller.select('words');
	};
	
	for (i = 0; i < chks.length; i++) {
		chks[i].onchange = function () {
			NOBBB.Config.check(this);
		}
	}
	
	document.getElementById('nobbb-arrow').onclick = function () {
		NOBBB.Pack.arrow(this);
	}
	
	document.getElementById('yours-arrow').onclick = function () {
		NOBBB.Pack.arrow(this);
	}
	
	document.getElementById('nobbb-check').onchange = function () {
		NOBBB.Pack.check(this);
	}
	
	document.getElementById('yours-check').onchange = function () {
		NOBBB.Pack.check(this);
	}
	
	document.getElementById('yours-input-icon').onclick = function () {
		NOBBB.Pack.add();
	}
	
}

NOBBB.Message = {

	send: function(type, msg){
		//chrome.tabs.executeScript(null, {code:"receive('oi')"});
		/*chrome.extension.onRequest.addListener(function(msg, sender, sendResponse) {
			sendResponse(msg);
		});*/
		chrome.tabs.getSelected(null, function(tab) {
		  chrome.tabs.sendRequest(tab.id, {twitter: "true", facebook: "true", uol: "true", globo:"true", r7:"true", terra:"true", ig: "true", msn: "true", yahoo: "true", words: "bbb|big brother"}, function(response) {
			console.log('sending');
		  });
		});
		
		
	}

};

NOBBB.Config = {

	local: {
		init: 'true',
		twitter: 'true',
		facebook: 'true',
		uol: 'true',
		globo: 'true',
		r7: 'true',
		terra: 'true',
		ig: 'true',
		msn: 'true',
		yahoo: 'true',
		words: '',
		words_pass: '',
		frozen_init: 'false',
		nobbb_words: 'bbb|big ?brother|boninho|paredao|estalecas|casa ? de ?vidro',
		yours_check: 'true',
		yours_opened: 'true',
		nobbb_check: 'true',
		nobbb_opened: 'true'
	},
	
	labels:['nobbb','yours'],
	
	words: [],
	
	check: function(el){
		var e = el.id.replace('chk','');
		localStorage[e] = el.checked;
		NOBBB.Controller.updateLocal();
		NOBBB.Controller.updateWords();
		NOBBB.Controller.updateStatus();
	}

};

NOBBB.Controller = {
	
	init: function(){

		document.querySelector('#version').innerHTML = chrome.runtime.getManifest().version;
	
		this.changeCard('#config-container','#tabcontent');
		if(!localStorage.init){
			this.initLocalStorage();
		}
		this.updateLocal();
		this.setPreferences();
		
	},
	
	updateStatus: function(){
		document.querySelector('#alert-container').style.display = "block";
		document.querySelector('#alert').innerHTML = "Atualize as abas para que as alterações tenham efeito.";
	},
	
	changeCard: function(from,to){
		document.querySelector(to).innerHTML = document.querySelector(from).innerHTML;
		this.setPreferences();
		NOBBB.setEvents();
		//CHROMEWORKSPACE.event.screenchanged();
	},
	
	select:function(leaf){
		document.querySelector('div.selected').className = "";
		document.querySelector('#'+leaf+'-button').className = "selected";
		this.changeCard('#'+leaf+"-container",'#tabcontent');
	},
	
	initLocalStorage: function(){
		for(var i in NOBBB.Config.local){
			localStorage.setItem(i, NOBBB.Config.local[i]);
		}
	},
	
	updateLocal: function(){
		for(var i in localStorage){
			if(NOBBB.Config.local.hasOwnProperty(i)){
				NOBBB.Config.local[i] = localStorage[i];
			}
		}
		if(localStorage.words != ""){
			NOBBB.Config.words = localStorage.words.split('|');
		}else{
			NOBBB.Config.words = [];
		}
	},
	
	bool: function(val){
		if(val === 'false'){
			return false;
		}else if(val === "true"){
			return true;
		}
	},
	
	updateWords: function(word){
		if(word){ 
			NOBBB.Config.words.push(word);
			if(localStorage.words != "")
				localStorage.words += "|";
			localStorage.words += word;
			NOBBB.Controller.updateLocal();
		}
							
		localStorage.words_pass = "";
		if(this.bool(NOBBB.Config.local.yours_check))
			localStorage.words_pass = NOBBB.Config.words.toString().replace(/,/g,'|');

		if(this.bool(NOBBB.Config.local.nobbb_check)){
			if(localStorage.words_pass != "")
				localStorage.words_pass += "|";
			localStorage.words_pass += NOBBB.Config.local.nobbb_words;
		}
		NOBBB.Controller.updateLocal();
		NOBBB.Controller.updateStatus();
	},
	
	setPreferences: function(){
		document.querySelector('#chktwitter').checked = this.bool(NOBBB.Config.local.twitter);
		document.querySelector('#chkfacebook').checked = this.bool(NOBBB.Config.local.facebook);
		document.querySelector('#chkuol').checked = this.bool(NOBBB.Config.local.uol);
		document.querySelector('#chkglobo').checked = this.bool(NOBBB.Config.local.globo);
		document.querySelector('#chkr7').checked = this.bool(NOBBB.Config.local.r7);
		document.querySelector('#chkterra').checked = this.bool(NOBBB.Config.local.terra);
		document.querySelector('#chkig').checked = this.bool(NOBBB.Config.local.ig);
		document.querySelector('#chkmsn').checked = this.bool(NOBBB.Config.local.msn);
		document.querySelector('#chkyahoo').checked = this.bool(NOBBB.Config.local.yahoo);
		
		if(this.bool(NOBBB.Config.local.yours_opened)){
			NOBBB.Pack.show('yours');
		}else{
			NOBBB.Pack.hide('yours');
		}
		
		if(this.bool(NOBBB.Config.local.nobbb_opened)){
			NOBBB.Pack.show('nobbb');
		}else{
			NOBBB.Pack.hide('nobbb');
		}
		
		document.querySelector('#yours-check').checked = this.bool(NOBBB.Config.local.yours_check);
		document.querySelector('#nobbb-check').checked = this.bool(NOBBB.Config.local.nobbb_check);
		
		NOBBB.Pack.update();

	}
	
};

NOBBB.Pack = {
	
	arrow: function(el){
		var e = el.id.split('-')[0];
		if(NOBBB.Controller.bool(NOBBB.Config.local[e + '_opened'])){
			localStorage[e + '_opened'] = "false";
		}else{
			localStorage[e + '_opened'] = "true";
		}
		NOBBB.Controller.updateLocal();
		NOBBB.Controller.setPreferences();
	},
	
	show: function(el){
		document.querySelector('#' + el + '-pack .pack-content').style.display = 'block';
		document.querySelector('#' + el + '-pack #' + el + '-arrow').src = "resources/up-arrow.png";
	},
	
	hide: function(el){	
		document.querySelector('#' + el + '-pack .pack-content').style.display = 'none';
		document.querySelector('#' + el + '-pack #' + el + '-arrow').src = "resources/down-arrow.png";
	},
	
	check: function(el){
		var e = el.id.replace('-','_');
		localStorage[e] = el.checked;
		NOBBB.Controller.updateLocal();
		NOBBB.Controller.updateWords();
	},
	
	getLi: function(value){
		var li = document.createElement('li');
		var img = document.createElement('img');
		var span = document.createElement('span');
		img.src = "resources/trash.png";
		img.onclick = function(evt){
			NOBBB.Pack.delete(evt);
		};
		span.innerHTML = value;
		li.appendChild(span);
		li.appendChild(img);
		return li;
	},
	
	update:function(){
		document.querySelector('#yours-pack ul').innerHTML = "";
		for(var i=0; i<NOBBB.Config.words.length; i++){
			document.querySelector('#yours-pack ul').insertBefore(this.getLi(NOBBB.Config.words[i]), document.querySelector('#yours-pack ul').getElementsByTagName('li')[0]);
		}
		
	},
	
	add: function(){
		var value = document.querySelector('#yours-input').value;
		document.querySelector('#yours-input').value = "";
		if(value){
			NOBBB.Controller.updateWords(value);
			document.querySelector('#yours-pack ul').insertBefore(this.getLi(value), document.querySelector('#yours-pack ul').getElementsByTagName('li')[0]);
		}
	},
	
	delete: function(evt){
		var li = evt.target.parentElement;
		var pos = null;
		var ls = localStorage.words.split('|');
		for(var i=0; i<ls.length; i++){
			if(li.querySelector('span').innerHTML == ls[i]){
				pos = i;
			}
		}

		ls.splice(pos,1);
		NOBBB.Config.words = ls;
		localStorage.words = ls.toString().replace(/,/g,"|");
		NOBBB.Controller.updateWords();

		document.querySelector('#yours-pack ul').removeChild(li);
	}
	
}

NOBBB.Controller.init();




