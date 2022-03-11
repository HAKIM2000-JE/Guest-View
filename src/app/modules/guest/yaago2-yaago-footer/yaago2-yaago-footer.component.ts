import { Component, OnInit } from '@angular/core';
import {AbstractWindow} from '../../../core/abstract/AbstractWindow';
import {IntercomService} from '../../../core/services/IntercomService';
import {UtilsService} from '../../../core/services/utils.service';

@Component({
  selector: 'app-yaago2-yaago-footer',
  templateUrl: './yaago2-yaago-footer.component.html',
  styleUrls: ['./yaago2-yaago-footer.component.scss']
})
export class Yaago2YaagoFooterComponent extends AbstractWindow implements OnInit {

  public readonly socials = [
    {name: 'facebook', url: 'https://www.facebook.com/app.yaago'},
    {name: 'instagram', url: 'https://www.instagram.com/yaago_official/'},
    {name: 'linkedin', url: 'https://www.linkedin.com/showcase/40824063/admin/'},
    {name: 'youtube', url: 'https://www.youtube.com/channel/UChU5yvjqzda8si_l54T9j1w'},
  ];
  public readonly partners = [
    {name: 'le-village', url: 'https://www.paris.levillagebyca.com/'},
    {name: 'hotes-de-france', url: 'https://www.federationhotesdefrance.com/'},
    {name: 'region-normandy', url: 'https://www.normandie.fr/'},
    {name: 'rouen-normandy', url: 'https://frenchtechrouen.com/'},
  ];

  year = new Date().getFullYear();

  constructor(public intercomService: IntercomService,
              public utilsService: UtilsService) {
    super(intercomService, utilsService);
  }

  ngOnInit() {
  }

}
