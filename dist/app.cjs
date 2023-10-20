"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
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

// node_modules/dotenv/package.json
var require_package = __commonJS({
  "node_modules/dotenv/package.json"(exports, module2) {
    module2.exports = {
      name: "dotenv",
      version: "16.3.1",
      description: "Loads environment variables from .env file",
      main: "lib/main.js",
      types: "lib/main.d.ts",
      exports: {
        ".": {
          types: "./lib/main.d.ts",
          require: "./lib/main.js",
          default: "./lib/main.js"
        },
        "./config": "./config.js",
        "./config.js": "./config.js",
        "./lib/env-options": "./lib/env-options.js",
        "./lib/env-options.js": "./lib/env-options.js",
        "./lib/cli-options": "./lib/cli-options.js",
        "./lib/cli-options.js": "./lib/cli-options.js",
        "./package.json": "./package.json"
      },
      scripts: {
        "dts-check": "tsc --project tests/types/tsconfig.json",
        lint: "standard",
        "lint-readme": "standard-markdown",
        pretest: "npm run lint && npm run dts-check",
        test: "tap tests/*.js --100 -Rspec",
        prerelease: "npm test",
        release: "standard-version"
      },
      repository: {
        type: "git",
        url: "git://github.com/motdotla/dotenv.git"
      },
      funding: "https://github.com/motdotla/dotenv?sponsor=1",
      keywords: [
        "dotenv",
        "env",
        ".env",
        "environment",
        "variables",
        "config",
        "settings"
      ],
      readmeFilename: "README.md",
      license: "BSD-2-Clause",
      devDependencies: {
        "@definitelytyped/dtslint": "^0.0.133",
        "@types/node": "^18.11.3",
        decache: "^4.6.1",
        sinon: "^14.0.1",
        standard: "^17.0.0",
        "standard-markdown": "^7.1.0",
        "standard-version": "^9.5.0",
        tap: "^16.3.0",
        tar: "^6.1.11",
        typescript: "^4.8.4"
      },
      engines: {
        node: ">=12"
      },
      browser: {
        fs: false
      }
    };
  }
});

// node_modules/dotenv/lib/main.js
var require_main = __commonJS({
  "node_modules/dotenv/lib/main.js"(exports, module2) {
    "use strict";
    var fs = require("fs");
    var path = require("path");
    var os = require("os");
    var crypto = require("crypto");
    var packageJson = require_package();
    var version = packageJson.version;
    var LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
    function parse(src) {
      const obj = {};
      let lines = src.toString();
      lines = lines.replace(/\r\n?/mg, "\n");
      let match;
      while ((match = LINE.exec(lines)) != null) {
        const key = match[1];
        let value = match[2] || "";
        value = value.trim();
        const maybeQuote = value[0];
        value = value.replace(/^(['"`])([\s\S]*)\1$/mg, "$2");
        if (maybeQuote === '"') {
          value = value.replace(/\\n/g, "\n");
          value = value.replace(/\\r/g, "\r");
        }
        obj[key] = value;
      }
      return obj;
    }
    function _parseVault(options) {
      const vaultPath = _vaultPath(options);
      const result = DotenvModule.configDotenv({ path: vaultPath });
      if (!result.parsed) {
        throw new Error(`MISSING_DATA: Cannot parse ${vaultPath} for an unknown reason`);
      }
      const keys = _dotenvKey(options).split(",");
      const length = keys.length;
      let decrypted;
      for (let i = 0; i < length; i++) {
        try {
          const key = keys[i].trim();
          const attrs = _instructions(result, key);
          decrypted = DotenvModule.decrypt(attrs.ciphertext, attrs.key);
          break;
        } catch (error) {
          if (i + 1 >= length) {
            throw error;
          }
        }
      }
      return DotenvModule.parse(decrypted);
    }
    function _log(message) {
      console.log(`[dotenv@${version}][INFO] ${message}`);
    }
    function _warn(message) {
      console.log(`[dotenv@${version}][WARN] ${message}`);
    }
    function _debug(message) {
      console.log(`[dotenv@${version}][DEBUG] ${message}`);
    }
    function _dotenvKey(options) {
      if (options && options.DOTENV_KEY && options.DOTENV_KEY.length > 0) {
        return options.DOTENV_KEY;
      }
      if (process.env.DOTENV_KEY && process.env.DOTENV_KEY.length > 0) {
        return process.env.DOTENV_KEY;
      }
      return "";
    }
    function _instructions(result, dotenvKey) {
      let uri;
      try {
        uri = new URL(dotenvKey);
      } catch (error) {
        if (error.code === "ERR_INVALID_URL") {
          throw new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenv.org/vault/.env.vault?environment=development");
        }
        throw error;
      }
      const key = uri.password;
      if (!key) {
        throw new Error("INVALID_DOTENV_KEY: Missing key part");
      }
      const environment = uri.searchParams.get("environment");
      if (!environment) {
        throw new Error("INVALID_DOTENV_KEY: Missing environment part");
      }
      const environmentKey = `DOTENV_VAULT_${environment.toUpperCase()}`;
      const ciphertext = result.parsed[environmentKey];
      if (!ciphertext) {
        throw new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${environmentKey} in your .env.vault file.`);
      }
      return { ciphertext, key };
    }
    function _vaultPath(options) {
      let dotenvPath = path.resolve(process.cwd(), ".env");
      if (options && options.path && options.path.length > 0) {
        dotenvPath = options.path;
      }
      return dotenvPath.endsWith(".vault") ? dotenvPath : `${dotenvPath}.vault`;
    }
    function _resolveHome(envPath) {
      return envPath[0] === "~" ? path.join(os.homedir(), envPath.slice(1)) : envPath;
    }
    function _configVault(options) {
      _log("Loading env from encrypted .env.vault");
      const parsed = DotenvModule._parseVault(options);
      let processEnv = process.env;
      if (options && options.processEnv != null) {
        processEnv = options.processEnv;
      }
      DotenvModule.populate(processEnv, parsed, options);
      return { parsed };
    }
    function configDotenv(options) {
      let dotenvPath = path.resolve(process.cwd(), ".env");
      let encoding = "utf8";
      const debug = Boolean(options && options.debug);
      if (options) {
        if (options.path != null) {
          dotenvPath = _resolveHome(options.path);
        }
        if (options.encoding != null) {
          encoding = options.encoding;
        }
      }
      try {
        const parsed = DotenvModule.parse(fs.readFileSync(dotenvPath, { encoding }));
        let processEnv = process.env;
        if (options && options.processEnv != null) {
          processEnv = options.processEnv;
        }
        DotenvModule.populate(processEnv, parsed, options);
        return { parsed };
      } catch (e) {
        if (debug) {
          _debug(`Failed to load ${dotenvPath} ${e.message}`);
        }
        return { error: e };
      }
    }
    function config(options) {
      const vaultPath = _vaultPath(options);
      if (_dotenvKey(options).length === 0) {
        return DotenvModule.configDotenv(options);
      }
      if (!fs.existsSync(vaultPath)) {
        _warn(`You set DOTENV_KEY but you are missing a .env.vault file at ${vaultPath}. Did you forget to build it?`);
        return DotenvModule.configDotenv(options);
      }
      return DotenvModule._configVault(options);
    }
    function decrypt(encrypted, keyStr) {
      const key = Buffer.from(keyStr.slice(-64), "hex");
      let ciphertext = Buffer.from(encrypted, "base64");
      const nonce = ciphertext.slice(0, 12);
      const authTag = ciphertext.slice(-16);
      ciphertext = ciphertext.slice(12, -16);
      try {
        const aesgcm = crypto.createDecipheriv("aes-256-gcm", key, nonce);
        aesgcm.setAuthTag(authTag);
        return `${aesgcm.update(ciphertext)}${aesgcm.final()}`;
      } catch (error) {
        const isRange = error instanceof RangeError;
        const invalidKeyLength = error.message === "Invalid key length";
        const decryptionFailed = error.message === "Unsupported state or unable to authenticate data";
        if (isRange || invalidKeyLength) {
          const msg = "INVALID_DOTENV_KEY: It must be 64 characters long (or more)";
          throw new Error(msg);
        } else if (decryptionFailed) {
          const msg = "DECRYPTION_FAILED: Please check your DOTENV_KEY";
          throw new Error(msg);
        } else {
          console.error("Error: ", error.code);
          console.error("Error: ", error.message);
          throw error;
        }
      }
    }
    function populate(processEnv, parsed, options = {}) {
      const debug = Boolean(options && options.debug);
      const override = Boolean(options && options.override);
      if (typeof parsed !== "object") {
        throw new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");
      }
      for (const key of Object.keys(parsed)) {
        if (Object.prototype.hasOwnProperty.call(processEnv, key)) {
          if (override === true) {
            processEnv[key] = parsed[key];
          }
          if (debug) {
            if (override === true) {
              _debug(`"${key}" is already defined and WAS overwritten`);
            } else {
              _debug(`"${key}" is already defined and was NOT overwritten`);
            }
          }
        } else {
          processEnv[key] = parsed[key];
        }
      }
    }
    var DotenvModule = {
      configDotenv,
      _configVault,
      _parseVault,
      config,
      decrypt,
      parse,
      populate
    };
    module2.exports.configDotenv = DotenvModule.configDotenv;
    module2.exports._configVault = DotenvModule._configVault;
    module2.exports._parseVault = DotenvModule._parseVault;
    module2.exports.config = DotenvModule.config;
    module2.exports.decrypt = DotenvModule.decrypt;
    module2.exports.parse = DotenvModule.parse;
    module2.exports.populate = DotenvModule.populate;
    module2.exports = DotenvModule;
  }
});

// src/app.ts
var app_exports = {};
__export(app_exports, {
  default: () => app_default
});
module.exports = __toCommonJS(app_exports);
var import_express2 = __toESM(require("express"), 1);
var import_cors = __toESM(require("cors"), 1);

// src/routes/routes.ts
var import_express = require("express");

// src/controllers/userController.ts
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

// src/routes/routes.ts
var router = (0, import_express.Router)();
var userController = new UserController();
router.get("/getCourses", async (request, response) => {
  return userController.getCourses(request, response);
});
router.post("/create", async (request, response) => {
  return userController.create(request, response);
});
router.post("/login", async (request, response) => {
  return userController.loginUser(request, response);
});
router.post("/sendMail", async (request, response) => {
  return userController.sendEmail(request, response);
});
router.delete("/delete", (request, response) => {
  return userController.delete(request, response);
});
router.patch("/updatePassword", async (request, response) => {
  return userController.updatePassword(request, response);
});
var routes_default = router;

// src/app.ts
var import_dotenv = __toESM(require_main(), 1);
import_dotenv.default.config();
var app = (0, import_express2.default)();
app.use((0, import_cors.default)());
app.use(import_express2.default.json());
app.use("/", routes_default);
var app_default = app;
