var Browser = new Object();

Browser.isMozilla = (typeof document.implementation != 'undefined') && (typeof document.implementation.createDocument != 'undefined') && (typeof HTMLDocument!='undefined');
Browser.isIE = window.ActiveXObject ? true : false;
Browser.isFirefox = (navigator.userAgent.toLowerCase().indexOf("firefox")!=-1);
Browser.isFirefox3 = (navigator.userAgent.toLowerCase().indexOf('firefox/3.')>-1);
Browser.isOpera = (navigator.userAgent.toLowerCase().indexOf("opera")!=-1);

Browser.isSafari = (navigator.userAgent.toLowerCase().indexOf("safari")!=-1);
Browser.Safari = {};
Browser.Safari.version = (function() {
	return 3;
})();
Browser.isSafari1 = ( Browser.isSafari && Browser.Safari.version == 1 );
