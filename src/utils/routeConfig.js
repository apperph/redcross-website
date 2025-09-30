/**
 * Route configuration for the application
 */
export const routes = {
  home: {
    path: '/',
    component: 'Home',
    title: 'Home',
    description: 'Red Cross Philippines - Welcome'
  },
  login: {
    path: '/login',
    component: 'Login',
    title: 'Login',
    description: 'Access Your Humanitarian Journey'
  },
  register: {
    path: '/register',
    component: 'Register',
    title: 'Register',
    description: 'Join the Red Cross - Registration'
  },
  payment: {
    path: '/payment',
    component: 'Payment',
    title: 'Payment',
    description: 'Complete Your Humanitarian Commitment'
  }
};

/**
 * Navigation items for the navbar
 */
export const navigationItems = [
  {
    path: routes.home.path,
    label: 'Home',
    icon: 'fas fa-home'
  },
  {
    path: routes.login.path,
    label: 'Login',
    icon: 'fas fa-sign-in-alt'
  },
  {
    path: routes.register.path,
    label: 'Register',
    icon: 'fas fa-user-plus'
  },
  {
    path: routes.payment.path,
    label: 'Payment',
    icon: 'fas fa-credit-card'
  }
];

/**
 * Check if a route exists
 */
export const isValidRoute = (path) => {
  return Object.values(routes).some(route => route.path === path);
};

/**
 * Get route information by path
 */
export const getRouteInfo = (path) => {
  return Object.values(routes).find(route => route.path === path);
};
