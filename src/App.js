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

     axios.get("/api/text/text-curie-001", {params:{
       msg:val
       }}).then((res)=>{
       console.log(res)
       appendMsg({
         type: "text",
         content: { text: res.data }
       });
      }).catch(
         (e)=>{
           console.log(e)
         }

     )

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
