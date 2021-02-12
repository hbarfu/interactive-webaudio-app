var context = undefined;
var master = undefined;
var currentClip = undefined;
var mute = false;
var volume = 1.0;


var Track = function() {
	this.audioQueue = [];
	this.base_path = "";
	this.currentClip = undefined; //AudioBufferSourceNode
	this.playing = false;
	this.tracklist = [];
}

var audio_init = function() {
	var AudioContext = window.AudioContext          // Default
	              || window.webkitAudioContext;  // Safari and old versions of Chrome
	context = new AudioContext(),
	masterGain = context.createGain(),
	master = masterGain;
	master.connect(context.destination);

	notification_sound = context.createMediaElementSource(document.getElementById("audio-chat-notification"));
	notification_sound.connect(master);

	document.dispatchEvent(new CustomEvent("volume-control-change", {
		detail: {gain:  1.0 }
	}));

	if(typeof(is_mobile) !== 'undefined' && ( is_mobile == true || is_mobile == "true" ) ) {
		window.addEventListener('focus', (e) => {
			if(e.target.tagName == "BUTTON") return;
		  	unmuteAudio();
		  	console.log(e);
		}, true);

		window.addEventListener('blur', (e) => {
			if(e.target.tagName == "BUTTON") return;
		  	muteAudio();
		  	console.log(e);
		}, true);
	}
}

Track.prototype.timeUntilTransitionPoint = function() {
	/*elapsed = context.currentTime - currentClip.started;
	if ( currentClip.loopStart != undefined ) elapsed += currentClip.loopStart;
	remaining = currentClip.node.buffer.duration - elapsed;*/
	if( this.currentClip == undefined ) return 0.0;

	t0 = this.currentClip.started;
	t1 = context.currentTime;
	td = t1 - t0;

	d = this.currentClip.buffer.duration;

	tr = ( Math.floor(td / d) + 1 ) * d - td;

	console.log(tr);

	return tr;
}

Track.prototype.preload = function( templates ) {
	var _self = this;
	return new Promise((resolve, reject) => {
		audiorequest( templates ).then(function(finishedBuffers) {
			for (b of finishedBuffers) {
				b.onended = function() { _self.next(_self); };
			}
			resolve(finishedBuffers);
		});
	});
}

Track.prototype.next = function(selfreference) {
	document.dispatchEvent(new CustomEvent("clip-ended", {
    	detail: { index: this.currentClip.index }
  	}));
	this.currentClip = undefined;
	if(selfreference.audioQueue.length > 0) {
		clip = selfreference.audioQueue.splice(0, 1)[0];
		selfreference.play(clip);
	}
}

Track.prototype.play = function(clip) {
	if (this.currentClip != undefined) {
		console.error("track is already plaing a clip!");
		return;
	}
	else {
		this.currentClip = clip;
		clip.connect(master);
		clip.start(context.currentTime, clip.loopStart);
		this.currentClip = clip;
		clip.started = context.currentTime;
		document.dispatchEvent(new CustomEvent("clip-started", {
    		detail: { index: this.currentClip.index }
  		}));
	}
}

Track.prototype.queue = function(finishedBuffers) {

	finishedBuffers.sort((a, b) => a.index - b.index);

	if(this.currentClip == undefined) {
		clip = finishedBuffers.splice(0, 1)[0];
		this.play(clip);
	}

	else {
		this.currentClip.loop = false;
	}

	this.audioQueue = []; //comment this line if you want to enable more than 1 batch of clips in queue. 

	for (clip of finishedBuffers) {
		this.audioQueue.push(clip);
	}

	console.log("updated audioQueue:");
	console.log(this.audioQueue);

}

Track.prototype.transition = function(index) {
	requestedClips = [];
	ptr = 0;
	if (this.audioQueue.length > 0) ptr = this.audioQueue[this.audioQueue.length - 1].index + 1;
	else if(this.currentClip != undefined) ptr = this.currentClip.index + 1;
	if (index != undefined ) ptr = index;

	if(this.autostop == undefined) {
		//we pre-load all tracks that are no loops plus the first one which is a loop. 
		while( ptr < this.tracklist.length && !this.tracklist[ptr].loop ) {
			requestedClips.push( this.tracklist[ptr] );
			ptr++;
		}
		//push one loopable to queue
		if( ptr < this.tracklist.length ) requestedClips.push( this.tracklist[ptr] );
	}

	else {
		if( ptr < this.tracklist.length ) requestedClips.push( this.tracklist[ptr] );
	}


	if(requestedClips.length == 0) {
		console.error("no more track objects found.");
		return;
	}

	console.log("requesting new clips:");
	for(c of requestedClips) {
		console.log(c.file);
	}

	//write the loopable music file to cookies
	if( this == musicTrack ) setCookie("music", requestedClips[requestedClips.length-1].index, 30);

	let _self = this;
	this.preload(requestedClips).then(function(finishedBuffers) {
		_self.queue(finishedBuffers);
	});
}

var muteAudio = function() {
	master.gain.linearRampToValueAtTime(0, context.currentTime);
	mute = true;
}

var unmuteAudio = function() {
	master.gain.linearRampToValueAtTime(volume, context.currentTime);
	mute = false;
}

/*Track.transition = function(clipTemplate) {
	var request = audiorequest( [clipTemplate] ).then(function(clip) {
		clip.connect(master);
		
		elapsed = context.currentTime - currentClip.started + currentClip.loopStart;
		remaining = currentClip.node.buffer.duration - elapsed;
		console.log(remaining);
		currentClip.node.stop(context.currentTime + remaining);
		track.node.start(context.currentTime + remaining);
		console.log("transition ended");
	});
}*/



tracklist_music = [
	{
		index: 0,
		file: "audio/music/1.mp3",
		loop:true
	},
	{
		index: 1,
		file: "audio/music/2a.mp3",
		started: undefined,
		loop: false
	},
	{
		index: 2,
		file: "audio/music/2b.mp3",
		loop:true
	},
	{
		index: 3,
		file: "audio/music/3a.mp3",
		started: undefined,
		loop: false
	},
	{
		index: 4,
		file: "audio/music/3b.mp3",
		loop:true
	},
	{
		index: 5,
		file: "audio/music/4a.mp3",
		started: undefined,
		loop: false
	},
	{
		index: 6,
		file: "audio/music/4b.mp3",
		loop:true
	},
	{
		index: 7,
		file: "audio/music/5a.mp3",
		started: undefined,
		loop: false
	},
	{
		index: 8,
		file: "audio/music/5b.mp3",
		loop:true
	},
	{
		index: 9,
		file: "audio/music/6a.mp3",
		started: undefined,
		loop: false
	},
	{
		index: 10,
		file: "audio/music/6b.mp3",
		loop:true
	},
	{
		index: 11,
		file: "audio/music/8a.mp3",
		started: undefined,
		loop: false
	},
	{
		index: 12,
		file: "audio/music/8b.mp3",
		loop:true
	},
	{
		index: 13,
		file: "audio/music/9a.mp3",
		started: undefined,
		loop: false
	},
	{
		index: 14,
		file: "audio/music/9b.mp3",
		loop:true
	},
	{
		index: 15,
		file: "audio/music/11a.mp3",
		started: undefined,
		loop: false
	},
	{
		index: 16,
		file: "audio/music/11b.mp3",
		loop:true
	},
	{
		index: 17,
		file: "audio/music/12a.mp3",
		started: undefined,
		loop: true
	},
	{
		index: 18,
		file: "audio/music/12b.mp3",
		loop:false
	},
];

tracklist_ambi = [
	{
		index: 0,
		file: "audio/ambis/testambi_gapless.mp3",
		loop:true
	},
];

tracklist_forscher = [
	{
		index:0,
		file: "audio/ambis/forscher_wald.mp3",
		loop:true
	},
	{
		index: 1,
		file: "audio/ambis/forscher_huette.mp3",
		loop:false
	},
	{
		index:2,
		file:"audio/ambis/forscher_labor.mp3",
		loop:true
	},
	{
		index: 3,
		file: "audio/ambis/forscher_runaway.mp3",
		loop:false
	},
];


var musicTrack = new Track();
musicTrack.tracklist = tracklist_music;

var ambiTrack = new Track();
ambiTrack.tracklist = tracklist_ambi;

var forscherTrack = new Track();
forscherTrack.tracklist = tracklist_forscher;
forscherTrack.autostop = true;


function audioloop() {
	window.requestAnimationFrame(audioloop);
}
