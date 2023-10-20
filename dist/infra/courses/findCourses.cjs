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

// src/infra/courses/findCourses.ts
var findCourses_exports = {};
__export(findCourses_exports, {
  FindCourses: () => FindCourses
});
module.exports = __toCommonJS(findCourses_exports);
var FindCourses = class {
  prisma;
  constructor(prisma) {
    this.prisma = prisma;
  }
  async execute() {
    try {
      const courses = await this.prisma.courses.findMany({
        select: {
          images: true,
          name: true,
          description: true
        }
      });
      if (courses.length < 0) {
        return { errorSystem: "Houve algum erro, tente novamente mais tarde" };
      }
      return courses;
    } catch (error) {
      throw new Error("Cursos n\xE3o encontrado");
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FindCourses
});
