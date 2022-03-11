import {IntercomAvatar} from './IntercomAvatar';

export class IntercomUser  {
  email: string;
  user_id: string;
  created_at: number; // The Unix timestamp (in seconds) when the user signed up to your app
  name: string;
  phone: string;
  language_override: string; // can override the browser lang if needed
  avatar: IntercomAvatar;
  last_request_at: number;
}
