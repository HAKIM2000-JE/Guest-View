export class IntercomSettings {

  custom_launcher_selector: string;
  alignment: string; // left or right (default)
  vertical_padding: number;
  horizontal_padding: number;
  hide_default_launcher: boolean = false;
  session_duration: number;
  action_color: string;
  background_color: string;

  constructor(public app_id: string) { }

}
