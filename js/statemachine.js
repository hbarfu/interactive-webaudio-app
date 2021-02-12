/*
The state is changed by USER INTERACTION only through choosing stuff in the chat.

Dependent of the current state of the chat, the following states also change:
	-the state of the chat itself: load new messages, let freddy type etc.
	-the state of the music: exit loop, play til the end, play new track. What happens if the user is so fast that track 1 isn't finished yet and we should already play track 3?
	-the state of the videos: this state only becomes relevant when the user clicks a camera. so it should be calculated when the user clicks a camera and not before.
	-the state of the freddy-icon on the map: the icon only changes its position on the map, it does not have any functionality or interactivity.

Unclear: is the chat also dependent on the music/video? 



Maybe we should have well-defined states and then for each state define what must be true for that state to happen.
example: some stay may require a certain chat answer, all videos played once and also the music played once.
but some other state may only require a specific chat answer and not care about music and video.

But then we need to think about:
-what to do when NO states matches the current substates. -> then we just don't transition and stay in the current state until the substates match another state.
-what to do when MULTIPLE states match the current substates. -> this simply can not be allowed.


*/
var updateState = function(newState) {

}