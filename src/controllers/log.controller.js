import {getConnection} from "../db/db";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getLogs = async (req, res) => {
  try {
    const allLogs = await prisma.logTransaccional.findMany();
    res.json(allLogs);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const addLog = async (req, res) => {
  try {
    let {fecha, descripcion, estado} = req.body;

    if(fecha == undefined || descripcion == undefined || estado == undefined){
      res.status(400).json({message: "Bad request."});
    }
    fecha = new Date(fecha)
    const log = {fecha, descripcion, estado};

    const result = await prisma.logTransaccional.create({
            data: log
        })
    res.json({ status: 200, message: result });
  } catch (error) {
    res.status(500);
    console.log(error.message);
  }
};

const getLog = async (req, res) => {
  try {
    const {id} = req.params;

    const log = await prisma.logTransaccional.findMany({
            include: {
                id_log: id
           },
    })

    res.json(log);
  } catch (error) {
    res.status(500);
    console.log(error.message);
  }
};

export const methods = {
  getLogs,
  getLog,
  addLog
};
