/* global Dubtrack */
import {notifyCheckPermission, showNotification} from '../utils/notify.js';

var myModule = {};
myModule.id = "dubplus_join_notifications";
myModule.moduleName = "Notification on user join";
myModule.description = "Enable desktop notifications when a new user joins the room";
myModule.category = "General";

myModule.userJoinNotify = function(e){
  showNotification({
    title : `${e.user.username} joined the room`, 
    ignoreActiveTab: true
  });
};

myModule.turnOn = function(){

  notifyCheckPermission((granted)=>{
    if (granted === true) {
      Dubtrack.Events.bind("realtime:user-join", this.userJoinNotify);
    } else {
      // turn back off until it's granted
      this.toggleAndSave(this.id, false);
    }
  });

};

myModule.turnOff = function() {
  Dubtrack.Events.unbind("realtime:user-join", this.userJoinNotify );
};

module.exports = myModule;
