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

// src/infra/updatePassword.ts
var updatePassword_exports = {};
__export(updatePassword_exports, {
  UpdatePassword: () => UpdatePassword
});
module.exports = __toCommonJS(updatePassword_exports);
var UpdatePassword = class {
  prisma;
  constructor(prisma) {
    this.prisma = prisma;
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UpdatePassword
});
