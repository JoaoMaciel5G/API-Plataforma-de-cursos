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

// src/useCases/loginUserUseCase.ts
var loginUserUseCase_exports = {};
__export(loginUserUseCase_exports, {
  LoginUserUseCase: () => LoginUserUseCase
});
module.exports = __toCommonJS(loginUserUseCase_exports);
var import_bcrypt = require("bcrypt");

// src/infra/findUserByEmail.ts
var FindUserByEmail = class {
  prisma;
  constructor(prisma2) {
    this.prisma = prisma2;
  }
  async execute(email) {
    try {
      const search = await this.prisma.profile.findUnique({ where: { email } });
      return search;
    } catch (error) {
      throw new Error("Usu\xE1rio n\xE3o encontrado");
    }
  }
};

// prisma/prismaClient.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var prismaClient_default = prisma;

// src/useCases/loginUserUseCase.ts
var findUser = new FindUserByEmail(prismaClient_default);
var LoginUserUseCase = class {
  async execute({ email, password }) {
    try {
      const getInfoUser = await findUser.execute(email);
      const verifyPasswordIsEqual = await (0, import_bcrypt.compare)(password, getInfoUser?.password);
      if (!verifyPasswordIsEqual) {
        return { isErrorEmailOrPassword: "E-mail ou senha incorreto" };
      }
      return { sucess: "Logado com sucesso" };
    } catch (error) {
      console.log(error);
      return { errorSystem: "Houve algum erro, tente novamente mais tarde" };
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LoginUserUseCase
});
