import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Pulpit',
    icon: 'nb-home',
    link: '/dashboard',
    home: true,
  },
  {
    title: 'Klienci',
    icon: 'nb-tables',
    link: '/clients',
  },
  {
    title: 'Firmy',
    icon: 'nb-tables',
    link: '/companies',
  },
  {
    title: 'Kierowcy',
    icon: 'nb-tables',
    link: '/drivers',
  },
  {
    title: 'Przejazdy',
    icon: 'nb-tables',
    link: '/destinations',
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Auth',
    icon: 'nb-locked',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },
];
