import { Schema, model } from "mongoose";

const NotificationModel = Schema({
  eventType: { 
    type: String, 
    required: true 
  },
  recipient: {
     type: String,
      required: true 
    },
  subject: { 
    type: String, 
    required: true 
  },
  message: { type: String, 
    required: true 
  },
  sentAt: { 
    type: Date, 
    default: Date.now }

});


export default model('Notification', NotificationModel);



