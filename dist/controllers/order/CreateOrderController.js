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

// src/controllers/order/CreateOrderController.ts
var CreateOrderController_exports = {};
__export(CreateOrderController_exports, {
  CreateOrderController: () => CreateOrderController
});
module.exports = __toCommonJS(CreateOrderController_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/order/CreateOrderService.ts
var CreateOrderService = class {
  async execute({ table, client }) {
    const order = await prisma_default.order.create({
      data: {
        table,
        client
      }
    });
    return order;
  }
};

// src/controllers/order/CreateOrderController.ts
var CreateOrderController = class {
  async handle(req, res) {
    const { table, client } = req.body;
    const createOrderService = new CreateOrderService();
    const order = await createOrderService.execute({
      table,
      client
    });
    return res.json(order);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateOrderController
});
