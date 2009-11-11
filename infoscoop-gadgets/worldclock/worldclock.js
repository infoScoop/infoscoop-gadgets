worldclock1 = new worldclock();
worldclock1.dispclock();

function worldclock(){
	var container = _gel("worldclock");
	var prefs = new gadgets.Prefs();
	prefs.setDontEscape_();
	
	var contentLink = prefs.getString("contentLink");
	
	if(contentLink && contentLink.length > 0){
		container.onclick = function(){
			window.open(contentLink);
		}
		container.style.cursor = "pointer";
	}
	
	var t = new Date();
	var yy = t.getFullYear();

	if(yy < 2007){
		var apr = new Date(yy, 3, 7);
		var firstsunday = 7 - apr.getDay();
		var oct = new Date(yy, 9, 31);
		var lastsunday = 31 - oct.getDay();
		nydstbegin = new Date(yy, 3, firstsunday, 2, 0, 0);
		nydstend = new Date(yy, 9, lastsunday, 1, 0, 0);
	} else {
		var mar = new Date(yy, 2, 7);
		var secondsunday = 14 - mar.getDay();
		var nov = new Date(yy,10,7);
		var firstsunday = 7 - nov.getDay();
		nydstbegin = new Date(yy, 2, secondsunday, 2, 0, 0);
		//End of Summer time at New York is written as 2:00am, but 2:00 becomes 1:00 again
		nydstend = new Date(yy, 10, firstsunday, 1, 0, 0);
	}

	var mar = new Date(yy, 2, 31);
	var lastsundaymar  = 31 - mar.getDay();
	var oct = new Date(yy,10,7);
	var lastsundayoct = 31 - oct.getDay();
	lndstbegin = new Date(yy, 2, lastsundaymar, 1, 0, 0);
	//End of Summer time at London is wrriten as 1:00am, but 2:00 becomes 1:00 again
	lndstend = new Date(yy, 9, lastsundayoct, 1, 0, 0);

	tz_lc =  t.getTimezoneOffset() * 60000;
	tz_et =  5 * 3600000 ;
	tz_jp = -9 * 3600000 ;
	tz_uk =  0;
	
	this.dispclock  = function dispclock(){
		var n= new Date();
		disptime(n, tz_lc, tz_lc, 'jp');
		disptime(n, tz_uk, tz_uk, 'uk');
		disptime(n, tz_et, tz_et, 'et');
		setTimeout('worldclock1.dispclock()', 1000);
		
		gadgets.window.adjustHeight();
	}

	function disptime(n, tz, locale, disp){
		var t = calctime(n, tz, locale);
		document.getElementById(disp + '_date').innerHTML = t.date;
		document.getElementById(disp + '_time').innerHTML = t.time;
		document.getElementById(disp + '_dst').className = t.dst;
	}

	function calctime(now, tz, locale) {
		var t= new Date();
		t.setTime(now.getTime() + (tz_lc - tz));

		var dstoffset = dst(t,locale);
		t.setTime(t.getTime() + dstoffset);
		
		return {
			date : t.getFullYear() + "/" + f(t.getMonth() + 1) + "/" + f(t.getDate()),
			time : f(t.getHours()) + ":" + f(t.getMinutes()) + ":" + f(t.getSeconds()),
			dst  : dstoffset > 0 ? "show" : "hide"
		};
	}

	function dst(lt,tz){
		if (tz == tz_et && lt.getTime() >= nydstbegin.getTime() && lt.getTime() <= nydstend.getTime() ){
			return 3600000 ;
		} else if (tz == tz_uk && lt.getTime() >= lndstbegin.getTime() && lt.getTime() <= lndstend.getTime() ){
			return 3600000;
		}else {
			return 0;
		}
	}

	function f(v){
		return v < 10 ? v = "0" + v : v;
	}
}