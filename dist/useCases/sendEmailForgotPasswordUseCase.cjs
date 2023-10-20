"use strict";
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

// src/useCases/sendEmailForgotPasswordUseCase.ts
var sendEmailForgotPasswordUseCase_exports = {};
__export(sendEmailForgotPasswordUseCase_exports, {
  SendEmailForgotPasswordUseCase: () => SendEmailForgotPasswordUseCase
});
module.exports = __toCommonJS(sendEmailForgotPasswordUseCase_exports);
var import_nodemailer = __toESM(require("nodemailer"), 1);

// src/environment_variables.ts
var secretKey = process.env.SECRET;
var emailNodeMailer = process.env.EMAIL_NODEMAILER;
var passwdNodeMailer = process.env.PASSWD_NODEMAILER;
var hostNodeMailer = process.env.HOST_NODEMAILER;
var port = process.env.PORT_NODEMAILER;

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

// prisma/prismaClient.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var prismaClient_default = prisma;

// src/useCases/sendEmailForgotPasswordUseCase.ts
var findUser = new FindUserById(prismaClient_default);
var SendEmailForgotPasswordUseCase = class {
  async execute(id) {
    try {
      const configTransport = {
        host: hostNodeMailer,
        port,
        secure: false,
        auth: {
          user: emailNodeMailer,
          pass: passwdNodeMailer
        }
      };
      const transport = import_nodemailer.default.createTransport(configTransport);
      const find = await findUser.execute(id);
      const send = await transport.sendMail({
        from: `Pro Tech Cursos <${emailNodeMailer}>`,
        to: find?.email,
        subject: "Redefini\xE7\xE3o de senha",
        html: `<h2>Voc\xEA solicitou uma redefini\xE7\xE3o de senha?</h2><p>Para redefinir sua senha, entre no link a seguir <a href="google.com">Redefinir senha</a></p><p>Se voc\xEA n\xE3o solicitou esta a\xE7\xE3o, ignore este email.</p>`
      });
      return { sucess: "Email enviado" };
    } catch (error) {
      console.log(error);
      return { errorSystem: "Houve algum erro, tente novamente mais tarde" };
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SendEmailForgotPasswordUseCase
});
