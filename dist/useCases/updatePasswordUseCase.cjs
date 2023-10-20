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

// src/useCases/updatePasswordUseCase.ts
var updatePasswordUseCase_exports = {};
__export(updatePasswordUseCase_exports, {
  UpdatePasswordUseCase: () => UpdatePasswordUseCase
});
module.exports = __toCommonJS(updatePasswordUseCase_exports);
var import_bcrypt = require("bcrypt");

// src/infra/updatePassword.ts
var UpdatePassword = class {
  prisma;
  constructor(prisma2) {
    this.prisma = prisma2;
  }
  async execute(userId, password) {
    try {
      const updatePassword = await this.prisma.profile.update({
        where: {
          id: userId
        },
        data: {
          password
        }
      });
      return updatePassword;
    } catch (error) {
      throw new Error("N\xE3o foi possivel atualizar sua informa\xE7\xE3o");
    }
  }
};

// prisma/prismaClient.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var prismaClient_default = prisma;

// src/useCases/updatePasswordUseCase.ts
var findUser = new UpdatePassword(prismaClient_default);
var UpdatePasswordUseCase = class {
  async execute(userId, password) {
    try {
      const salt = await (0, import_bcrypt.genSalt)(12);
      const passwordHash = await (0, import_bcrypt.hash)(password, salt);
      const changePass = await findUser.execute(userId, passwordHash);
    } catch (error) {
      console.log(error);
      return { errorSystem: "Houve algum erro, tente novamente mais tarde" };
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UpdatePasswordUseCase
});
