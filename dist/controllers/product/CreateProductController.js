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

// src/controllers/product/CreateProductController.ts
var CreateProductController_exports = {};
__export(CreateProductController_exports, {
  CreateProductController: () => CreateProductController
});
module.exports = __toCommonJS(CreateProductController_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/product/CreateProductService.ts
var CreateProductService = class {
  async execute({ name, price, description, banner, category_id }) {
    const product = await prisma_default.product.create({
      data: {
        name,
        price,
        description,
        banner,
        category_id
      }
    });
    return product;
  }
};

// src/controllers/product/CreateProductController.ts
var CreateProductController = class {
  async handle(req, res) {
    const { name, price, description, category_id } = req.body;
    const createProductService = new CreateProductService();
    if (!req.file) {
      throw new Error("error upload file");
    } else {
      const { originalname, filename: banner } = req.file;
      const product = await createProductService.execute({
        name,
        price,
        description,
        banner,
        category_id
      });
      return res.json(product);
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateProductController
});
