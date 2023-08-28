const FluentClient = require("@fluent-org/logger").FluentClient;
export const logger = new FluentClient("api_deimos", {
  socket: {
    host: "localhost",
    port: 24224,
    timeout: 3000, // 3 seconds
  },
});
