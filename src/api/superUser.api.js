// NPM Modules
import express from 'express';

// Local Modules
import { superAdminController } from '../controller';
import { ImageUploadMiddleware } from '../middlewares/image-upload.middleware';
import AuthMiddleware from '../auth/auth.middlware';
import { AddValidationMiddleware, ChangeValidationMiddleware, DeleteValidationMiddleware } from '../middlewares/validation';

const router = express.Router();

router.post(
    '/createAdmin',
    AuthMiddleware.authenticateFor(['superAdmin']),
    superAdminController.createAdmin
);

router.post(
    '/addTable',
    AuthMiddleware.authenticateFor(['superAdmin', 'admin']),
    // AddValidationMiddleware.validateCreateTableArgs,
    superAdminController.addTable
);
router.post(
    '/addColumn',
    AuthMiddleware.authenticateFor(['superAdmin', 'admin']),
    superAdminController.addColumn
);
router.post(
    '/dropTable',
    AuthMiddleware.authenticateFor(['superAdmin', 'admin']),
    superAdminController.dropTable
);
router.delete(
    '/dropColumn',
    AuthMiddleware.authenticateFor(['superAdmin', 'admin']),
    DeleteValidationMiddleware.validateDropColumnArgs,
    superAdminController.dropColumn
);
router.post(
    '/changeTableName',
    AuthMiddleware.authenticateFor(['superAdmin', 'admin']),
    superAdminController.changeTableName
);
router.post(
    '/changeColumnName',
    AuthMiddleware.authenticateFor(['superAdmin', 'admin']),
    ChangeValidationMiddleware.validateColumnNameArgs,
    superAdminController.changeColumnName
);
router.get(
    '/getColumns',
    superAdminController.getColumns
);
router.get(
    '/getPrice',
    AuthMiddleware.authenticateFor(['superAdmin', 'admin']),
    superAdminController.getPrice
);

router.post(
    '/insertValues',
    // AuthMiddleware.authenticateFor(['superAdmin', 'admin']),
    AddValidationMiddleware.validateInsertingArgs,
    superAdminController.insertValues
);

router.put(
    '/changeLoginOptions',
    AuthMiddleware.authenticateFor(['superAdmin', 'admin']),
    ChangeValidationMiddleware.validateChangeLoginOptionsArgs,
    superAdminController.changeLoginOptions
);

router.get(
    '/loginOptions/:id',
    superAdminController.getLoginOptions
);

router.post(
    '/upload',
    AuthMiddleware.authenticateFor(['superAdmin', 'admin']),
    ImageUploadMiddleware.upload(),
    superAdminController.addPic
);

router.put(
    '/changeSettings',
    AuthMiddleware.authenticateFor(['superAdmin', 'admin']),
    ChangeValidationMiddleware.validateChangeSettingsArgs,
    superAdminController.changeSettings
);

router.get(
    '/settings/:id',
    AuthMiddleware.authenticateFor(['superAdmin', 'admin']),
    superAdminController.getSettings
);

router.get(
    '/styles',
    superAdminController.getStylesByTitleDiv
);

router.put(
    '/styles',
    AuthMiddleware.authenticateFor(['superAdmin', 'admin']),
    ChangeValidationMiddleware.validateChangeStylesArgs,
    superAdminController.changeStyles
);

router.delete(
    '/styles/:id',
    AuthMiddleware.authenticateFor(['superAdmin', 'admin']),
    DeleteValidationMiddleware.validateDeleteByIdArgs,
    superAdminController.deleteForStyles
);

router.post(
    '/styles/add',
    AuthMiddleware.authenticateFor(['superAdmin', 'admin']),
    AddValidationMiddleware.validateAddStylesArgs,
    superAdminController.addStyle
);

router.get(
    '/about',
    superAdminController.getAboutByTitleDiv
);

router.put(
    '/about',
    AuthMiddleware.authenticateFor(['superAdmin', 'admin']),
    ChangeValidationMiddleware.validateChangeAboutArgs,
    superAdminController.changeAbout
);

router.delete(
    '/about/:id',
    AuthMiddleware.authenticateFor(['superAdmin', 'admin']),
    DeleteValidationMiddleware.validateDeleteByIdArgs,
    superAdminController.deleteForAbout
);

router.post(
    '/about/add',
    AuthMiddleware.authenticateFor(['superAdmin', 'admin']),
    AddValidationMiddleware.validateAddAboutArgs,
    superAdminController.addAbout
);

router.post(
    '/home/add',
    AuthMiddleware.authenticateFor(['superAdmin', 'admin']),
    AddValidationMiddleware.validateAddToHomeArgs,
    superAdminController.addHome
);

router.get(
    '/home',
    superAdminController.getHomeByTitleDiv
);

router.delete(
    '/home/:id',
    AuthMiddleware.authenticateFor(['superAdmin', 'admin']),
    DeleteValidationMiddleware.validateDeleteByIdArgs,
    superAdminController.deleteForHome
);

router.get(
    '/terms',
    superAdminController.getTerms
);

router.put(
    '/terms',
    AuthMiddleware.authenticateFor(['superAdmin', 'admin']),
    ChangeValidationMiddleware.validateChangeTermsArgs,
    superAdminController.changeTerms
);

router.get('/getPDF', superAdminController.getPDF);

router.post('/createpdf', superAdminController.createPDF);

router.get(
    '/getMessages',
    AuthMiddleware.authenticateFor(['superAdmin', 'admin']),
    superAdminController.getMessages
);

router.post('/sendMail',
    AddValidationMiddleware.validateSendMailArgs,
    superAdminController.sendMail);

router.put(
    '/message/:id',
    AuthMiddleware.authenticateFor(['superAdmin', 'admin']),
    ChangeValidationMiddleware.validateChangeMessageArgs,
    ChangeValidationMiddleware.validateChangeByIdArgs,
    superAdminController.changeMessageStatus
);

router.delete(
    '/message/:id',
    AuthMiddleware.authenticateFor(['superAdmin', 'admin']),
    DeleteValidationMiddleware.validateDeleteByIdArgs,
    superAdminController.deleteMessage
);

router.put(
    '/changeCompanyData',
    AuthMiddleware.authenticateFor(['superAdmin', 'admin']),
    superAdminController.changeCompanyData
);

router.post(
    '/addBoxParams',
    AuthMiddleware.authenticateFor(['admin']),
    superAdminController.addBoxParams
);

router.get(
    '/getBoxParams',
    // AuthMiddleware.authenticateFor(['admin']),
    superAdminController.getBoxParams
);

router.put(
    '/changeBoxParams',
    // AuthMiddleware.authenticateFor(['admin']),
    superAdminController.changeBoxParams
);

router.get(
    '/companySettings',
    AuthMiddleware.authenticateFor(['superAdmin','admin']),
    superAdminController.companySettings
);
router.post(
    '/addCompanySettings',
    AuthMiddleware.authenticateFor(['superAdmin','admin']),
    superAdminController.addCompanySettings
);
router.delete(
    '/deleteCompanySettings/:colname',
    AuthMiddleware.authenticateFor(['superAdmin','admin']),
    superAdminController.deleteCompanySettings
);
router.put(
    '/changeCompanySettings',
    AuthMiddleware.authenticateFor(['superAdmin','admin']),
    // ChangeValidationMiddleware.validateChangeCompanySettingsArgs,
    superAdminController.changeCompanySettings
);

export default router;




