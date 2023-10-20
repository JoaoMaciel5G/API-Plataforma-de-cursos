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

// src/infra/findUserById.ts
var findUserById_exports = {};
__export(findUserById_exports, {
  FindUserById: () => FindUserById
});
module.exports = __toCommonJS(findUserById_exports);
var FindUserById = class {
  prisma;
  constructor(prisma) {
    this.prisma = prisma;
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FindUserById
});
