chrome.extension.onRequest.addListener(
	function(request, sender, sendResponse) {
		console.log(sender.tab ?
				"from a content script:" + sender.tab.url :
				"from the extension");
	sendResponse({
		bgcolor: localStorage.bgcolor,
		twitter: localStorage.twitter,
		facebook: localStorage.facebook,
		uol: localStorage.uol,
		globo: localStorage.globo,
		r7: localStorage.r7,
		terra: localStorage.terra,
		ig: localStorage.ig,
		msn: localStorage.msn,
		yahoo: localStorage.msn,
		words: localStorage.words_pass,
		frozen_init: localStorage.frozen_init
	});
});