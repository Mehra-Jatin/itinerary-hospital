import ChatBox from "@/components/ChatBox";

export default function DoctorChat(){
    const friendsList = [
        { id: 1, name: "Khalid", image: "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
        { id: 2, name: "Aisha", image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
        { id: 3, name: "Omar", image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
      ];
    return <ChatBox friendsList={friendsList}  />
}