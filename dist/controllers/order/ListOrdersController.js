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

// src/controllers/order/ListOrdersController.ts
var ListOrdersController_exports = {};
__export(ListOrdersController_exports, {
  ListOrdersController: () => ListOrdersController
});
module.exports = __toCommonJS(ListOrdersController_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/order/ListOrdersSerice.ts
var ListOrdersSerice = class {
  async execute() {
    const orders = await prisma_default.order.findMany({
      where: {
        draft: false,
        status: false
      },
      orderBy: {
        created_at: "desc"
      }
    });
    return orders;
  }
};

// src/controllers/order/ListOrdersController.ts
var ListOrdersController = class {
  async handle(req, res) {
    const listOrdersService = new ListOrdersSerice();
    const orders = await listOrdersService.execute();
    return res.json(orders);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ListOrdersController
});
