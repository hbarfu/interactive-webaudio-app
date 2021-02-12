
var credits = function() {
	if(video != undefined) {
		video.parentNode.removeChild(video);
	}	
	video = document.createElement("video");
	video.style.opacity = 0.0;
	video.id = "vid";
	video.classList.add("video-style");
	video.type = "video/mp4";
	video.src = "video/def/Abspann.m4v";
	video.loop = false;
	video.playsInline = true;
	video.onplay = function() {
		remaining_music = musicTrack.timeUntilTransitionPoint();
		if (47.0 - remaining_music > musicTrack.currentClip.buffer.duration) {
			musicTrack.currentClip.onended = function() {
				musicTrack.transition(18);
				setTimeout(function() {
					document.dispatchEvent(new CustomEvent("credits-ended", {
					}));
				close_video();
			}, (remaining_music + musicTrack.currentClip.duration)*1000 + 2000);
			}
		}
		else {
			musicTrack.transition(18);
			setTimeout(function() {
				document.dispatchEvent(new CustomEvent("credits-ended", {
					}));
				close_video();
			}, 47000);
		}
	}
	/*video.onended = function() {
		document.dispatchEvent(new CustomEvent("credits-ended", {
			}));
		close_video();
	}*/
	video_inner_container.appendChild(video);
	video_window.style.height = "100%";
	overlay = "credits";
	video.play().then(function() {
	    video.controls = false;
	  }).catch(function(error) {
	    video.controls = true;
	  });;

	setTimeout(function() {
		video.style.opacity = 1.0;
	}, 800)
}

var camClick = function(e) {
	if (e.target.vid == undefined) {
		console.error("no video specified");
		return;
	} 


	if(video != undefined) {
		video.parentNode.removeChild(video);
	}
	video = document.createElement("video");
	video.style.opacity = 0.0;
	video.id = "vid";
	video.classList.add("video-style");
	video.type = "video/mp4";
	video.src = e.target.vid.src;
	video.loop = true;
	video.volume = volume;
	video.controls = false;
	video.playsInline = true;
	video.onplay = function() {
		document.dispatchEvent(new CustomEvent("vid-started", {
    		detail: e.target.vid
  		}));
	}
	video.onpause = function() {
		document.dispatchEvent(new CustomEvent("vid-ended", {
    		detail: e.target.vid
  		}));
	}
	video.onplay = function() {
		document.dispatchEvent(new CustomEvent("vid-started", {
    		detail: e.target.vid
  		}));		
	}
	if(e.target.vid.oneshot) {
		video.loop = false;
		video.onended = function() {
			document.dispatchEvent(new CustomEvent("vid-oneshot-ended", {
    			detail: e.target.vid
  			}));
			let v = videos[ videos.indexOf( videos.find(x => x.id == e.target.vid.id) ) + 1 ];
			if (e.target.vid.next != undefined ) v = videos.find(x=> x.id == e.target.vid.next );
 			setVideoSrc(e.target, v.id);
 			video.src = v.src;
			video.loop = true;
			video.play();
		}
	}
	video_inner_container.appendChild(video);
	video_window.style.height = "100%";
	overlay = "video";
	video.play().then(function() {
	  }).catch(function(error) {
	    video.controls = true;
	  });;;

	setTimeout(function() {
		video.style.opacity = 1.0;
		document.getElementById("close-video-window").style.display = "block";
	}, 800)
}

video_window.onclick = function(e) {
	console.log(e.target.id);
	if(e.target.id == "vid" || overlay =="credits") return;

	close_video();
}

document.getElementById("close-video-window").onclick = function(e) {
	console.log(e.target.id);
	if(e.target.id == "vid") return;
	else if (overlay == "video") {
		close_video();
	}
	else if(overlay == "impressum") {
		impressum.style.height = "0";
		document.getElementById("close-video-window").style.display = "none";
	}
}

close_video = function() {
	document.getElementById("close-video-window").style.display = "none";
	video.pause();
	video.style.opacity = 0.0;
	video_window.style.height = "0";
}

fullscreenchange = function(e) {
	console.log("fullscreenchange");
	if(!document.fullscreenElement) {
		close_video();
	}
}

function setVideoSrc(cameraObj, videoID) {
	cameraObj.vid = videos.find(x => x.id === videoID);
	cookie = parseCookie( "cams" );
	cookie[ camerasForCookie.indexOf( cameraObj ) ] = videoID;
	setCookie("cams", encodeCookie ( cookie ), 30 );
}

document.addEventListener("fullscreenchange", fullscreenchange);
document.addEventListener("mozfullscreenchange", fullscreenchange);
document.addEventListener("webkitfullscreenchange", fullscreenchange);
document.addEventListener("msfullscreenchange", fullscreenchange);


let videos = [
	/*here are the finished videos:*/
	{ id: "0101", src: "video/def/0101_fairies.m4v" },
	{ id: "0102", src: "video/def/0102_fairies.m4v", oneshot: true, next:"0103" },
	{ id: "0103", src: "video/def/0103_fairies.m4v" },
	{ id: "0104", src: "video/0104.mp4" },

	{ id: "0201", src: "video/0201.mp4" },
	{ id: "0202", src: "video/def/0202.m4v" },
	{ id: "0203", src: "video/def/0203.m4v" },
	{ id: "0204", src: "video/0204.mp4" },

	{ id: "0301", src: "video/def/0301.m4v" },
	{ id: "0302", src: "video/def/0302.m4v" },

	{ id: "0401", src: "video/def/0401.m4v" },
	{ id: "0402", src: "video/def/0402.m4v" },

	{ id: "0501", src: "video/def/0501.m4v" },
	{ id: "0502", src: "video/def/0502.m4v" },

	{ id: "0601", src: "video/0601.mp4" },
	{ id: "0602", src: "video/def/0602.m4v" },
	{ id: "0603", src: "video/0603.mp4", oneshot: true, next: "0602" },
	{ id: "0604", src: "video/def/0604.m4v", oneshot: true, next: "0601" },
	{ id: "0605", src: "video/0605.mp4" },
	{ id: "0606", src: "video/def/0606.m4v" , oneshot:true, next: "0607" },
	{ id: "0607", src: "video/0607.mp4" },

	{ id: "0701", src: "video/def/0701.m4v" },
	{ id: "0702", src: "video/def/0702_fairies.m4v" },
	{ id: "0703", src: "video/def/0703_fairies.m4v" },
	{ id: "0704", src: "video/def/0704_nobutton_fairies.m4v" },
	{ id: "0705", src: "video/def/0705_nobutton_fairies.m4v" },
	{ id: "0706", src: "video/def/0706.m4v" },

	{ id: "0804", src: "video/def/0704_button_fairies.m4v" },
	{ id: "0805", src: "video/def/0705_button_fairies.m4v" },
];

let cameras = document.getElementsByClassName("camera-icons");
for (item of cameras ) {
	item.vid = undefined;
	item.addEventListener('click', camClick);
}
let cam1 = cameras[1];
let cam2 = cameras[2];
let cam3 = cameras[0];
let cam4 = cameras[6];
let cam5 = cameras[3];
let cam6 = cameras[4];
let cam7 = cameras[5];

var initCams = function() {
	setVideoSrc(cam1, "0101");
	setVideoSrc(cam2, "0201");
}

let camerasForCookie = [cam1, cam2, cam3, cam4, cam5, cam6, cam7];


console.log(cameras);
