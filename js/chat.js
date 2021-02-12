/*chat mechanics*/

/* debug vars */
chat_humanize = true;

/*defs*/
let root = document.documentElement;
ch_typing = undefined; //this can be used as a flag to check if freddy is typing. if he is, it holds a reference to the typing dom element.
ch_msgspace = document.getElementById("chatmessagespace");;
ch_header = document.getElementById("chatheader");
ch_footer = document.getElementById("chatfooter");
ch_oldest_unread = undefined; //this can be used as a flag to check if any msgs are unread. if so, hold a reference to the oldest unread msg.
ch_alarm = document.getElementById("chat-newmsg");
ch_footer_content = document.getElementById("chatfooter-content");
ch_sidebar = document.getElementById("chatsidebar");
ch_collapse_vertical = document.getElementById("collapse-vertical");
chatresize_v = document.getElementById("collapse-vertical");

ui_promptContainer = document.getElementById("prompt-container");
ui_prompt = undefined;

ch_unread_msgs = [];;

ch_current_msg = undefined;

classes = {
	prompt: "",
	promptheader: "ui-header pad chatmessage message-other welcome-back fix-header",
	promptcontent: "pad",
	promptbutton: ""
}

/*functions*/

var isMsgVisible = function(id) {

}

var scrollToMsg = function(id) {

}

/*call when chat is open AND last message is visible AND there are unread messages.*/
var markAsRead = function() {
	for(msg of ch_unread_msgs) {
		msg.classList.remove("unread");
	}
	ch_unread_msgs = [];
	ch_alarm.style.display = "none";
}

/* call when there are new unseen messages. */
var markAsUnread = function(msg) {
	ch_alarm.style.display = "block";
	ch_unread_msgs.push(msg);
	ch_alarm.innerHTML = ch_unread_msgs.length;
}

/* get a message from freddy */
var receiveMsg = function(msgObject) {
	predelay = 0.5 + Math.random() * 1;
	if(!chat_humanize || restoring_state ) predelay = 0;
	else if (ch_current_msg != undefined && ch_current_msg.id.includes("u")) {predelay =  0;}
	setTimeout(function() {
		startTyping();
		delay = msgObject.typing;
		if (delay == undefined) delay = 1.0 + Math.random() * 4;
		if(!chat_humanize || restoring_state ) delay = 0;
		else if (ch_current_msg != undefined && ch_current_msg.id.includes("u")) {delay =  1.0;}
		setTimeout(function() {
			stopTyping();
			msg = document.createElement("div");
			msg.className = "chatmessage message-other unread";
			msg.innerHTML = msgObject.text;
			if (msgObject.text == "") msg.innerHTML = msgObject.id;
			msgspace.appendChild(msg);

			document.getElementById("audio-chat-notification").play();

			if(!chatopened) {
				markAsUnread(msg);
			}
			else {
				msg.classList.remove("unread");
			}

			ch_current_msg = msgObject;

			msgspace.scrollTop = msgspace.scrollHeight;

			document.dispatchEvent(new CustomEvent("msg-received", {
		    	detail: msgObject
		  	}));

			if(!msgObject.critical) appendToCookie( "msgs", msgObject.id );

		}, delay * 1000);
	}, predelay * 1000);
}

/* send a message to Freddy. This functions is preferably called from the event handler of the buttons */
var sendMsg = function(msgObject) {
	msg = document.createElement("div");
	msg.className = "chatmessage message-self";
	msg.innerHTML = msgObject.text;
	if (msgObject.text == "") msg.innerHTML = msgObject.id;
	msgspace.appendChild(msg);

	if(ch_typing != undefined) {
		stopTyping();
		startTyping();
	}

	clearOptions();

	ch_current_msg = msgObject;

	msgspace.scrollTop = msgspace.scrollHeight;

	document.dispatchEvent(new CustomEvent("msg-sent", {
    	detail: msgObject
  	}));

  	if(!msgObject.critical) appendToCookie( "msgs", msgObject.id );
}

var clearOptions = function() {
	ch_footer_content.textContent = '';
	//resize message space...
	resizeMessageSpace();
}

var addOption = function(msgObject) {
	if(restoring_state) return;
	button = document.createElement("button");
	button.innerHTML = msgObject.text;
	if (msgObject.text == "") button.innerHTML = msgObject.id;
	button.onclick = function() {sendMsg(msgObject);};
	ch_footer_content.appendChild(button);

	//resize message space...
	resizeMessageSpace();

	msgspace.scrollTop = msgspace.scrollHeight;
}

var resizeMessageSpace = function() {
	var fh = window.getComputedStyle(ch_footer).height;
	fh = fh.substring(0, fh.length-2);
	var hh = window.getComputedStyle(ch_header).height;
	hh = hh.substring(0, hh.length-2);
	let h = window.innerHeight - fh - hh;
	ch_msgspace.style.height = h + "px";
}

/* Freddy starts typing, three dots appear... */
var startTyping = function() {
	if(restoring_state) return;
	if(ch_typing != undefined) {
		console.error("invalid call to startTyping: Freddy is already typing");
		return;
	}
	box = document.createElement("div");
	box.className = "chatmessage message-other message-other-light";
	box.innerHTML = "<p class=\"message-typing\">...</p>";
	ch_msgspace.appendChild(box);
	ch_typing = box;

	msgspace.scrollTop = msgspace.scrollHeight;
}

/* Freddy stops typing, three dots disapeear */
var stopTyping = function() {
	if(restoring_state) return;
	if(ch_typing == undefined) {
		console.error("invalid call to stopTyping: ch_typing is undefined.");
		return;
	}
	ch_typing.parentNode.removeChild(ch_typing);
	ch_typing = undefined;
}

var handleChatAnswerButton = function(id) {

}

/* receive new answer options for the current state */
var receiveAnswerOptions = function() {

}

var showPrompt = function(title, text, buttons, functions) {
	closePrompt();	

	prompt = document.createElement("div");
	prompt.className = classes.prompt;
	prompt.id = "prompt";

	if(title) {
		header = document.createElement("div");
		header.className = classes.promptheader;
		header.innerHTML = title;
		prompt.appendChild(header);
	}

	if(text) {
		content = document.createElement("p");
		content.className = classes.promptcontent;
		content.innerHTML = text;
		prompt.appendChild(content);
	}

	if(buttons) {
		for(var i = 0; i < buttons.length; i++) {
			button = document.createElement("button");
			button.className = classes.promptbutton;
			button.innerHTML = buttons[i];
			if(functions && functions[i]) {
				button.onclick = functions[i];
			}
			prompt.appendChild(button);
		}
	}

	ui_promptContainer.appendChild(prompt);

	ui_prompt = prompt;

	ui_promptContainer.style.display = "";
}

var closePrompt = function() {
	if (ui_prompt != undefined) {
		ui_prompt.parentNode.removeChild(ui_prompt);
		ui_prompt = undefined;
	}
	ui_promptContainer.style.display = "none";
}

var chat_open = function() {
	chatwindow.classList.remove("chat-closed");
	//chatwindow.style.transform = "translateY(" + 0 + "px)";
	chatresize.style.transform = "rotateX(180deg)";
	chatresize_v.style.transform = "rotateZ(90deg)";
	chatopened = OPEN;
	markAsRead();
}

var chat_close = function() {
	if (window.getComputedStyle(ch_sidebar).display == "none") {
		h = window.getComputedStyle(chatheader).height;
		h = h.substring(0, h.length-2);
		ht = window.getComputedStyle(chatwindow).height;
		ht = ht.substring(0, ht.length-2);
		hdef = ht-h;
		root.style.setProperty('--c-closed-offset', hdef + "px");
		//chatwindow.style.transform = "translateY(" + hdef + "px)";
		chatwindow.classList.add("chat-closed");
		chatresize.style.transform = "rotateX(0deg)";
		chatresize_v.style.transform = "rotateZ(-90deg)";
		chatopened = CLOSED;
	}
	else {
		w = window.getComputedStyle(chatwindow).width;
		w = w.substring(0, w.length-2);
		root.style.setProperty('--c-closed-offset', w + "px");
		//chatwindow.style.transform = "translateY(" + hdef + "px)";
		chatwindow.classList.add("chat-closed");
		chatresize.style.transform = "rotateX(0deg)";
		chatresize_v.style.transform = "rotateZ(-90deg)";
		chatopened = CLOSED;		
	}

}

window.onresize = function() {
	h_header = window.getComputedStyle(chatheader).height;
	h_header = h_header.substring(0, h_header.length-2);
	h_total = window.getComputedStyle(chatwindow).height;
	h_total = h_total.substring(0, h_total.length-2);
	h_footer = window.getComputedStyle(chatfooter).height;
	h_footer = h_footer.substring(0, h_footer.length-2);
	h_msgspace = h_total - h_header - h_footer;
	ch_msgspace.style.maxHeight = h_msgspace + "px";

	resizeMessageSpace();

	if(chatopened) chat_open();
	else chat_close();
}

var touchstart_header = undefined;
ch_header.addEventListener('touchstart', function(e) {
	touchstart_header = e.touches[0].clientY;
});

var lasttouch_sea = undefined;
var offset_sea = {x:0, y:0};

document.getElementById("sea").addEventListener('touchstart', function(e) {
	lasttouch_sea = {};
	lasttouch_sea.y = e.touches[0].clientY;
	lasttouch_sea.x = e.touches[0].clientX;
});

document.getElementById("sea").addEventListener('touchend', function(e) {
	lasttouch_sea = undefined;
});

document.getElementById("sea").addEventListener('touchmove', function(e){ 
	e.preventDefault(); 
	console.log("touchmvoe on sea");
	//uncomment to enable the user to move the island
	if( window.orientation == 90 || window.orientation == -90) {
			if(lasttouch_sea != undefined) {
				offset_sea.x += ( e.touches[0].clientX - lasttouch_sea.x);
				offset_sea.y += ( e.touches[0].clientY - lasttouch_sea.y);
				lasttouch_sea.x = e.touches[0].clientX;
				lasttouch_sea.y = e.touches[0].clientY;
				for (el of document.getElementsByClassName("islandsize") ) {
					el.style.transform = "translate(" + offset_sea.x + "px, " + offset_sea.y + "px)";
				}
			}
	}
}, {passive: false});
document.getElementById("chatheader").addEventListener('touchmove', function(e){ e.preventDefault(); }, {passive: false});
document.getElementById("chatfooter").addEventListener('touchmove', function(e){ e.preventDefault(); }, {passive: false});


window.addEventListener('touchend', function(e) {
	touchstart_header = undefined;
})

ch_header.addEventListener('touchmove', function(e) {
	if(chatopened == CLOSED && touchstart_header != undefined) {
		if (e.touches[0].clientY + 50 < touchstart_header) {
			touchstart_header = undefined;
			chat_open();
		}
	}
	else if(chatopened == OPEN && touchstart_header != undefined) {
		if (e.touches[0].clientY - 50 > touchstart_header) {
			touchstart_header = undefined;
			chat_close();
		}
	}
});

window.addEventListener("load", window.onresize);


		//TODO: auto-resize chat on window.resize!! otherwise it can disappear.
		chatheader.onclick = function() {
			if(chatopened) {
				chat_close();
			}
			else {
				chat_open();
			}
		}

				//TODO: auto-resize chat on window.resize!! otherwise it can disappear.
		ch_sidebar.onclick = function() {
			if(chatopened) {
				chat_close();
			}
			else {
				chat_open();
			}
		}


/* shorthand functions for event handler system */

function rmsg(id) {
	receiveMsg(msgs.find(x => x.id === id));
}

function optn(id) {
	addOption(msgs.find(x => x.id == id));
}





