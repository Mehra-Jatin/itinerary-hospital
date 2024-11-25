import { useState } from "react";
import { MoveLeft, PawPrint } from "lucide-react";
import chatData from "@/data/ChatData";

const ChatBox = ({ friendsList }) => {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [friendChats, setFriendChats] = useState(chatData);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() === "" || !selectedFriend) return;

    setFriendChats((prevChats) => ({
      ...prevChats,
      [selectedFriend.id]: [
        ...(prevChats[selectedFriend.id] || []),
        { id: Date.now(), sender: "user", message: newMessage, timestamp: "Now" },
      ],
    }));
    setNewMessage("");
  };

  return (
    <div className="h-screen flex flex-col md:flex-row mt-6 mx-auto bg-gray-900 text-white">
      {/* Friends List */}
      <div
        className={`h-screen ${
          selectedFriend ? "hidden md:flex" : "flex"
        } md:w-1/3 flex-col bg-gray-800 overflow-y-auto border-r border-gray-700 overflow-x-hidden`}
      >
        <div className="flex items-center flex-col gap-2 py-4 px-6 bg-gray-800 shadow-white border-b border-gray-700" >
          {/* <h1 className="font-semibold text-xl text-blue-400">Chats</h1> */}
          <input
            type="text"
            placeholder="Search Patients..."
            className="w-full rounded-lg px-4 py-2 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <ul className="space-y-2">
          {friendsList.map((friend) => (
            <li
              key={friend.id}
              className={`flex items-center p-4 cursor-pointer transition-all duration-300 ease-in-out ${
                selectedFriend?.id === friend.id
                  ? "bg-blue-700 shadow-lg scale-105"
                  : "hover:bg-gray-700"
              }`}
              onClick={() => setSelectedFriend(friend)}
            >
              <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                <img
                  src={friend.image}
                  alt={friend.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-medium">{friend.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Room */}
      <div
        className={`${
          selectedFriend ? "flex" : "hidden md:flex"
        } flex-1 flex-col h-full bg-gray-900`}
        style={{
          backgroundImage: selectedFriend
            ? "url('https://images.unsplash.com/photo-1504595403659-9088ce801e29?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
            : "url('https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {selectedFriend ? (
          <>
            {/* Header */}
            <div className="bg-gray-800 py-4 px-6 flex items-center justify-between">
              <div className="flex items-center">
                <button
                  className="md:hidden text-white mr-4"
                  onClick={() => setSelectedFriend(null)}
                >
                  <MoveLeft className="hover:bg-gray-600 rounded-full p-2 transition duration-300 w-10 h-12" />
                </button>
                <div className="w-10 h-10 rounded-full overflow-hidden mr-4">
                  <img
                    src={selectedFriend?.image}
                    alt={selectedFriend?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-medium">{`Chat with ${selectedFriend?.name}`}</span>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900">
              {friendChats[selectedFriend.id]?.map((chat) => (
                <div
                  key={chat.id}
                  className={`flex flex-col ${
                    chat.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`${
                      chat.sender === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-700 text-gray-100"
                    } rounded-lg p-3 max-w-[75%]`}
                  >
                    <p>{chat.message}</p>
                  </div>
                  <span className="text-sm text-gray-400 mt-1">{chat.timestamp}</span>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="bg-gray-800 py-4 flex items-center px-4">
              <textarea
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 px-4 py-3 bg-gray-900 text-white rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Type your message..."
              />
              <button
                onClick={handleSendMessage}
                className="ml-4 text-white rounded-lg px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 shadow-lg transition-transform duration-300 transform hover:scale-110"
              >
                <PawPrint className="w-8 h-12" />
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-2xl font-semibold text-gray-100">
              Select a friend to start chatting!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBox;
