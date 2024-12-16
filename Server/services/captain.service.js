import { CaptainModel } from "../models/captain.model.js";

export async function createCaptain({
  email,
  password,
  firstName,
  lastName,
  color,
  plate,
  capacity,
  vehicleType,
}) {
  if (
    !email ||
    !password ||
    !firstName ||
    !color ||
    !plate ||
    !capacity ||
    !vehicleType
  ) {
    throw new Error("All fields are mandatory");
  }
  const captain = await CaptainModel.create({
    email,
    password,
    fullName: {
      firstName,
      lastName,
    },
    vehicle: {
      color,
      plate,
      capacity,
      vehicleType,
    },
  });

  return captain;
}
