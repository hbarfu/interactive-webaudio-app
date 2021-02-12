/* game states can only be restored if the corresponding cookies are present client-sided. */

var restoring_state = false;
let cookieTags = ["msgs", "cams", "music", "ambis"];

function deleteAllCookies() {
	setCookie("msgs", "", 30);
	setCookie("cams", "", 30);
	setCookie("music", "", 30);
	setCookie("ambis", "", 30);
	console.log("cookies deleted");
}

function restoreState() {
	/*restore chat.*/
	if(getCookie("msgs").length == 0) {
		rmsg(msgs[0].id);
	}
	else {
		restoring_state = true;
		cookies = parseCookie("msgs");

		while( msgs.find(x => x.id == cookies[cookies.length-1] ).critical == true ) {
			cookies.splice(cookies.length-1, 1);
		}

		lastCookie = cookies.splice(cookies.length-1, 1)[0];
		setCookie("msgs", encodeCookie(cookies), 30);
		for(id of cookies) {
			msg = msgs.find(x => x.id == id);
			if(msg.id.includes("f")) restoreFMsg(msg);
			else if (msg.id.includes("u")) restoreUMsg(msg);
		}
		restoring_state = false;
		if(lastCookie.includes("f")) receiveMsg(msgs.find(x => x.id == lastCookie));
		else if(lastCookie.includes("u")) sendMsg(msgs.find(x => x.id == lastCookie));		
	}


	/*restore videos.*/
	cookies = parseCookie("cams");
	for(i = 0; i < cookies.length; i++) {
		vid = videos.find( x => x.id == cookies[i] );
		if(vid != undefined ) {
			setVideoSrc(camerasForCookie[i], vid.id );
			console.log("restored video: " + cookies[i]);
		}
	}

	/* restore music */
	cookies = parseCookie("music");
	console.log("music cookie: " + cookies);
	if(cookies.length == 0 || cookies[0].length == 0) musicTrack.transition();
	else musicTrack.transition( cookies[0] );

	/*restore freddys position on the map*/
	cookies = parseCookie("mapPosition");
	if(cookies.length >= 1 || cookies[0].length >= 1) setMapPosition(parseInt(cookies[0]));
}



function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function appendToCookie(cname, cvalue, exdays) {
	current = getCookie( cname );
	newval = current.length == 0 ? cvalue : "," + cvalue;
	setCookie( cname, getCookie(cname) + newval, exdays );
}

function parseCookie(cname) {
	return getCookie( cname ).split(",");
}

function encodeCookie(array) {
	str = "";
	for( item of array ) {
		str += item;
		str += ",";
	} 
	return str.slice(0, str.length-1);
}

var restoreUMsg = function(msgObject) {
	msg = document.createElement("div");
	msg.className = "chatmessage message-self";
	msg.innerHTML = msgObject.text;
	if (msgObject.text == "") msg.innerHTML = msgObject.id;
	msgspace.appendChild(msg);


	clearOptions();

	ch_current_msg = msgObject;

	msgspace.scrollTop = msgspace.scrollHeight;

	document.dispatchEvent(new CustomEvent("msg-sent", {
    	detail: msgObject
  	}));
}

var restoreFMsg = function(msgObject) {
			msg = document.createElement("div");
			msg.className = "chatmessage message-other";
			msg.innerHTML = msgObject.text;
			if (msgObject.text == "") msg.innerHTML = msgObject.id;
			msgspace.appendChild(msg);

			ch_current_msg = msgObject;

			msgspace.scrollTop = msgspace.scrollHeight;

	document.dispatchEvent(new CustomEvent("msg-received", {
    	detail: msgObject
  	}));
}

/* initialization stuff */
if(getCookie("cams").length == 0) {
	setCookie("cams", "n,n,n,n,n,n,n");
}
