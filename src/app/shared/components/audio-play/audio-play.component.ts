import {Component, Input, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-audio-play',
  templateUrl: './audio-play.component.html',
  styleUrls: ['./audio-play.component.scss']
})
export class AudioPlayComponent implements OnInit {

  isPlay = false;
  isPause = false;
  synthesis = window.speechSynthesis;
  @Input() textToSpeak;
  constructor(private translateService: TranslateService) { }

  ngOnInit() {
  }

  playText() {
    this.isPlay = true;
    this.isPause = false;
    this.synthesis.cancel();
    const localLangue = this.translateService.currentLang;
    /*this.synthesis.getVoices().forEach( v => {
      console.log(v);
    })*/
    var voice = this.synthesis.getVoices().filter(function (voice) {
      return voice.lang.indexOf(localLangue) > 0;
    })[0];

    // Create an utterance object
    var utterance = new SpeechSynthesisUtterance(this.textToSpeak);

    // Set utterance properties
    utterance.voice = voice;
    utterance.lang = localLangue;
    utterance.pitch = 1;
    utterance.rate = 1;
    utterance.volume = 0.8;
    //console.log(utterance);
    // Speak the utterance
    this.synthesis.speak(utterance);
  }
  pauseText() {
    this.isPlay = false;
    this.isPause = true;
    this.synthesis.pause();
  }
  resumeText() {
    this.isPlay = true;
    this.isPause = false;
    this.synthesis.resume();
  }

}
