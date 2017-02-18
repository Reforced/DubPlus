/**
 * Grabs in Chat
 */

/* global Dubtrack */

var grabs_chat = {};

grabs_chat.id = "dubplus-grab-chat";
grabs_chat.moduleName = "Grabs in Chat";
grabs_chat.description = "Puts a message in the chat when another user grabs your song";
grabs_chat.category = "General";

grabs_chat.grabChatWatcher = function(e){
    var user = Dubtrack.session.get('username');
    var currentDj = Dubtrack.room.users.collection.findWhere({
        userid: Dubtrack.room.player.activeSong.attributes.song.userid
    }).attributes._user.username;


    if(user === currentDj && !Dubtrack.room.model.get('displayUserGrab')){
        $('ul.chat-main').append(
            '<li class="dubplus-chat-system dubplus-chat-system-grab">' +
                '<div class="chatDelete" onclick="dubplus.deleteChatMessageClientSide(this)"><span class="icon-close"></span></div>' +
                '<div class="text">' +
                    '@' + e.user.username + ' has grabbed your song \'' + Dubtrack.room.player.activeSong.attributes.songInfo.name + ' \'' +
                '</div>' +
            '</li>');
    }
};

grabs_chat.go = function() {
  var newOptionState;
  if (!this.optionState) {
    newOptionState = true;
    
    Dubtrack.Events.bind("realtime:room_playlist-queue-update-grabs", this.grabChatWatcher);

  } else {
    newOptionState = false;
    Dubtrack.Events.unbind("realtime:room_playlist-queue-update-grabs", this.grabChatWatcher);
  }

  this.optionState = newOptionState;
  this.toggleAndSave(this.id, newOptionState);
};

module.exports = grabs_chat;