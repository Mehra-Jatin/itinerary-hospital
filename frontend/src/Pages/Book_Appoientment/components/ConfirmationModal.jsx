import React from 'react';
import { format, parse } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const ConfirmationModal = ({ doctor, date, time, onConfirm, onCancel, isLoading }) => {
  return (
    <Dialog open={true} onOpenChange={onCancel} className="">
      <DialogContent className="sm:max-w-[425px] max-w-[90%] rounded-md">
        <DialogHeader>
          <DialogTitle>Confirm Appointment</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium">Doctor:</span>
            <span className="col-span-3">{doctor.FirstName} {doctor.LastName}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium">Date:</span>
            <span className="col-span-3">{format(date, 'MMMM d, yyyy')}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium">Time:</span>
            <span className="col-span-3">{format(parse(time.time, 'hh:mm a', new Date()), 'h:mm a')}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium">Fees:</span>
            <span className="col-span-3">{doctor.fees} /-</span>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel} disabled={isLoading} className=" bg-orange-50 border-orange-500 border">Cancel</Button>
          <Button onClick={onConfirm} disabled={isLoading} className="bg-orange-500 border-orange-500 border hover:bg-orange-600">
            {isLoading ? 'Booking...' : 'Confirm Booking'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationModal;
