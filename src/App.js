import React from "react";
import Chat, { Bubble, useMessages } from "@chatui/core";
import "@chatui/core/dist/index.css";
import axios from 'axios'

export default function App() {
  const { messages, appendMsg, setTyping } = useMessages([]);

  function handleSend(type, val) {
    if (type === "text" && val.trim()) {
      appendMsg({
        type: "text",
        content: { text: val },
        position: "right"
      });
      console.log(type)
      console.log(val)
      setTyping(true);

      let baseurl = "http://192.168.2.200:8080/text/text-curie-001";
     axios.get(baseurl, {msg: '11111'}).then(res=>{
       appendMsg({
         type: "text",
         content: { text: res }
       });
      })

      // setTimeout(() => {
      //   appendMsg({
      //     type: "text",
      //     content: { text: "Bala bala" }
      //   });
      // }, 1000);
    }
  }

  function renderMessageContent(msg) {
    const { content } = msg;
    return <Bubble content={content.text} />;
  }

  return (
    <Chat
      navbar={{ title: "ChatGPT" }}
      messages={messages}
      renderMessageContent={renderMessageContent}
      onSend={handleSend}
    />
  );
}
