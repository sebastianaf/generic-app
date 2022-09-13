import AccessService from "../services/access.service";
import UserService from "../services/user.service";
const userService = new UserService();
const accessService = new AccessService();

const initAdminUser = async () => {
  try {
    setTimeout(async () => {
      const user = await userService.createfirstUser();
      console.log(`Admin user... OK`);
    }, 4000);
  } catch (error) {
    console.log(`Admin user... FAIL`);
  }
};

const initAdminAccess = async () => {
  try {
    setTimeout(async () => {
      let exist = await accessService.findOne({ pathname: "/api/access" });
      if (!exist) {
        const access = await accessService.save({
          pathname: "/api/access",
        });
      }
      exist = await accessService.findOne({ pathname: "/api/roles" });
      if (!exist) {
        const access = await accessService.save({
          pathname: "/api/roles",
        });
      }
      exist = await accessService.findOne({ pathname: "/api/users" });
      if (!exist) {
        const access = await accessService.save({
          pathname: "/api/users",
        });
      }
      exist = await accessService.findOne({ pathname: "/api/login" });
      if (!exist) {
        const access = await accessService.save({
          pathname: "/api/login",
          isPublic: true,
        });
      }
      console.log(`Admin access... OK`);
    }, 1000);
  } catch (error) {
    console.log(`Admin access... FAIL`);
  }
};

export { initAdminAccess, initAdminUser };
