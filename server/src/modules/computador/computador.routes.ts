import { Router } from "express";
import { ComputadorController } from "./computador.controller";

export function createComputadorRoute() {
    const router = Router();
    const controller = new ComputadorController();

    router.get("/", (req, res) => controller.listAll(req, res));
    router.post("/", (req, res) => controller.create(req, res));
    router.get("/:id", (req, res) => controller.getById(req,res));
    router.put("/:id", (req, res) => controller.update(req,res));
    router.delete("/:id", (req, res) => controller.delete(req,res));

    return router;
}