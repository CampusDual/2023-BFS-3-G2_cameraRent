import { MenuRootItem } from "ontimize-web-ngx";

export const MENU_CONFIG: MenuRootItem[] = [

  {
    id: "products",
    name: "PRODUCTS",
    icon: "video_camera_front",
    route: "/main/products",
  },
  {
    id: 'myprofile', name: 'MYPROFILE', icon: 'home', opened: false,
    items: [
      {
        id: 'mydata',
        name: 'MYDATA',
        icon: 'person',
        route: '/main/profile/mydata',
      },
      {
        id: 'myproducts',
        name: 'MYPRODUCTS',
        icon: 'shop',
        route: '/main/profile/myProducts',
      },
      {
        id: 'myRentals',
        name: 'MYRENTALS',
        icon: 'check_box',
        route: '/main/profile/myRentals',
      },
      {
        id: 'statistics',
        name: 'STATISTICS',
        icon: 'query_stats',
        route: '/main/profile/statistics',
      }

    ]
  },
  {
    id: "logout",
    name: "LOGOUT",
    route: "/login",
    icon: "power_settings_new",
    confirm: "yes",
  }
];
