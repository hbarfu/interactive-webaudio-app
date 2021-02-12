progress = undefined;

loadbar_bar = document.getElementById("loadbar-bar");
loadbar = document.getElementById("loadbar");
loadcircle = document.getElementById("loadcircle");
volume_dot = document.getElementById('volume-dot');
volume_bar = document.getElementById('volume-bar');
impressum_button = document.getElementById("impressum-button");
impressum = document.getElementById("impressum");
overlay = undefined;
freddyMapIcon = document.getElementById("freddy-mapicon");

impressum_button.addEventListener("click", showImpressum);



function showImpressum() {
	if (overlay == "video") close_video();
	impressum.style.height = "100%";
	document.getElementById("close-video-window").style.display = "block";
	overlay = "impressum";	
}

window.addEventListener("orientationchange", function () {
  console.log("The orientation of the screen is: " + window.orientation);
  //resizeMessageSpace();
  for (el of document.getElementsByClassName("islandsize") ) {
		el.style.transform = "";
	}
	offset_sea = {x:0, y:0};
});

window.addEventListener('resize', resizeMessageSpace);

window.addEventListener('resize', calculateVh);

function calculateVh() {
  	document.querySelector(':root').style.setProperty('--vh', window.innerHeight/100 + 'px');
}

volume_dot_x = undefined;

volume_dot.addEventListener('mousedown', function(e) {
    e.preventDefault();
    e.stopPropagation();
    document.addEventListener('mousemove', mousemove);
    var result;
    function mousemove(e) {
        seeker_dot_drag(e.clientX);
    }
    document.addEventListener('mouseup', mouseup);
    function mouseup(e) {
        document.removeEventListener('mousemove', mousemove);
        document.removeEventListener('mouseup', mouseup);
    }
});

volume_bar.addEventListener("click", function(e) {
	e.preventDefault();
    e.stopPropagation();
    var result;
    seeker_dot_drag(e.clientX);
});

var seeker_dot_temp_x = -1;

function seeker_dot_drag(x) {
    var rect = document.getElementById("volume-bar").getBoundingClientRect();
    var dotrect = document.getElementById("volume-dot").getBoundingClientRect();
    var halfdotsize = (dotrect.right - dotrect.left) / 2;
    var t;
    if(x > rect.left + halfdotsize && x < rect.right - halfdotsize) {
        t = x - rect.left - halfdotsize;
        volume_dot.style.transform = "translateX(" + t + "px)";
        seeker_dot_temp_x = t;
    }
    else if (! (x > rect.left + halfdotsize)) {
    	seeker_dot_temp_x = 0;
    	t = 0;
    	volume_dot.style.transform = "translateX(0)";
    }
    else if (! (x < rect.right - halfdotsize)) {
    	seeker_dot_temp_x = 1;
    	t = rect.right-rect.left-2*halfdotsize;
    	volume_dot.style.transform = "translateX(" + t + "px)";
    }
    document.dispatchEvent(new CustomEvent("volume-control-change", {
		detail: {gain: t / ((rect.right - halfdotsize) - (rect.left + halfdotsize )) }
	}));
}

function handleDotMove(e) {
	volume_dot.style.transform = "translateX(" + (e.clientX - volume_dot_x) + ")";
}

document.addEventListener('credits-ended', function(e) {
	if(getCookie("lang") == "en") {
		showPrompt("Freddy's story ends here.", "", ["<p class=\"chatmessage message-self welcome-back\">Play again</p>", "<p class=\"chatmessage message-self welcome-back\">Stay here</p>"], [()=>{closePrompt(); deleteAllCookies(); window.location.reload(false);}, ()=>{deleteAllCookies(); closePrompt(); musicTrack.transition(17);}]);
	}
	else {
		showPrompt("Freddys Geschichte ist hier zu Ende.", "", ["<p class=\"chatmessage message-self welcome-back\">Neu anfangen</p>", "<p class=\"chatmessage message-self welcome-back\">Hier bleiben</p>"], [()=>{closePrompt(); deleteAllCookies(); window.location.reload(false);}, ()=>{deleteAllCookies(); closePrompt(); musicTrack.transition(17);}]);
	}
});

document.addEventListener('volume-control-change', function(e) {
	volume = e.detail.gain;
	master.gain.setValueAtTime(volume, context.currentTime);
});

document.addEventListener('loading-complete', function(e) {
    //console.log("download queue is now empty.");
    //loadbar_bar.style.width = "0";
    //loadbar.style.display = "none";
    //loadbar.style.opacity = "";
    loadcircle.style.display = "none";
    document.getElementById("volume-control").style.opacity = 1.0;
    document.getElementById("volume-icon").style.opacity = 1.0;
});

document.addEventListener('loading-progress', function(e) {
    //console.log("document received loading-progress update: " + e.detail);
    //loadbar.style.display="block";
    //loadbar.style.opacity=1.0;
    //loadbar_bar.style.width = (e.detail * 80 + 20)  + "%";
    loadcircle.style.display = "block";
    document.getElementById("volume-control").style.opacity = 0.0;
    document.getElementById("volume-icon").style.opacity = 0.0;
});

document.addEventListener('clip-ended', function(e) {
    console.log("clip " + e.detail.index + " ended.");
});

document.addEventListener('clip-started', function(e) {
    console.log("clip " + e.detail.index + " started.");
});
document.addEventListener('msg-sent', function(e) {
    updateEventSystem(e);
});
document.addEventListener('msg-received', function(e) {
    updateEventSystem(e);
});

function loadScript(url, callback){

    var script = document.createElement("script")
    script.type = "text/javascript";

    if (script.readyState){  //IE
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {  //Others
        script.onload = function(){
            callback();
        };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}


/* graph system for chat only events */
/*
music transitions:
f40, f85, f102
*/



/* event system for special events */


let eventIds = ["clip-started", "clip-ended", "msg-sent", "msg-received", "vid-ended", "vid-started", "vid-oneshot-ended"];
for ( eventId of eventIds ) {
	document.addEventListener( eventId, updateSpecialEvents );
}
function updateSpecialEvents(e) {
	for( entry of eventConditions ) {
		if ( entry.c(e) ) {
			if(!restoring_state) entry.a(e);
			else if (entry.b != undefined) entry.b();
		}
	}
}

function updateEventSystem(e) {
	if(restoring_state) return;

	msg = e.detail;
    edges = e.detail.e;
    var optnsCleared = false;
    for( entry of edges ) {
    	if (entry.includes("fp")) {
    		i = entry.charAt(2);
    		setMapPosition(i);
    	}
    	else {
	    	switch ( entry.charAt(0) ) {
	    		case 'f':
	    			rmsg(entry);
	    			break;
	    		case 'u':
	    			if(!optnsCleared) {clearOptions(); optnsCleared = true;}
	    			optn(entry);
	    			break;
	    		case 'm':
	    			musicTrack.transition();
	    			break;
	    		case 'c':
	    			setTimeout(credits, 3000);
	    			break;
	    		case 'r':
	    			forscherTrack.transition();
	    			break;
	    	}
    	}
    }
}

function setMapPosition(i) {
	freddyMapIcon.style.marginLeft = getComputedStyle(freddyMapIcon).getPropertyValue('--freddy-map-position-' + i + "-left");
    freddyMapIcon.style.marginTop = getComputedStyle(freddyMapIcon).getPropertyValue('--freddy-map-position-' + i + "-top");
    setCookie("mapPosition", i, 30);
}

/*
c: the condition for function a to happen
b: the function to be executed if we are in restoreing state mode (can be just a simple call to a or something else)
*/

let eventConditions = [
	/* video transitions */
	{
		c: function(e) { return e.type == "msg-received" && e.detail.id == "f16" },
		a: function(e) { 
			setVideoSrc(cam1, "0101");
			setVideoSrc(cam2, "0201");
		}
	},
	{
		c: function(e) { return e.type == "msg-received" && e.detail.id == "f83"},
		a: function(e) {
			for(c of cameras) {
				c.style.display = "block";
			}
			document.getElementById("fog").style.opacity = 0.0;
		},
		b: function(e) { this.a(e); }
	},
	{
		c: function(e) { return e.type == "msg-received" && e.detail.id == "f29" },
		a: function(e) { 
			setVideoSrc(cam1, "0102");
			setTimeout(function() {
				if( ch_current_msg.id == "f29" && typeof(ch_typing) === "undefined") { 
					clearOptions();
					rmsg("f30"); }
			}, 20000.0) }
	},

	{
		c: function(e) { return e.type == "msg-received" && e.detail.id == "f30" },
		a: function(e) { 
			setVideoSrc(cam1, "0103");
			setVideoSrc(cam2, "0202");
			setTimeout(function() {
				if( ch_current_msg.id == "f29") { 
					clearOptions(); 
					rmsg("f30"); 
				}
			}, 20000.0) }
	},

	{
		c: function(e) { return e.type == "vid-oneshot-ended" && e.detail.id == "0102" },
		a: function(e) { 
			setVideoSrc(cam2, "0202");
		}
	},

	{
		c: function(e) { return e.type == "msg-received" && e.detail.id == "f43" },
		a: function(e) { 
			setVideoSrc(cam1, "0104");
			setVideoSrc(cam2, "0203");
		}
	},

	{
		c: function(e) { return e.type == "msg-received" && e.detail.id == "f83" },
		a: function(e) { 
			setVideoSrc(cam3, "0301");
			setVideoSrc(cam4, "0401");
			setVideoSrc(cam5, "0501");
			setVideoSrc(cam6, "0601");
			setVideoSrc(cam7, "0701");
		}
	},

	{
		c: function(e) { return e.type == "msg-received" && e.detail.id == "f89" },
		a: function(e) { 
			setVideoSrc(cam2, "0204");
		}
	},

	{
		c: function(e) { return e.type == "msg-received" && e.detail.id == "f91" },
		a: function(e) { 
			setVideoSrc(cam3, "0302");
		}
	},

	{
		c: function(e) { return e.type == "msg-received" && e.detail.id == "f94" },
		a: function(e) { 
			setVideoSrc(cam4, "0402");
		}
	},

	{
		c: function(e) { return e.type == "msg-sent" && e.detail.id == "u117" },
		a: function(e) { 
			setVideoSrc(cam5, "0502");
		}
	},

	{
		c: function(e) { return e.type == "msg-received" && e.detail.id == "f121" },
		a: function(e) { 
			setVideoSrc(cam5, "0501");
		}
	},

	{
		c: function(e) { return e.type == "msg-sent" && ( e.detail.id == "u90a" || e.detail.id == "u90b" || e.detail.id == "u90c" ) },
		a: function(e) { 
			setVideoSrc(cam3, "0301");
			setVideoSrc(cam4, "0401");
		}
	},

	{
		c: function(e) { return e.type == "msg-sent" && ( e.detail.id == "u135a" || e.detail.id == "u135b" ) },
		a: function(e) { 
			setVideoSrc(cam7, "0702");
		}
	},

	{
		c: function(e) { return e.type == "msg-received" && ( e.detail.id == "f146" ) },
		a: function(e) { 
			setVideoSrc(cam6, "0602");
		}
	},

	{
		c: function(e) { return e.type == "msg-received" && ( e.detail.id == "f166" ) },
		a: function(e) { 
			setVideoSrc(cam6, "0603");
		}
	},

	{
		c: function(e) { return e.type == "msg-received" && ( e.detail.id == "f179" ) },
		a: function(e) { 
			setVideoSrc(cam6, "0604");
		}
	},

	{
		c: function(e) { return e.type == "msg-received" && ( e.detail.id == "f180" ) },
		a: function(e) { 
			setVideoSrc(cam6, "0602");
		}
	},

	{
		c: function(e) { return e.type == "msg-sent" && ( e.detail.id == "u189a" || e.detail.id == "u189b" ) },
		a: function(e) { 
			setVideoSrc(cam6, "0603");
		}
	},

	{
		c: function(e) { return e.type == "msg-received" && ( e.detail.id == "f200a" || e.detail.id == "f203" ) },
		a: function(e) { 
			setVideoSrc(cam6, "0605");
		}
	},

	{
		c: function(e) { return e.type == "msg-received" && ( e.detail.id == "f275a" || e.detail.id == "f275b" ) },
		a: function(e) { 
			setVideoSrc(cam6, "0606");
		}
	},

	{
		c: function(e) { return e.type == "msg-received" && ( e.detail.id == "f288" ) },
		a: function(e) { 
			setVideoSrc(cam7, "0703");
		}
	},

	{
		c: function(e) { return e.type == "msg-received" && ( e.detail.id == "f297" ) },
		a: function(e) { 
			setVideoSrc(cam7, "0702");
		}
	},

	{
		c: function(e) { return e.type == "msg-sent" && ( e.detail.id == "u303a" || e.detail.id == "u303b") },
		a: function(e) { 
			setVideoSrc(cam7, "0703");
		}
	},

	{
		c: function(e) { return e.type == "msg-sent" && ( e.detail.id == "u331a" || e.detail.id == "u331b") },
		a: function(e) { 
			setVideoSrc(cam7, "0804");
		}
	},

	{
		c: function(e) { return e.type == "msg-received" && ( e.detail.id == "f276") },
		a: function(e) { 
			forscherTrack.transition(2);
		}
	},

	{
		c: function(e) { return e.type == "msg-received" && ( e.detail.id == "f332" ) },
		a: function(e) { 
			setVideoSrc(cam7, "0703");
		}
	},

	{
		c: function(e) { return e.type == "msg-received" && ( e.detail.id == "f349" ) },
		a: function(e) { 
			setVideoSrc(cam7, "0704");
		}
	},

	{
		c: function(e) { return e.type == "msg-received" && (  e.detail.id == "f350" ) },
		a: function(e) { 
			setVideoSrc(cam7, "0804");
		}
	},

	{
		c: function(e) { return e.type == "msg-received" && ( e.detail.id == "f362" ) },
		a: function(e) { 
			if(cam7.vid.id == "0704") {
				setVideoSrc(cam7, "0705");
			}
			else {
				setVideoSrc(cam7, "0805");
			}
		}
	},

	{
		c: function(e) { return e.type == "msg-received" && ( e.detail.id == "f367" ) },
		a: function(e) { 
			setVideoSrc(cam7, "0706");
		}
	},
	{
		c: function(e) { return e.type == "msg-received" && ( e.detail.id == "f395" ) },
		a: function(e) { 
			setVideoSrc(cam7, "0701");
		}
	},

	/* dom and style changes */
	{
		c: function(e) { return e.type == "msg-received" && e.detail.id == "f15"},
		a: function(e) { cam1.classList.add("blinking"); },
		b: function(e) { this.a(e); }
	},
	{
		c: function(e) { return e.type == "msg-received" && e.detail.id == "f21"},
		a: function(e) { cam1.classList.add("blinking"); },
		b: function(e) { this.a(e); }
	},
	{
		c: function(e) { return e.type == "vid-ended" && e.detail.id == "0101" && ( ch_current_msg.id == "f16" || ch_current_msg.id == "f17" || ch_current_msg.id == "f20" || ch_current_msg.id == "f21") },
		a: function(e) { 
			cam1.classList.remove("blinking");
		},
		b: function(e) { this.a(e); }
	},
	{
		c: function(e) { return e.type == "msg-sent" && e.detail.id == "u19a"},
		a: function(e) { cam1.classList.remove("blinking"); },
		b: function(e) { this.a(e); }
	},

	/* finished videos causing stuff to happen */
	{
		c: function(e) { return e.type == "vid-ended" && e.detail.id == "0101" && ( ch_current_msg.id == "f16" || ch_current_msg.id == "f17" ) },
		a: function(e) { clearOptions(); rmsg("f18"); }
	},
	{
		c: function(e) { return e.type == "vid-ended" && e.detail.id == "0501" && ( ch_current_msg.id == "f111") },
		a: function(e) { if( ch_current_msg.id === "f111") clearOptions(); optn("u112"); }
	},
	{
		c: function(e) { return e.type == "vid-ended" && e.detail.id == "0502" && ( ch_current_msg.id == "f116" || ch_current_msg.id == "u117" ) },
		a: function(e) { clearOptions(); optn("u118"); }
	},
	{
		c: function(e) { return e.type == "vid-ended" && e.detail.id == "0101" && ( ch_current_msg.id == "f21" || ch_current_msg.id == "u22b" ) },
		a: function(e) { clearOptions(); rmsg("f23"); }
	},
	{
		c: function(e) { return e.type == "vid-oneshot-ended" && e.detail.id == "0102" },
		a: function(e) { 
			if(ch_current_msg.id == "f30" || ch_current_msg.id == "f31") return;
			clearOptions(); rmsg("f30"); 
		}
	},
	{
		c: function(e) { return e.type == "vid-started" && e.detail.id == "0602" && ( ch_current_msg.id == "u151b" ) },
		a: function(e) { 
			setTimeout(function() { if(ch_current_msg.id == "u151b") { clearOptions(); rmsg("f153");} }, 2000);
		}
	},
	{
		c: function(e) { return e.type == "vid-started" && e.detail.id == "0604" && ( ch_current_msg.id == "f179" ) },
		a: function(e) { 
			setTimeout(function() { if(ch_current_msg.id == "f179") {clearOptions(); rmsg("f180");} }, 5000);
		}
	},
	{
		c: function(e) { return e.type == "vid-started" && e.detail.id == "0606" && ( ch_current_msg.id == "f275a" || ch_current_msg.id == "f275b" ) },
		a: function(e) { 
			setTimeout(function() {if( ch_current_msg.id == "f275a" || ch_current_msg.id == "f275b" ) { clearOptions(); rmsg("f276");} }, 5000);
		}
	},
	{
		c: function(e) { return e.type == "vid-started" && ( e.detail.id == "0704" || e.detail.id == "0804" ) && ( ch_current_msg.id == "u331a" || ch_current_msg.id == "u331b" ) },
		a: function(e) { 
			setTimeout(function() {if( ch_current_msg.id == "u331a" || ch_current_msg.id == "u331b" ) { clearOptions(); rmsg("f332");} }, 5000);
		}
	},
	{
		c: function(e) { return e.type == "vid-started" && ( e.detail.id == "0705" || e.detail.id == "0805" ) && ( ch_current_msg.id == "f365a" ) },
		a: function(e) { 
			clearOptions(); rmsg("f367");
		}
	},
	{
		c: function(e) { return e.type == "vid-oneshot-ended" && e.detail.id == "0604" && ( ch_current_msg.id == "f179" ) },
		a: function(e) { clearOptions(); rmsg("f180"); }
	},

	/* stuff to happen automatically after some time */
	{
		c: function(e) { return e.type == "msg-received" && e.detail.id == "f16" },
		a: function(e) { setTimeout(function() {
			if( ch_current_msg.id == "f16") {clearOptions(); rmsg("f17");}
		}, 20000.0) }
	},
	{
		c: function(e) { return e.type == "msg-received" && e.detail.id == "f17" },
		a: function(e) { setTimeout(function() {
			if( ch_current_msg.id == "f17") { clearOptions(); rmsg("f18"); }
		}, 5000.0) }
	},
	{
		c: function(e) { return e.type == "msg-sent" && e.detail.id == "u22b" },
		a: function(e) { setTimeout(function() {
			if( ch_current_msg.id == "u22b") { clearOptions(); rmsg("f23"); cam1.classList.remove("blinking");}
		}, 5000.0) }
	},
	{
		c: function(e) { return e.type == "msg-received" && e.detail.id == "f26" },
		a: function(e) { cam1.classList.remove("blinking"); }
	},
	{
		c: function(e) { return e.type == "msg-received" && e.detail.id == "f121" },
		a: function(e) { setTimeout(function() {
			if( ch_current_msg.id == "f121") {
				clearOptions();
				rmsg("f122");
				setVideoSrc(cam5, "0501");
			}
		}, 5000.0) }
	},
	{
		c: function(e) { return e.type == "msg-sent" && e.detail.id == "u151b" },
		a: function(e) { setTimeout(function() {
			if( ch_current_msg.id == "u151b") { clearOptions(); rmsg("f153"); }
		}, 20000.0) }
	},
	{
		c: function(e) { return e.type == "msg-received" && e.detail.id == "f111" },
		a: function(e) { setTimeout(function() {
			if( ch_current_msg.id === "f111") { clearOptions(); optn("u112"); }
		}, 20000.0); }
	},
	{
		c: function(e) { return e.type == "msg-received" && e.detail.id == "f179" },
		a: function(e) { setTimeout(function() {
			if( ch_current_msg.id == "f179") { clearOptions(); rmsg("f180"); }
		}, 20000.0); }
	},
	{
		c: function(e) { return e.type == "msg-received" && e.detail.id == "f179" },
		a: function(e) { setTimeout(function() {
			if( ch_current_msg.id == "f275a" || ch_current_msg.id == "f275b" ) { clearOptions(); rmsg("f276"); }
		}, 20000.0); }
	},
	{
		c: function(e) { return e.type == "msg-sent" && ( e.detail.id == "u331a" || e.detail.id == "u331b" ) },
		a: function(e) { setTimeout(function() {
			if( ch_current_msg.id == "u331a" || ch_current_msg.id == "u331b" ) { clearOptions(); rmsg("f332"); }
		}, 10000.0); }
	},
	{
		c: function(e) { return e.type == "msg-received" && ( e.detail.id == "f348a" ) },
		a: function(e) { setTimeout(function() {
			if( ch_current_msg.id == "f348a" ) {clearOptions(); rmsg("f350"); }
		}, 5000.0); }
	},
	{
		c: function(e) { return e.type == "msg-sent" && ( e.detail.id == "u351a" || e.detail.id == "u352b" ) },
		a: function(e) { setTimeout(function() {
			if( ch_current_msg.id == "u351a" || ch_current_msg.id == "u352b" ) {clearOptions();rmsg("f368");}
		}, 10000.0); }
	},
	{
		c: function(e) { return e.type == "msg-received" && ( e.detail.id == "f365a" ) },
		a: function(e) { setTimeout(function() {
			if( ch_current_msg.id == "f365a" ) {clearOptions();rmsg("f367");}
		}, 10000.0); }
	},
];


