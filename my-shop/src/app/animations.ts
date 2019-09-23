import { trigger, style, transition, animate, query, group, state } from '@angular/animations';

export const componentSlider =
    trigger('routeAnimations', [
        transition('* <=> *', [
            query(':enter, :leave',
                style({ position: 'fixed', width: '100%' }),
                { optional: true }),
            group([
                query(':enter', [
                    style({ transform: 'translateX(100%)' }),
                    animate('0.5s ease-in-out',
                        style({ transform: 'translateX(0%)' }))
                ], { optional: true }),
                query(':leave', [
                    style({ transform: 'translateX(0%)' }),
                    animate('0.5s ease-in-out',
                        style({ transform: 'translateX(-100%)' }))
                ], { optional: true }),
            ])
        ]),
    ]);

export const menuSlider =
    trigger('slideInOut', [
        state('in', style({
            transform: 'translate3d(0, 0, 0)'
        })),
        state('out', style({
            transform: 'translate3d(-110%, 0, 0)'
        })),
        transition('in => out', animate('400ms ease-in')),
        transition('out => in', animate('400ms ease-out'))
    ]);
