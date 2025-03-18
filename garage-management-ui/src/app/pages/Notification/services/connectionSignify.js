import { signify } from "react-signify";

export const ConnectionSignify = signify(
  {
    connection: "",
  },
  {
    cache: {
      key: "connectSinify",
    },
  }
);
