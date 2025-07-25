import { Request, Response } from "express";
import { AppointmentRegisterDTO } from "../dtos/AppointmentDTO";
import {getAppointmentByIdService, getAppointmentService, registerAppointmentService, cancelStatusAppointmentService,} from "../services/appointmentServices";
import { PostgresError } from "../interfaces/ErrorInterface";

export const getAppointmentsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await getAppointmentService();
    res.status(200).json({
      message: "Obtener el listado de todos los turnos de todos los usuarios",
      data: response,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error en el servidor.",
      data: error instanceof Error ? error.message : "Error desconocido.",
    });
  }
};

export const getAppointmentByIdController = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const response = await getAppointmentByIdService(id);
    res.status(200).json({
      message: "Obtener el detalle de un turno especifico: " + id,
      data: response,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error en el servidor.",
      data: error instanceof Error ? error.message : "Error desconocido.",
    });
  }
};

export const registerAppointmentController = async (req: Request<unknown, unknown, AppointmentRegisterDTO>, res: Response): Promise<void> => {
  try {
    const response = await registerAppointmentService(req.body);
    res.status(201).json({
      message: "Turno creado con exito",
      data: response,
    });
  } catch (error) {
    const err = error as PostgresError
    res.status(400).json({
      message: "Error en el servidor.",
      data: err instanceof Error ? err.detail ? err.detail : err.message: "Error desconocido."
    });
  }
};


export const cancelStatusAppointmentController = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const response = await cancelStatusAppointmentService(id);
    res.status(200).json({
      message: "Cambiar el status de un turno a 'cancelled':" + id,
      data: response,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error en el servidor.",
      data: error instanceof Error ? error.message : "Error desconocido.",
    });
  }
};
