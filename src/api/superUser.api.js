// NPM Modules
import express from "express";

// Local Modules
import { superAdminController } from "../controller";
import { ImageUploadMiddleware } from "../middlewares/image-upload.middleware";
import AuthMiddleware from "../auth/auth.middlware";

const router = express.Router();

router.post(
  "/createAdmin",
  AuthMiddleware.authenticateFor(["superAdmin"]),
  superAdminController.createAdmin
);

router.post(
  "/addTable",
  // AuthMiddleware.authenticateFor(["superAdmin", "admin"]),
  superAdminController.addTable
);
router.post(
  "/addColumn",
  // AuthMiddleware.authenticateFor(["superAdmin", "admin"]),
  superAdminController.addColumn
);
router.post(
  "/dropTable",
  // AuthMiddleware.authenticateFor(["superAdmin", "admin"]),
  superAdminController.dropTable
);
router.delete(
  "/dropColumn",
  // AuthMiddleware.authenticateFor(["superAdmin", "admin"]),
  superAdminController.dropColumn
);
router.post(
  "/changeTableName",
  // AuthMiddleware.authenticateFor(["superAdmin", "admin"]),
  superAdminController.changeTableName
);
router.post(
  "/changeColumnName",
  // AuthMiddleware.authenticateFor(["superAdmin", "admin"]),
  superAdminController.changeColumnName
);
router.get(
  "/getColumns",
  // AuthMiddleware.authenticateFor(["superAdmin", "admin"]),
  superAdminController.getColumns
);
router.get(
  "/getPrice",
  // AuthMiddleware.authenticateFor(["superAdmin", "admin"]),
  superAdminController.getPrice
);

router.post(
  "/insertValues",
  // AuthMiddleware.authenticateFor(["superAdmin", "admin"]),
  superAdminController.insertValues
);

router.put(
  "/changeLoginOptions",
  // AuthMiddleware.authenticateFor(["superAdmin", "admin"]),
  superAdminController.changeLoginOptions
);

router.get(
  "/loginOptions/:id",
  // AuthMiddleware.authenticateFor(["superAdmin", "admin"]),
  superAdminController.getLoginOptions
);

router.post(
  "/upload",
  // AuthMiddleware.authenticateFor(["superAdmin", "admin"]),
  ImageUploadMiddleware.upload(),
  superAdminController.addPic
);

router.put(
  "/changeSettings",
  // AuthMiddleware.authenticateFor(["superAdmin", "admin"]),
  superAdminController.changeSettings
);

router.get(
  "/settings/:id",
  // AuthMiddleware.authenticateFor(["superAdmin", "admin"]),
  superAdminController.getSettings
);

router.get(
  "/styles",
  // AuthMiddleware.authenticateFor(["superAdmin", "admin"]),
  superAdminController.getStylesByTitleDiv
);

router.put(
  "/styles",
  // AuthMiddleware.authenticateFor(["superAdmin", "admin"]),
  superAdminController.changeStyles
);

router.delete(
  "/styles/:id",
  // AuthMiddleware.authenticateFor(["superAdmin", "admin"]),
  superAdminController.deleteForStyles
);

router.post(
  "/styles/add",
  // AuthMiddleware.authenticateFor(["superAdmin", "admin"]),
  superAdminController.addStyle
);

router.get(
  "/about",
  // AuthMiddleware.authenticateFor(["superAdmin", "admin"]),
  superAdminController.getAboutByTitleDiv
);

router.put(
  "/about",
  // AuthMiddleware.authenticateFor(["superAdmin", "admin"]),
  superAdminController.changeAbout
);

router.delete(
  "/about/:id",
  // AuthMiddleware.authenticateFor(["superAdmin", "admin"]),
  superAdminController.deleteForAbout
);

router.post(
  "/about/add",
  // AuthMiddleware.authenticateFor(["superAdmin", "admin"]),
  superAdminController.addAbout
);

router.post(
  "/home/add",
  // AuthMiddleware.authenticateFor(["superAdmin", "admin"]),
  superAdminController.addHome
);

router.get(
  "/home",
  // AuthMiddleware.authenticateFor(["superAdmin", "admin"]),
  superAdminController.getHomeByTitleDiv
);

router.delete(
  "/home/:id",
  // AuthMiddleware.authenticateFor(["superAdmin", "admin"]),
  superAdminController.deleteForHome
);

router.get(
  "/terms",
  // AuthMiddleware.authenticateFor(["superAdmin", "admin"]),
  superAdminController.getTerms
);

router.put(
  "/terms",
  // AuthMiddleware.authenticateFor(["superAdmin", "admin"]),
  superAdminController.changeTerms
);

router.get("/getPDF", superAdminController.getPDF);

router.post("/createpdf", superAdminController.createPDF);

router.get(
  "/getMessages",
  // AuthMiddleware.authenticateFor(["superAdmin", "admin"]),
  superAdminController.getMessages
);

router.post("/sendMail", superAdminController.sendMail);

router.put(
  "/message/:id",
  // AuthMiddleware.authenticateFor(["superAdmin", "admin"]),
  superAdminController.changeMessageStatus
);

router.delete(
  "/message/:id",
  // AuthMiddleware.authenticateFor(["superAdmin", "admin"]),
  superAdminController.deleteMessage
);

router.put(
  "/changeCompanyData",
  // AuthMiddleware.authenticateFor(["superAdmin", "admin"]),
  superAdminController.changeCompanyData
);

router.post(
  "/addBoxParams",
  // AuthMiddleware.authenticateFor(["admin"]),

  superAdminController.addBoxParams
);

router.put(
  "/changeBoxParams",
  // AuthMiddleware.authenticateFor(["admin"]),

  superAdminController.changeBoxParams
);

export default router;
