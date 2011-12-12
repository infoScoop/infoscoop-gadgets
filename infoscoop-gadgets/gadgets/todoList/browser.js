var Browser = new Object();

Browser.isMozilla = (typeof document.implementation != 'undefined') && (typeof document.implementation.createDocument != 'undefined') && (typeof HTMLDocument!='undefined');
Browser.isIE = window.ActiveXObject ? true : false;
Browser.isFirefox = (navigator.userAgent.toLowerCase().indexOf("firefox")!=-1);
Browser.isFirefox3 = (navigator.userAgent.toLowerCase().indexOf('firefox/3.')>-1);
Browser.isOpera = (navigator.userAgent.toLowerCase().indexOf("opera")!=-1);

Browser.isSafari = (navigator.userAgent.toLowerCase().indexOf("safari")!=-1);
Browser.Safari = {};
Browser.Safari.version = (function() {
	var versions = navigator.userAgent.match(/.*AppleWebKit\/(\d+).+Safari\/(\d+).*/);
	if( !versions || versions.length < 2 )
		return NaN;
	
	var webkitVer = parseInt( versions[1] );
	var safariVer = parseInt( versions[2] );
	
	if( isNaN( webkitVer )|| isNaN( safariVer ))
		return NaN;
	
	if( webkitVer < 412 ) {
		return 1;
	} else if( webkitVer < 522 ) {
		return 2;
	}
	
	return 3;
})();
Browser.isSafari1 = ( Browser.isSafari && Browser.Safari.version == 1 );
