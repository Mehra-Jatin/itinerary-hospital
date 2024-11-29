import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DialogHeader } from "@/components/ui/dialog";
import { TableCell ,TableRow} from "@/components/ui/table";
import { Description, Dialog, DialogContent, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { MessageSquareMoreIcon } from "lucide-react";

export default function HistoryTableData({item}){
 return (
    <DialogContent className='fixed overflow-auto bg-white p-4 rounded-lg max-h-[90vh] w-full sm:w-[600px]'>
    <DialogHeader>
        <DialogTitle className='text-center mb-3 text-xl'>History</DialogTitle>
    </DialogHeader>
    <div className="flex flex-col gap-3 ">
        <Card className='bg-orange-200'>
            <CardHeader className='text-md font-medium text-center'>Patient's Details</CardHeader>
            <CardContent>
                <p><strong>FullName:</strong> {item.user?.FirstName} {item.user?.LastName}</p>
                <p><strong>Age :</strong> {item.user.age}</p>
                <p><strong>PhoneNo :</strong> {item.user.PhoneNo}</p>
                <p><strong>Email :</strong> {item.user.email}</p>
                <p><strong>Gender :</strong> {item.user.gender}</p>
                <Description>
                    <p><strong>Description:</strong> {item.history?.description}</p>
                    <p><strong>Prescription:</strong> {item.history?.prescription}</p>
                </Description>
            </CardContent>
        </Card>

        <Card className='bg-orange-200'>
            <CardHeader className='text-md font-medium text-center'>Appointment's Details</CardHeader>
            <CardContent>
                <p><strong>Date:</strong> {new Date(item.date).toLocaleDateString()}</p>
                <p><strong>Chats:</strong> {item.chat ? "User  Can Chat With you" : "User  Can Not Chat With You"}</p>
                <p><strong>Time:</strong> {item.time}</p>
            </CardContent>
        </Card>

        <Card className='bg-orange-200'>
            <CardHeader className='text-md font-medium text-center'>Histories's Details</CardHeader>
            <CardContent>
                <Description>
                    <p><strong>Description:</strong> {item.history?.description}</p>
                    <p><strong>Prescription:</strong> {item.history?.prescription}</p>
                </Description>
            </CardContent>
        </Card>
    </div>
    {item.chat ? (
        <div className="flex justify-center mt-4 gap-2 bg-orange-500 p-2 rounded-lg items-center hover:bg-orange-600 transition-all duration-300 ease-in-out cursor-pointer">
            <MessageSquareMoreIcon className="text-white w-5 h-5" />
            <div className="text-white font-medium">Chats</div>
        </div>
    ) : ""}
</DialogContent>
 )
}