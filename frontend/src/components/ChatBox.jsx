import { useState } from "react";
import { MoveLeft, PawPrint } from "lucide-react";
import chatData from "@/data/ChatData"

const friendsList = [
  { id: 1, name: "Khalid", image: "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
  { id: 2, name: "Aisha", image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
  { id: 3, name: "Omar", image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
];
console.log(chatData);

const ChatBox = () => {
  const [selectedFriend, setSelectedFriend] = useState(null); // Store the selected friend
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
    <div className="h-screen flex flex-col md:flex-row mt-6 mx-auto ">
      {/* Friends List */}
      <div
        className={`h-screen ${
          selectedFriend ? "hidden md:flex" : "flex"
        } md:w-1/3 flex-col bg-gray-800 text-white overflow-y-auto`}
      >
        <div className="flex items-center flex-col gap-1 p-1 justify-between flex-wrap">
          <div className="flex items-center">
            <p className="font-medium text-lg">Chats </p>
          </div>
          {/* Search Bar */}
          <div className="flex-1 ml-2 w-auto">
            <input
              type="text"
              placeholder="Search Patients..."
              className="w-full rounded-lg px-3 py-1 focus:outline-slate-400 focus:ring-1 shadow-slate-400 shadow focus:shadow-lg focus:shadow-slate-400 focus:transition-shadow focus:ring-blue-200 border-gray-50 bg-slate-900"
            />
          </div>
        </div>
        <ul>
          {friendsList.map((friend) => (
            <li
              key={friend.id}
              className="flex items-center p-4 cursor-pointer hover:bg-gray-700"
              onClick={() => setSelectedFriend(friend)}
            >
              <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                <img src={friend.image} alt={friend.name} className="w-full h-full object-cover" />
              </div>
              <span>{friend.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Room */}
      <div
        className={`${
          selectedFriend ? "flex" : "hidden md:flex"
        } flex-1 flex-col h-full bg-cover bg-center`}
        style={{
          backgroundImage: selectedFriend
            ? "url('https://images.unsplash.com/photo-1504595403659-9088ce801e29?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
            : "url('https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {selectedFriend ? (
          <>
            {/* Header */}
            <div className="bg-gray-800 text-white py-4 px-6 flex items-center justify-between">
              <div className="flex items-center">
                {/* Back Button (Visible on Mobile) */}
                <button
                  className="md:hidden text-white mr-4"
                  onClick={() => setSelectedFriend(null)}
                >
                  <MoveLeft
                    className="hover:bg-slate-100 hover:shadow-md active:bg-slate-400 rounded-full p-2 transition duration-300 ease-in-out cursor-pointer w-12 h-10"
                  />
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
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
                        : "bg-gray-200 text-gray-800"
                    } rounded-lg p-3 max-w-[75%]`}
                  >
                    <p>{chat.message}</p>
                  </div>
                  <span className="text-sm text-white mt-1">{chat.timestamp}</span>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="bg-gray-800 py-4 flex items-center">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 px-4 py-3 focus:outline-none focus:ring-2 shadow w-full rounded-lg focus:outline-slate-400 shadow-slate-400 focus:shadow-lg focus:shadow-slate-400 focus:transition-shadow focus:ring-blue-200 border-gray-50 bg-slate-900 text-white ml-2 mr-3"
                placeholder="Type your message..."
              />
              <button
                onClick={handleSendMessage}
                className="text-white rounded-lg px-3 py-2 flex items-center justify-center transition-transform duration-300 ease-in-out transform hover:scale-110 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 shadow-lg focus:ring-4 focus:ring-blue-300 mr-2"
              >
                <PawPrint className="text-white w-8 h-8" />
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-2xl font-semibold text-gray-800">Select a friend to start chatting!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBox;
