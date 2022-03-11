import {Component, Input, OnInit} from '@angular/core';
import {Property} from '../../../../models/Property';
import {PropertyForGuest} from '../../../../models/guestview/PropertyForGuest';
import {AbstractWindow} from '../../../../core/abstract/AbstractWindow';
import {IntercomService} from '../../../../core/services/IntercomService';
import {UtilsService} from '../../../../core/services/utils.service';


@Component({
  selector: 'app-vbca-footer',
  templateUrl: './vbca-footer.component.html',
  styleUrls: ['./vbca-footer.component.scss']
})
export class VbcaFooterComponent extends AbstractWindow implements OnInit {
  @Input() property: PropertyForGuest;
  covid1: string;
  constructor(public intercomService: IntercomService,
              public utilsService: UtilsService) {
    super(intercomService, utilsService);
  }

  ngOnInit() {
    this.covid1 ='Le port du masque est obligatoire dans l’ensemble des espaces du Village by CA Rouen Vallée de Seine.\n' +
      'L’organisateur de la manifestation est responsable de la bonne application des mesures gouvernementales en cours (mise à disposition de masques et de gel hydro-alcoolique, distanciation) pour les participants dans l’espace loué\n\n' +
      'Merci de nous faire parvenir vos pass sanitaires le jour de votre arrivée. Pour ce faire, allez dans l’application TousAntiCovid > Pass Sanitaire > Ouvrir mon carnet > Partager le certificat en cliquant sur les 3 points situés en haut de celui-ci.'
  }

}
