import { useSelector } from "react-redux";
import ChatList from "../ChatList";
import ChatingSection from "../ChatingSection";
import { useState } from "react";

const Chat = () => {

  const {_id,name} = useSelector((state) => state.user.userData);
  const [selectedChat,setSelectedChat] = useState({})
  const [chatList,setChatList] = useState([])
  


  return (
    
    <div className="w-full max-h-screen">
      <div className="grid grid-cols-12">
        <div className="xl:col-span-3 col-span-2">
          <ChatList role={'user'} userData={{_id,name}} selectedChat={selectedChat} chatList={chatList} setChatList={setChatList} setSelectedChat={setSelectedChat}/>
        </div>
        <div className="col-span-10 xl:col-span-9">
          <ChatingSection role={'user'} selectedChat={selectedChat} setSelectedChat={setSelectedChat} chatList={chatList} setChatList={setChatList}/>
        </div>
      </div>
    </div>
  );
};

export default Chat;
