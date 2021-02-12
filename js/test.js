/*window.addEventListener('keyup', function(e) {
	switch(e.keyCode) {
		case 68: //t
				chat_humanize = !chat_humanize;
			break;
		case 77: //m
			if(mute) unmuteAudio();
			else muteAudio();
			break;
		case 67: //c:
			deleteAllCookies();
			break;
	}
});*/

var test = function(func, delay) {
	setTimeout(function(){ console.log("testing: " + func.name); func(); }, 1000*delay);
}

var testcases = function() {
	console.log("starting test scenario.");
	calculateVh();
	
	if(getCookie("msgs").length != 0) {
		if(getCookie("lang") == "en") {
			loadScript("js/chat_english.js?v=1.3", ()=>{
				showPrompt("Welcome back!", "", ["<p class=\"chatmessage message-self welcome-back\">Continue</p>", "<p class=\"chatmessage message-self welcome-back\">Restart</p>"], [
					()=>{init();},
					function() { deleteAllCookies(); window.location.reload(false);  }
				 ]);
			});

		}
		else {
			loadScript("js/chat_deutsch.js?v=1.3", ()=>{
				showPrompt("Willkommen zurück!", "", ["<p class=\"chatmessage message-self welcome-back\">Weiterspielen</p>", "<p class=\"chatmessage message-self welcome-back\">Neu laden</p>"], [
					()=>{init();},
					function() { deleteAllCookies(); window.location.reload(false);  }
				 ]);
			});
		}		
	}

	else {
		let l = navigator.language;
		var alert = "";
		if (l.includes("de")) alert = "Diese Website verwendet Cookies, um deinen Fortschritt zu speichern und zu Analysezwecken. Für weitere Informationen lies bitte die Datenschutzerklärung.";
		else alert = "This website uses cookies to store your progress and for analysis purposes. For more information, please see the privacy policy.";
		showPrompt("", "", ["<p><img src=\"img/icon_DE.png\"/></p><p><img src=\"img/font_DE.png\"/></p>", "<p><img src=\"img/icon_EN.png\"/></p><p><img src=\"img/font_EN.png\"/></p>", "<p class=\"newline\">" + alert + "</p>"], 
		[ 
			()=>{
				setCookie("lang", "de", 30);
				loadScript("js/chat_deutsch.js?v=1.3", ()=>{init();});
			}, 
			()=>{
				setCookie("lang", "en", 30);
				loadScript("js/chat_english.js?v=1.3", ()=>{init();});
			}, 
			()=>{
				showImpressum();
			}, 
		]);
	}

	var init = function() {
			closePrompt();
			audio_init();
			//musicTrack.transition();
			ambiTrack.transition();
			initCams();
			restoreState();
	}
}



window.addEventListener("load", testcases);
