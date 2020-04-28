import { startOfHour } from 'date-fns';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface RequestDTO {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ provider, date }: RequestDTO): Appointment {
    const AppointmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
      AppointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('já tem um agendamento neste horario');
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: AppointmentDate,
    });
    return appointment;
  }
}

export default CreateAppointmentService;
