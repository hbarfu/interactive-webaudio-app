


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
	video.play();

	setTimeout(function() {
		video.style.opacity = 1.0;
	}, 800)
}

video_window.onclick = function(e) {
	console.log(e.target.id);
	if(e.target.id == "vid") return;

	close_video();
}

close_video = function() {
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
	{ id: "0101", src: "video/b2/_allvids.m4v" },
	{ id: "0102", src: "video/b2/0102.mp4", oneshot: true },
	{ id: "0103", src: "video/b2/0103.m4v" },
	{ id: "0104", src: "video/0104.mp4" },

	{ id: "0201", src: "video/freddyvoice.m4v" },
	{ id: "0202", src: "video/0202.mp4" },
	{ id: "0203", src: "video/0203.mp4" },
	{ id: "0204", src: "video/0204.mp4" },

	{ id: "0301", src: "video/0301.mp4" },
	{ id: "0302", src: "video/b2/0302.m4v" },

	{ id: "0401", src: "video/0401.mp4" },
	{ id: "0402", src: "video/b2/0402.m4v" },

	{ id: "0501", src: "video/b2/0501.m4v" },
	{ id: "0502", src: "video/0502.mp4" },

	{ id: "0601", src: "video/0601.mp4" },
	{ id: "0602", src: "video/0602.mp4" },
	{ id: "0603", src: "video/0603.mp4", oneshot: true, next: "0602" },
	{ id: "0604", src: "video/b2/0604.m4v", oneshot: true, next: "0601" },
	{ id: "0605", src: "video/0605.mp4" },
	{ id: "0606", src: "video/0606.mp4" , oneshot:true, next: "0607" },
	{ id: "0607", src: "video/0607.mp4" },

	{ id: "0701", src: "video/0701.mp4" },
	{ id: "0702", src: "video/0702.mp4" },
	{ id: "0703", src: "video/0703.mp4" },
	{ id: "0704", src: "video/b2/0704.m4v" },
	{ id: "0705", src: "video/0705.mp4" },
	{ id: "0706", src: "video/0706.mp4" },
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
