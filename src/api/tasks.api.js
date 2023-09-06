// NPM Modules
import express from "express";

// Local Modules
import { TasksController } from "../controller";
import { TasksUploadMiddleware } from "../middlewares/tasks-upload.middleware";

const router = express.Router();
//Employes

router.post(
  "/addEmployesPicture",
  TasksUploadMiddleware.upload(),

  TasksController.addPicture
);
router.post("/addEmployes", TasksController.add);

router.put("/checkBox/:id", TasksController.checkBox);

router.get("/getEmployes/:limit/:offset", TasksController.get);

router.get("/getAll", TasksController.getAll);

router.get("/getTaskById/:id", TasksController.getOne);

router.get("/getEmployeById/:id", TasksController.getById);

router.get("/getTask/:limit/:offset", TasksController.task);

router.put("/putEmployes/:id", TasksController.put);

router.delete("/deleteEmployes/:id", TasksController.delete);

router.post("/addTasks", TasksController.addTasks);

router.put("/editTasks/:id", TasksController.editTasks);
router.delete("/deleteTasks/:id", TasksController.deleteTasks);

router.get("/getTasks/:id", TasksController.getTasks);

router.post("/search", TasksController.searchString)

export default router;
