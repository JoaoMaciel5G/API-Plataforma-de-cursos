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

// src/infra/createUser.ts
var createUser_exports = {};
__export(createUser_exports, {
  CreateUser: () => CreateUser
});
module.exports = __toCommonJS(createUser_exports);
var CreateUser = class {
  prisma;
  constructor(prisma) {
    this.prisma = prisma;
  }
  async execute(data) {
    try {
      const createUser = await this.prisma.profile.create({ data });
      return createUser;
    } catch (error) {
      throw new Error("N\xE3o foi possivel criar o usu\xE1rio");
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateUser
});
