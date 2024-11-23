import cron from 'node-cron';
import Appointment from '../Models/Appointement.js';
import mongoose from 'mongoose';
cron.schedule('* * * * *', async () => {

    const now = new Date();
    // convert ist
    const offset= 5.5*60*60*1000;
    const compare = new Date(now.getTime() + offset);
    console.log(compare);
    try{
        const expiredAppointments = await Appointment.find({
            endtime: {$lte: compare}, 
            chat:true, 
        });

        if(expiredAppointments.length>0){
            const updated = await Appointment.updateMany(
                {
                _id: {$in: expiredAppointments.map(appointment => appointment._id)},
               }, 
               {$set:{chat:false}}
            );
        }
    }
    catch(error){
        console.log(error.message); 
    }
    });

