import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CategoryForGuest } from 'src/app/models/guestview/RecommendationForGuest';
declare var google: any;

@Component({
  selector: 'app-recommendations-create',
  templateUrl: './recommendations-create.component.html',
  styleUrls: ['./recommendations-create.component.scss']
})

export class RecommendationsCreateComponent implements OnInit {

  prices = [
              { value: 1, text: 'Free', symbol: '' }, { value:2, text:'5',symbol:'$'  },{ value:3, text:'10',symbol:'$'  },
              { value: 4, text: '15', symbol: '$'  }, { value:5, text:'20',symbol:'$'  }
          ]

  tags = {
    suggested:['Restaurant','Bakery','Delivery','Food','Activity','Coffee','Pizza','Shop','Monument','Nature','History'],
    added:[]
  }

  tag:any;

  recommendations:FormGroup = new FormGroup({
    address:new FormControl('',[Validators.required]),
    rate: new FormControl(5),
    tags: new FormControl([]),
    phone: new FormControl(''),
    website: new FormControl(''),
    recommend_desc: new FormControl('')
  })

  categories = new CategoryForGuest().list;

  constructor(
  ) { }

  ngOnInit() {
  }

  addTag(suggested?,index?){
    if(suggested){
      this.checkList(suggested,'suggested',index);
    } else {
      this.checkList(this.tag,'added');
    }
  }

  checkList(tag, type?, index?) {
    if (tag.trim().length !== 0) { // Condition for prevent to add empty values in array;
      let exist = this.tags.added.includes(tag);
      if (!exist)this.tags.added.push(tag);
      if (type === 'suggested') this.removeFromlist(type, index);
      this.resetTag();
      this.updateTags();
    }
  }

  updateTags() {
    this.recommendations.patchValue({
      tags: this.tags.added
    });
  }

  removeFromlist(type, i) {
    if (type === 'suggested') this.tags.suggested.splice(i, 1);
    if (type === 'added') this.tags.added.splice(i, 1);
  }

  resetTag(){
    this.tag = '';
  }


  loadInput() {
    const options = {
        // bounds: defaultBounds,
    fields: [
              'formatted_address', 'geometry', 'name', 'website', 'formatted_phone_number', 'place_id',
              'types', 'business_status', 'business_status', 'international_phone_number',
            ]
        //,types: ['address', 'opening_hours', 'photos',]
        //fields: ['formatted_address', 'geometry'],
        //types: ['address']
      };
      const addressInputElem = document.getElementById('fullAddress');
      const autocompleteFrom = new google.maps.places.Autocomplete(addressInputElem,options);
      autocompleteFrom.addListener('place_changed', () => {
          const place = autocompleteFrom.getPlace();
          this.patchDataFromAddress(place);
      });
  }

  patchDataFromAddress(place){
    this.recommendations.patchValue({
      phone:place.formatted_phone_number,
      website:place.website
    })
  }

}
