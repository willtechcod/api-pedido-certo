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

// src/controllers/product/ListByCategoryController.ts
var ListByCategoryController_exports = {};
__export(ListByCategoryController_exports, {
  ListByCategoryController: () => ListByCategoryController
});
module.exports = __toCommonJS(ListByCategoryController_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/product/ListByCategoryService.ts
var ListByCategoryService = class {
  async execute({ category_id }) {
    const findByCategory = await prisma_default.product.findMany({
      where: {
        category_id
      }
    });
    return findByCategory;
  }
};

// src/controllers/product/ListByCategoryController.ts
var ListByCategoryController = class {
  async handle(req, res) {
    const category_id = req.query.category_id;
    const listByCategory = new ListByCategoryService();
    const products = await listByCategory.execute({
      category_id
    });
    return res.json(products);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ListByCategoryController
});
