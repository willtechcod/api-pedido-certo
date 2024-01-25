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

// src/controllers/order/DetailOrderController.ts
var DetailOrderController_exports = {};
__export(DetailOrderController_exports, {
  DetailOrderController: () => DetailOrderController
});
module.exports = __toCommonJS(DetailOrderController_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/order/DetailOrderService.ts
var DetailOrderService = class {
  async execute({ order_id }) {
    const orders = await prisma_default.item.findMany({
      where: {
        order_id
      },
      include: {
        product: true,
        order: true
      }
    });
    return orders;
  }
};

// src/controllers/order/DetailOrderController.ts
var DetailOrderController = class {
  async handle(req, res) {
    const order_id = req.query.order_id;
    const detailOrderService = new DetailOrderService();
    const orders = await detailOrderService.execute({
      order_id
    });
    return res.json(orders);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DetailOrderController
});
