import UserRouter from "./user.route";

const api = (app: any) => {
  app.use("/user", UserRouter);
};

export default api;
