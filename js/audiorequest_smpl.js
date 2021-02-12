/**
 * Returns a promise that contains the requested BufferWithGains
 * or null if the request was rejected.
 * @param {string[]} templates The templates of the requested audio files.
 * @callback onSuccess Callback that handles response if successful.
 * @callback onReject Callback that handles response if rejected.
 */
var audioRawBuffers = {};

var gdqN_handler = {
    set: function(obj, prop, value) {
        if (obj[prop] == value) {
            return false;
        }
        obj[prop] = value;
        if (obj.n == 0) {
            obj.nmax = 0;
            var e = new Event('loading-complete');
            document.dispatchEvent(e);
        }
        else {
            var total = (obj.nmax - obj.n) / obj.nmax;
            var e = new CustomEvent('loading-progress', { detail: total });
            document.dispatchEvent(e);
        }
        return true;
    }
};
var global_download_queue_N = new Proxy({}, gdqN_handler);
global_download_queue_N.n = 0;
global_download_queue_N.nmax = 0;

function audiorequest(templates) {
	return new Promise((resolve, reject) => {
		var finishedBuffers = [];
		for(var i = 0; i < templates.length; i++) {
			let t = templates[i];
			_audiosinglerequest(t.file).then(function(result) {
				result.loop = t.loop;
				result.loopStart = t.loopStart || 0;
				result.loopEnd = t.loopEnd || result.buffer.duration;
				result.index = t.index;
				finishedBuffers.push(result);
				if(finishedBuffers.length == templates.length) {
					resolve(finishedBuffers);
				}
			});
		}
  })
}

function _audiosinglerequest(url) {
	return new Promise((resolve, reject) => {
		if(audioRawBuffers[url] != undefined) {
			decode();
		}
		else {
			_audiofetch(url).then(function(result) {
				decode();
			});
		}
		function decode() {
			_audiodecode(url).then(function(result) {
				resolve(result);
			});
		}
	});
}

function _audiofetch(url) {
	return new Promise((resolve, reject) => {
		global_download_queue_N.n ++;
    	global_download_queue_N.nmax ++;
		var myRequest = new Request(url);
      	fetch(myRequest).then(function(response) {
        return response.arrayBuffer();
      		}).then(function(buffer) {
      			global_download_queue_N.n --;
        		audioRawBuffers[url] = buffer;
        		resolve();
      		});
	});
}

/**
 * Returns a BufferWithGain object.
 * @param {string} url The url of the requested audio file
 */
function _audiodecode(url) {
	return new Promise((resolve, reject) =>{
		//have to use traditional callback here instead of promise, bc Safari doesn't know the decodeAudio promise...
		context.decodeAudioData(audioRawBuffers[url].slice(0), 
			(buffer) => { 
	          	var bufferSource = context.createBufferSource();
		        bufferSource.buffer = buffer;
		        resolve(bufferSource);
	 		},
	 		(e) => {
	 			reject(e); 
	 		}
	 	);
	});
}

/**
 * Returns a an audio buffer.
 * @param {string} url The url of the requested audio file
 */
function _audiodecodesimple(url) {
	return new Promise((resolve, reject) =>{
		//have to use traditional callback here instead of promise, bc Safari doesn't know the decodeAudio promise...
		context.decodeAudioData(audioRawBuffers[url].slice(0), (buffer) => { 
	        resolve(buffer);
 		}, (e) => { reject(e); });
	});
}