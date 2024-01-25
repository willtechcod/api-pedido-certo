var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/controllers/user/AuthUserController.ts
var AuthUserController_exports = {};
__export(AuthUserController_exports, {
  AuthUserController: () => AuthUserController
});
module.exports = __toCommonJS(AuthUserController_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/user/AuthUserService.ts
var import_bcryptjs = require("bcryptjs");
var import_jsonwebtoken = require("jsonwebtoken");
var AuthUserService = class {
  async execute({ email, password }) {
    const user = await prisma_default.user.findFirst({
      where: {
        email
      }
    });
    if (!user) {
      throw new Error("User/our password incorrect!");
    }
    const passwordMatch = await (0, import_bcryptjs.compare)(password, user.password);
    if (!passwordMatch) {
      throw new Error("User/our password incorrect!");
    }
    const token = (0, import_jsonwebtoken.sign)(
      {
        name: user.name,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "7d"
      }
    );
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token
    };
  }
};

// src/controllers/user/AuthUserController.ts
var AuthUserController = class {
  async handle(req, res) {
    const { email, password } = req.body;
    const authUserService = new AuthUserService();
    const auth = await authUserService.execute({
      email,
      password
    });
    return res.json(auth);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AuthUserController
});
