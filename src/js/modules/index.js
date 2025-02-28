// put this in order of appearance in the menu
module.exports = [
  // General 
  require('./autovote.js'),
  require('./afk.js'),
  require('./emotes.js'),
  require('./autocomplete.js'),
  require('./customMentions.js'),
  require('./chatCleaner.js'),
  require('./chatNotifications.js'),
  require('./pmNotifications.js'),
  require('./joinNotification.js'),
  require('./djNotification.js'),
  require('./showDubsOnHover.js'),
  require('./downDubInChat.js'), // (mod only)
  require('./upDubInChat.js'),
  require('./grabsInChat.js'),
  require('./snow.js'),
  require('./rain.js'),
  
  // User Interface
  require('./fullscreen.js'),
  require('./splitchat.js'),
  require('./hideChat.js'),
  require('./hideVideo.js'),
  require('./hideAvatars.js'),
  require('./hideBackground.js'),
  require('./showTimestamps.js'),
  
  // Settings
  require('./spacebarMute.js'),
  require('./warnOnNavigation.js'),

  // Customize
  require('./communityTheme.js'),
  require('./customCSS.js'),
  require('./customBackground.js'),
  require('./customNotificationSound.js')
];
