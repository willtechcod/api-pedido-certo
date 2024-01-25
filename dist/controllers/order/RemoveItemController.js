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

// src/controllers/order/RemoveItemController.ts
var RemoveItemController_exports = {};
__export(RemoveItemController_exports, {
  RemoveItemController: () => RemoveItemController
});
module.exports = __toCommonJS(RemoveItemController_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/order/RemoveItemService.ts
var RemoveItemService = class {
  async execute({ item_id }) {
    const order = await prisma_default.item.delete({
      where: {
        id: item_id
      }
    });
    return order;
  }
};

// src/controllers/order/RemoveItemController.ts
var RemoveItemController = class {
  async handle(req, res) {
    const item_id = req.query.item_id;
    const removeItemService = new RemoveItemService();
    const order = await removeItemService.execute({
      item_id
    });
    return res.json(order);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RemoveItemController
});
