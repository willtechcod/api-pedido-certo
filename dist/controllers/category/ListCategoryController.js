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

// src/controllers/category/ListCategoryController.ts
var ListCategoryController_exports = {};
__export(ListCategoryController_exports, {
  ListCategoryController: () => ListCategoryController
});
module.exports = __toCommonJS(ListCategoryController_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/category/ListCategoryServices.ts
var ListCategoryServices = class {
  async execute() {
    const category = await prisma_default.category.findMany({
      select: {
        id: true,
        name: true
      }
    });
    return category;
  }
};

// src/controllers/category/ListCategoryController.ts
var ListCategoryController = class {
  async handle(req, res) {
    const listCategoryService = new ListCategoryServices();
    const category = await listCategoryService.execute();
    return res.json(category);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ListCategoryController
});
