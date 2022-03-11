import {animate, style, transition, trigger, state} from '@angular/animations';

export const fade = [
  trigger('fade', [
    state('in', style({ 'opacity': '1' })),
    state('out', style({ 'opacity': '0.5' })),
    transition('* <=> *', [
      animate(1000)
    ])
  ])
];

export const slideOutAnimationLeft =
  trigger('slideOutLeft', [
      transition(':enter', [
        style({
          transform: 'translateX(-100%)',
          opacity: 0
        }),
        animate('500ms ease-out', style({
          transform: 'translateX(0)',
          opacity: 1
        }))
      ]),
      transition(':leave', [
        style({
          transform: 'translateX(0)',
          opacity: 1
        }),
        animate('500ms ease-in', style({
          transform: 'translateX(-100%)',
          opacity: 0
        }))
      ]),
    ]
  );

export const slideOutAnimationTopRight =
  trigger(
    'slideOutAnimationTopRight', [
      transition(':enter', [
        style({
          transform: 'translate(100%, -100%)',
          opacity: 0
        }),
        animate('500ms ease-out', style({
          transform: 'translateX(0), translateY(0)',
          opacity: 1
        }))
      ]),
      transition(':leave', [
        style({
          transform: 'translateX(0), translateY(0)',
          opacity: 1
        }),
        animate('500ms ease-in', style({
          transform: 'translate(100%, -100%)',
          opacity: 0
        }))
      ])
    ]
  );
export const slideInOut =
  trigger('slideInOut', [
    transition(':enter', [
      style({transform: 'translateY(100%)'}),
      animate('200ms ease-in', style({transform: 'translateY(0%)'}))
    ]),
    transition(':leave', [
      animate('200ms ease-in', style({transform: 'translateY(100%)'}))
    ])
  ]);
