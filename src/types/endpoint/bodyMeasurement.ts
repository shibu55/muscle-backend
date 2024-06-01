export interface CreateBodyMeasurementRequestBody {
  userId: string;
  date: Date;
  height: string;
  weight: string;
  bodyFat: string;
  muscleMass: string;
}

export interface UpdateBodyMeasurementRequestBody {
  userId?: string;
  date?: Date;
  height?: string;
  weight?: string;
  bodyFat?: string;
  muscleMass?: string;
}

export interface CreateBodyMeasurementResponse {
  id: string;
  userId: string;
  date: Date;
  height: string;
  weight: string;
  bodyFat: string;
  muscleMass: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetAllBodyMeasurementsResponse {
  bodyMeasurements: CreateBodyMeasurementResponse[];
}

export interface GetBodyMeasurementResponse {
  id: string;
  userId: string;
  date: Date;
  height: string;
  weight: string;
  bodyFat: string;
  muscleMass: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateBodyMeasurementResponse {
  id: string;
  userId: string;
  date: Date;
  height: string;
  weight: string;
  bodyFat: string;
  muscleMass: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DeleteBodyMeasurementResponse {
  message: string;
}
