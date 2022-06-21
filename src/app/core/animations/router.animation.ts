import {
  animate,
  animation,
  AnimationReferenceMetadata,
  group,
  keyframes,
  query,
  style,
} from '@angular/animations';

export const sharedStyles = {
  position: 'fixed',
  overflow: 'hidden',
};

export const routerAnimation: AnimationReferenceMetadata = animation([
  query(':enter, :leave', style(sharedStyles), { optional: true }),
  group([
    query(
      ':enter',
      [
        animate(
          '.5s 0s ease',
          keyframes([
            style({
              transform: 'translateX(100%)',
              offset: 0,
              'z-index': '9999',
            }),
            style({ transform: 'translateX(0%)', offset: 1 }),
          ])
        ),
      ],
      { optional: true }
    ),
    query(':leave', [
      animate(
        '.5s 0s ease',
        keyframes([
          style({ transform: 'translateX(0%)', offset: 0 }),
          style({ transform: 'translateX(-100%)', opacity: '0', offset: 1 }),
        ])
      ),
    ]),
  ]),
]);
