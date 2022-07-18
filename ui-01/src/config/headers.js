const headers = {
  "content-type": "application/json",
  charset: "utf-8",
  authorization: `${localStorage.getItem("token")}`,
};

export default headers;
