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

// src/useCases/getCoursesUseCase.ts
var getCoursesUseCase_exports = {};
__export(getCoursesUseCase_exports, {
  GetCoursesUseCase: () => GetCoursesUseCase
});
module.exports = __toCommonJS(getCoursesUseCase_exports);

// prisma/prismaClient.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var prismaClient_default = prisma;

// src/infra/courses/findCourses.ts
var FindCourses = class {
  prisma;
  constructor(prisma2) {
    this.prisma = prisma2;
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

// src/useCases/getCoursesUseCase.ts
var findCourses = new FindCourses(prismaClient_default);
var GetCoursesUseCase = class {
  async execute() {
    try {
      const find = await findCourses.execute();
      return find;
    } catch (error) {
      console.log(error);
      return { errorSystem: "Houve algum erro, tente novamente mais tarde" };
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GetCoursesUseCase
});
