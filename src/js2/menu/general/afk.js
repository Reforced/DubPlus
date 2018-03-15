'use strict';
import {h, Component} from 'preact';
import {MenuSwitch, MenuPencil} from '../../components/menuItems.js';

/**
 * Away From Keyboard autoresponder
 * 
 * TODO: setup global state manager
 */
export default class AFK extends Component {
  constructor(props){
    super(props);
    this.state = {
      canSend : true
    }

    this.afk_chat_respond = this.afk_chat_respond.bind(this);
  }
  
  afk_chat_respond(e) {
    if (!this.state.canSend) {
      return; // do nothing until it's back to true
    }
    var content = e.message;
    var user = Dubtrack.session.get('username');
    
    if (content.indexOf('@'+user) > -1 && Dubtrack.session.id !== e.user.userInfo.userid) {
      var chatInput = document.querySelector('#chat-txt-message');
      if (settings.custom.customAfkMessage) {
        chatInput.value = '[AFK] '+ settings.custom.customAfkMessage;
      } else {
        chatInput.value = "[AFK] I'm not here right now.";
      }
      
      Dubtrack.room.chat.sendMessage();

      // so we don't spam chat, we pause the auto respond for 30sec
      this.setState({canSend:false});

      // allow AFK responses after 30sec
      setTimeout(()=> {
        this.setState({canSend:true});
      }, 30000);

    }
  }
  
  turnOn(){
    Dubtrack.Events.bind("realtime:chat-message", this.afk_chat_respond);
  }
  
  turnOff() {
    Dubtrack.Events.unbind("realtime:chat-message", this.afk_chat_respond);
  }

  saveAFKmessage () {
    var customAfkMessage = $('.dp-modal textarea').val();
    if (customAfkMessage !== '') {
      // TODO: save to global state
      options.saveOption('custom', 'customAfkMessage', customAfkMessage);
    }
  };

  render(props,state){
    return (
      <MenuSwitch
        id="dubplus-afk"
        menuTitle="AFK Auto-respond"
        desc="Toggle Away from Keyboard and customize AFK message."
        turnOn={this.turnOn}
        turnOff={this.turnOff}>
        <MenuPencil />
      </MenuSwitch>
    )
  }
}