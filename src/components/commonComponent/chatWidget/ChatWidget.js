import React, { useEffect } from "react";
import { Widget, addResponseMessage } from "react-chat-widget";
import { locationOval } from "../../../assets/images/index";
import 'react-chat-widget/lib/styles.css';

function ChatWidget() {
  useEffect(() => {
    addResponseMessage("Welcome to this awesome chat!");
  }, []);

  const handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message throught the backend API
  };
  return (
    <div className="chat-widget">
      <Widget
        title="My new awesome title"
        subtitle="And my cool subtitle"
        profileAvatar={locationOval}
        handleNewUserMessage={handleNewUserMessage}
      />
    </div>
  );
}

export default ChatWidget;
