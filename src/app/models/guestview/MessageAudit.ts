export class MessageAudit {

  id: string; // twilio ID
  // Twilio Recorded sending date
  date: string;
  // Yaago recorded date
  sendingDate: string;
  side: string;
  recipients: string;
  fullName: string;
  destination: string; // Phone or email or guest native coordinates
  type: string; // Whatsapp, SMS, Email, OTA message...
  content: string;
  status: string;

  propertyId: string;
  propertyTitle: string;
  bookingId: string;
}
