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

// src/controllers/userController.ts
var userController_exports = {};
__export(userController_exports, {
  UserController: () => UserController
});
module.exports = __toCommonJS(userController_exports);
var import_jsonwebtoken = __toESM(require("jsonwebtoken"), 1);

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

// src/environment_variables.ts
var secretKey = process.env.SECRET;
var emailNodeMailer = process.env.EMAIL_NODEMAILER;
var passwdNodeMailer = process.env.PASSWD_NODEMAILER;
var hostNodeMailer = process.env.HOST_NODEMAILER;
var port = process.env.PORT_NODEMAILER;

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

// src/useCases/loginUserUseCase.ts
var import_bcrypt2 = require("bcrypt");

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

// src/useCases/loginUserUseCase.ts
var findUser2 = new FindUserByEmail(prismaClient_default);
var LoginUserUseCase = class {
  async execute({ email, password }) {
    try {
      const getInfoUser = await findUser2.execute(email);
      const verifyPasswordIsEqual = await (0, import_bcrypt2.compare)(password, getInfoUser?.password);
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

// src/useCases/sendEmailForgotPasswordUseCase.ts
var import_nodemailer = __toESM(require("nodemailer"), 1);
var findUser3 = new FindUserById(prismaClient_default);
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
      const find = await findUser3.execute(id);
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

// src/useCases/updatePasswordUseCase.ts
var import_bcrypt3 = require("bcrypt");

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

// src/useCases/updatePasswordUseCase.ts
var findUser4 = new UpdatePassword(prismaClient_default);
var UpdatePasswordUseCase = class {
  async execute(userId, password) {
    try {
      const salt = await (0, import_bcrypt3.genSalt)(12);
      const passwordHash = await (0, import_bcrypt3.hash)(password, salt);
      const changePass = await findUser4.execute(userId, passwordHash);
    } catch (error) {
      console.log(error);
      return { errorSystem: "Houve algum erro, tente novamente mais tarde" };
    }
  }
};

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

// src/controllers/userController.ts
var UserController = class {
  async create(request, response) {
    const { name, email, password } = request.body;
    const createUser2 = new createUserUseCase();
    const user = await createUser2.execute({ email, password, name });
    if ("id" in user) {
      const token = import_jsonwebtoken.default.sign({ userId: user.id }, secretKey);
      return response.status(201).json({ message: token });
    }
    return response.status(401).json({ message: user.errorSystem });
  }
  async delete(request, response) {
    const authToken = request.headers.authorization;
    const token = authToken && authToken.split(" ")[1];
    const deleteUser2 = new DeleteUserUseCase();
    try {
      const decodedToken = import_jsonwebtoken.default.verify(token, secretKey);
      const userId = decodedToken.userId;
      const user = await deleteUser2.execute(userId);
      if (user?.errorActionForbidden) {
        return response.status(401).json({ message: "A\xE7\xE3o n\xE3o autorizada" });
      }
      return response.status(200).json({ message: "Usuario excluido como sucesso" });
    } catch (error) {
      response.status(403).json({ message: "Houve algum erro, tente novamente mais tarde" });
    }
  }
  async loginUser(request, response) {
    const { email, password } = request.body;
    const loginUseCase = new LoginUserUseCase();
    try {
      const { isErrorEmailOrPassword, sucess } = await loginUseCase.execute({ email, password });
      if (isErrorEmailOrPassword) {
        return response.status(401).json({ isErrorEmailOrPassword });
      }
      return response.status(200).json({ sucess });
    } catch (error) {
      console.log(error);
      return response.status(403).json({ error: "Houve algum erro, tente novamente mais tarde" });
    }
  }
  async sendEmail(request, response) {
    const authToken = request.headers.authorization;
    const token = authToken && authToken.split(" ")[1];
    const emailUseCase = new SendEmailForgotPasswordUseCase();
    try {
      const decodedToken = import_jsonwebtoken.default.verify(token, secretKey);
      const userId = decodedToken.userId;
      const sendEmail = await emailUseCase.execute(userId);
      return response.status(200).json({ message: "Concluido" });
    } catch (error) {
      console.log(error);
      return response.status(403).json({ error: "Houve algum erro, tente novamente mais tarde" });
    }
  }
  async updatePassword(request, response) {
    const { password } = request.body;
    const authToken = request.headers.authorization;
    const token = authToken && authToken.split(" ")[1];
    const updatePassUseCase = new UpdatePasswordUseCase();
    try {
      const decodedToken = import_jsonwebtoken.default.verify(token, secretKey);
      const userId = decodedToken.userId;
      const updatePassword = updatePassUseCase.execute(userId, password);
      return response.status(200).json({ message: "Dados atualizados com sucesso" });
    } catch (error) {
      console.log(error);
      return response.status(403).json({ error: "Houve algum erro, tente novamente mais tarde" });
    }
  }
  async getCourses(request, response) {
    const getCourses = await new GetCoursesUseCase().execute();
    if ("errorSystem" in getCourses) {
      return response.status(400).json({ error: getCourses.errorSystem });
    }
    return response.status(200).json(getCourses);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserController
});
