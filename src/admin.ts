// admin.js
const AdminBro = require("admin-bro");
const AdminBroSequelize = require("admin-bro-sequelizejs");
const { sequelize } = require("./sequelize/app/models");

AdminBro.registerAdapter(AdminBroSequelize);

const adminBro = new AdminBro({
  rootPath: "/admin",
  loginPath: "/admin/login",
  // databases: [sequelize],
  branding: {
    companyName: "FRST",
    logo: "https://uploads-ssl.webflow.com/62263b87eb7349f6526f2f54/624e60d1a20c073a74dcecb4_logo-frst.svg",
    softwareBrothers: false, // Desative link "Software Brothers",
    theme: {
      colors: {
        primary100: "#EF5B2A", // Cor predominante
        primary80: "#F07B50",
        primary60: "#F29C76",
        primary40: "#F5BC9B",
        primary20: "#F8DDC1",
        accent: "#2A9D8F",
        love: "#E76F51",
      },
    },
  },
  resources: [
    {
      resource: sequelize.models.User,
      options: {
        properties: {
          id: {
            isVisible: true,
          },
        },
      },
    },
    {
      resource: sequelize.models.NotificationConfig,
      options: {
        properties: {
          notificationTime: {
            isVisible: true,
          },
        },
      },
    },
    {
      resource: sequelize.models.Problem,
      options: {
        properties: {
          id: {
            isVisible: true,
          },
        },
      },
    },
    {
      resource: sequelize.models.View,
    },
    {
      resource: sequelize.models.NotificationView,
    },
  ],
});

export default adminBro;