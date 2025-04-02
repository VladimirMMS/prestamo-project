/* eslint-disable @typescript-eslint/no-explicit-any */
import RequestPageTwoToneIcon from "@mui/icons-material/RequestPageTwoTone";
import PriceCheckTwoToneIcon from "@mui/icons-material/PriceCheckTwoTone";
import AttachMoneyTwoToneIcon from "@mui/icons-material/AttachMoneyTwoTone";
import HomeIcon from '@mui/icons-material/Home';
import React from "react";

export const module: any = {
    'user': [

      {
        text: "Home",
        link: "/",
        icon: React.createElement(HomeIcon),
      },
        {
          text: "Solicitar Préstamo",
          link: "/solicitar-prestamo",
          icon: React.createElement(RequestPageTwoToneIcon),
        },
        {
          text: "Préstamos",
          link: "/prestamos",
          icon: React.createElement(PriceCheckTwoToneIcon)
        },
        {
          text: "Cuentas Bancarias",
          link: "/cuentas-bancarias",
          icon: React.createElement(AttachMoneyTwoToneIcon),
        }
      ],
    'admin': [],
    'super-user': [
      {
        text: "Home",
        link: "/",
        icon: React.createElement(HomeIcon),
      },
      {
        text: "Solicitudes Pendientes",
        link: "/solicitudes-pendientes",
        icon: React.createElement(RequestPageTwoToneIcon),
      },

    ],

}
