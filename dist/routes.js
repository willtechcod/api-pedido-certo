var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/routes.ts
var routes_exports = {};
__export(routes_exports, {
  router: () => router
});
module.exports = __toCommonJS(routes_exports);
var import_express = require("express");
var import_multer2 = __toESM(require("multer"));

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/user/CreateUserService.ts
var import_bcryptjs = require("bcryptjs");
var CreateUserservice = class {
  async execute({ name, email, password }) {
    if (!email) {
      throw new Error("Email incorrect");
    }
    const userAlreadyExists = await prisma_default.user.findFirst({
      where: {
        email
      }
    });
    if (userAlreadyExists) {
      throw new Error("User already exists");
    }
    const passwordHash = await (0, import_bcryptjs.hash)(password, 8);
    const user = await prisma_default.user.create({
      data: {
        name,
        email,
        password: passwordHash
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    });
    return user;
  }
};

// src/controllers/user/CreateUserControlle.ts
var CreateUserController = class {
  async handle(req, res) {
    const { name, email, password } = req.body;
    const createUserService = new CreateUserservice();
    const user = await createUserService.execute({
      name,
      email,
      password
    });
    return res.json(user);
  }
};

// src/services/user/AuthUserService.ts
var import_bcryptjs2 = require("bcryptjs");
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
    const passwordMatch = await (0, import_bcryptjs2.compare)(password, user.password);
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

// src/services/user/DetailUserService.ts
var DetailUserService = class {
  async execute(user_id) {
    const user = await prisma_default.user.findFirst({
      where: {
        id: user_id
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    });
    return user;
  }
};

// src/controllers/user/DetailUserController.ts
var DetailUserController = class {
  async handle(req, res) {
    const user_id = req.user_id;
    const detailUserService = new DetailUserService();
    const user = await detailUserService.execute(user_id);
    return res.json(user);
  }
};

// src/middlewares/isAuthenticated.ts
var import_jsonwebtoken2 = require("jsonwebtoken");
function isAuthenticated(req, res, next) {
  const authToken = req.headers.authorization;
  if (!authToken) {
    return res.status(401).end();
  }
  const [, token] = authToken.split(" ");
  try {
    const { sub } = (0, import_jsonwebtoken2.verify)(
      token,
      process.env.JWT_SECRET
    );
    req.user_id = sub;
    return next();
  } catch (err) {
    return res.status(401).end();
  }
}

// src/services/category/CreateCategoryService.ts
var CreateCategoryService = class {
  async execute({ name }) {
    if (name === "") {
      throw new Error("Name is invalid!");
    }
    const category = await prisma_default.category.create({
      data: {
        name
      },
      select: {
        id: true,
        name: true
      }
    });
    return category;
  }
};

// src/controllers/category/CreateCategoryController.ts
var CreateCategoryController = class {
  async handle(req, res) {
    const { name } = req.body;
    const createCategoryService = new CreateCategoryService();
    const category = await createCategoryService.execute({
      name
    });
    return res.json(category);
  }
};

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

// src/config/multer.ts
var import_crypto = __toESM(require("crypto"));
var import_multer = __toESM(require("multer"));
var import_path = require("path");
var multer_default = {
  upload(folder) {
    return {
      storage: import_multer.default.diskStorage({
        destination: (0, import_path.resolve)(__dirname, "..", "..", folder),
        filename: (request, file, callback) => {
          const fileHash = import_crypto.default.randomBytes(16).toString("hex");
          const fileName = `${fileHash}-${file.originalname}`;
          return callback(null, fileName);
        }
      })
    };
  }
};

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

// src/services/order/RemoveOrderService.ts
var RemoveOrderService = class {
  async execute({ order_id }) {
    const order = await prisma_default.order.delete({
      where: {
        id: order_id
      }
    });
    return order;
  }
};

// src/controllers/order/RemoveOrderController.ts
var RemoveOrderController = class {
  async handle(req, res) {
    const order_id = req.query.order_id;
    const removeOrder = new RemoveOrderService();
    const order = await removeOrder.execute({
      order_id
    });
    return res.json(order);
  }
};

// src/services/order/AddItemService.ts
var AddItemService = class {
  async execute({ order_id, product_id, amount }) {
    const order = await prisma_default.item.create({
      data: {
        order_id,
        product_id,
        amount
      }
    });
    return order;
  }
};

// src/controllers/order/AddItemController.ts
var AddItemController = class {
  async handle(req, res) {
    const { order_id, product_id, amount } = req.body;
    const addItem = new AddItemService();
    const order = await addItem.execute({
      order_id,
      product_id,
      amount
    });
    return res.json(order);
  }
};

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

// src/services/order/SendOrderService.ts
var SendOrderService = class {
  async execute({ order_id }) {
    const order = await prisma_default.order.update({
      where: {
        id: order_id
      },
      data: {
        draft: false
      }
    });
    return order;
  }
};

// src/controllers/order/SendOrderController.ts
var SendOrderController = class {
  async handle(req, res) {
    const { order_id } = req.body;
    const sendOrder = new SendOrderService();
    const order = await sendOrder.execute({
      order_id
    });
    return res.json(order);
  }
};

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

// src/services/order/FinishOrderService.ts
var FinishOrderService = class {
  async execute({ order_id }) {
    const order = await prisma_default.order.update({
      where: {
        id: order_id
      },
      data: {
        status: true
      }
    });
    return order;
  }
};

// src/controllers/order/FinishOrderController.ts
var FinishOrderController = class {
  async handle(req, res) {
    const { order_id } = req.body;
    const finishOrderService = new FinishOrderService();
    const order = await finishOrderService.execute({
      order_id
    });
    return res.json(order);
  }
};

// src/routes.ts
var router = (0, import_express.Router)();
var upload = (0, import_multer2.default)(multer_default.upload("./tmp"));
router.get("/teste", (req, res) => {
  return res.json({ ok: "API no Ar.." });
});
router.post("/users", new CreateUserController().handle);
router.get("/me", isAuthenticated, new DetailUserController().handle);
router.post("/session", new AuthUserController().handle);
router.post("/category", isAuthenticated, new CreateCategoryController().handle);
router.get("/category", isAuthenticated, new ListCategoryController().handle);
router.post("/product", isAuthenticated, upload.single("file"), new CreateProductController().handle);
router.get("/category/product", isAuthenticated, new ListByCategoryController().handle);
router.post("/order", isAuthenticated, new CreateOrderController().handle);
router.delete("/order", isAuthenticated, new RemoveOrderController().handle);
router.post("/order/add", isAuthenticated, new AddItemController().handle);
router.delete("/order/remove", isAuthenticated, new RemoveItemController().handle);
router.put("/order/send", isAuthenticated, new SendOrderController().handle);
router.get("/orders", isAuthenticated, new ListOrdersController().handle);
router.get("/order/detail", isAuthenticated, new DetailOrderController().handle);
router.put("/order/finish", isAuthenticated, new FinishOrderController().handle);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  router
});
