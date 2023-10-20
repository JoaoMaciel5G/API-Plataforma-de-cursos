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

// src/useCases/deleteUserUseCase.ts
var deleteUserUseCase_exports = {};
__export(deleteUserUseCase_exports, {
  DeleteUserUseCase: () => DeleteUserUseCase
});
module.exports = __toCommonJS(deleteUserUseCase_exports);

// prisma/prismaClient.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var prismaClient_default = prisma;

// src/infra/deleteUser.ts
var DeleteUser = class {
  prisma;
  constructor(prisma2) {
    this.prisma = prisma2;
  }
  async execute(userId) {
    try {
      const deleteUser2 = await this.prisma.profile.delete({ where: { id: userId } });
    } catch (error) {
      throw new Error("N\xE3o foi possivel deletar o usu\xE1rio");
    }
  }
};

// src/infra/findUserById.ts
var FindUserById = class {
  prisma;
  constructor(prisma2) {
    this.prisma = prisma2;
  }
  async execute(userId) {
    try {
      const search = await this.prisma.profile.findUnique({ where: { id: userId } });
      return search;
    } catch (error) {
      throw new Error("Usu\xE1rio n\xE3o encontrado");
    }
  }
};

// src/useCases/deleteUserUseCase.ts
var deleteUser = new DeleteUser(prismaClient_default);
var findUser = new FindUserById(prismaClient_default);
var DeleteUserUseCase = class {
  async execute(id) {
    try {
      const getInfoUser = await findUser.execute(id);
      if (getInfoUser !== null && Object.keys(getInfoUser).length > 0) {
        const excludeUser = await deleteUser.execute(id);
        return;
      }
      return { errorActionForbidden: "A\xE7\xE3o n\xE3o autorizada" };
    } catch (error) {
      console.log(error);
      return { errorSystem: "Houve algum erro, tente novamente mais tarde" };
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DeleteUserUseCase
});
