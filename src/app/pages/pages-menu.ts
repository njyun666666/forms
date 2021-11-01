import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'HOME',
    icon:  'fa-angle-right',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'D2',
    icon: 'fa-angular',
    link: '/pages/dashboard/d2',
    home: true,
  },
  {
    title: 'IoT Dashboard',
    icon: { icon: 'fa-ad', pack: 'font-awesome' },
    link: '/pages/iot-dashboard',
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Miscellaneous',
    icon: 'fa-angry',
    children: [
      {
        title: '404',
        link: '/pages/miscellaneous/404',
      },
      {
        title: 'test',
        link: '/pages/Test',
      },
    ],
  },
];
