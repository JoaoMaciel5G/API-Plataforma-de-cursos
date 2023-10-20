"use strict";
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

// src/useCases/createUserUseCase.ts
var createUserUseCase_exports = {};
__export(createUserUseCase_exports, {
  createUserUseCase: () => createUserUseCase
});
module.exports = __toCommonJS(createUserUseCase_exports);

// src/infra/createUser.ts
var CreateUser = class {
  prisma;
  constructor(prisma2) {
    this.prisma = prisma2;
  }
  async execute(data) {
    try {
      const createUser2 = await this.prisma.profile.create({ data });
      return createUser2;
    } catch (error) {
      throw new Error("N\xE3o foi possivel criar o usu\xE1rio");
    }
  }
};

// prisma/prismaClient.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var prismaClient_default = prisma;

// src/useCases/createUserUseCase.ts
var import_client2 = require("@prisma/client");
var import_bcrypt = require("bcrypt");
var createUser = new CreateUser(prismaClient_default);
var createUserUseCase = class {
  async execute({ email, password, name }) {
    try {
      const salt = await (0, import_bcrypt.genSalt)(12);
      const passwordHash = await (0, import_bcrypt.hash)(password, salt);
      const user = await createUser.execute({
        name,
        email,
        password: passwordHash
      });
      return user;
    } catch (error) {
      if (error instanceof import_client2.Prisma.PrismaClientKnownRequestError) {
        return { errorEmailUsed: "Use outro e-mail" };
      }
      console.log(error);
      return { errorSystem: "Houve algum erro, tente novamente mais tarde" };
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createUserUseCase
});
