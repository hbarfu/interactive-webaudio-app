/* Load Bar Handling------------------------------------------------------------- */

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


/**
 * Returns a promise that contains the requested BufferWithGains
 * or null if the request was rejected.
 * @param {string[]} urls The urls of the requested audio files.
 * @callback onSuccess Callback that handles response if successful.
 * @callback onReject Callback that handles response if rejected.
 */


function audiorequest(tracks) {
	var finishedBuffers = 0;
	return new Promise((resolve, reject) => {
		var finishedBuffers = [];
		for(var i = 0; i < tracks.length; i++) {
			_audiosinglerequest(tracks[i]).then(function() {
				finishedBuffers++;
				if(finishedBuffers == tracks.length) {
					resolve();
				}
			});
		}
  })
}

function _audiosinglerequest(track) {
	return new Promise((resolve, reject) => {
		if(track.buffer != undefined) {
			decode();
		}
		else {
			_audiofetch(track).then(function(result) {
				decode();
			});
		}
		function decode() {
			_audiodecode(track).then(function(result) {
				resolve(result);
			});
		}
	});
}

function _audiofetch(track) {
	return new Promise((resolve, reject) => {
		global_download_queue_N.n ++;
    	global_download_queue_N.nmax ++;
		var myRequest = new Request(tracks_base_path + track.file);
      	fetch(myRequest).then(function(response) {
        return response.arrayBuffer();
      		}).then(function(buffer) {
      			global_download_queue_N.n --;
        		track.buffer = buffer;
        		resolve();
      		});
	});
}

/**
 * Returns a BufferWithGain object.
 * @param {string} url The url of the requested audio file
 */
function _audiodecode(track) {
	return new Promise((resolve, reject) =>{
		//have to use traditional callback here instead of promise, bc Safari doesn't know the decodeAudio promise...
		context.decodeAudioData(track.buffer, 
			(buffer) => { 
	          	var bufferSource = context.createBufferSource();
		        bufferSource.buffer = buffer;
		        track.node = bufferSource;
		        resolve();
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
function _audiodecodesimple(track) {
	return new Promise((resolve, reject) =>{
		//have to use traditional callback here instead of promise, bc Safari doesn't know the decodeAudio promise...
		context.decodeAudioData(track.buffer, (buffer) => { 
	        resolve(buffer);
 		}, (e) => { reject(e); });
	});
}