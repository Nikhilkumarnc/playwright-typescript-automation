import { faker } from "@faker-js/faker";

export type RegisterUserType = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  occupation: string;
  gender: "Male" | "Female";
  password: string;
  confirmPassword: string;
  isAdult: boolean;
};

export function generateRegisterUserData(
  userOccupation: string,
): RegisterUserType {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  const email = faker.internet
    .email({
      firstName,
      lastName,
    })
    .toLowerCase();

  const phoneNumber =
    faker.helpers.arrayElement(["6", "7", "8", "9"]) + faker.string.numeric(9);

  const gender = faker.helpers.arrayElement(["Male", "Female"] as const);

  const password = `Test@${faker.string.alpha({ length: 6, casing: "mixed" })}${faker.string.numeric(4)}`;

  return {
    firstName,
    lastName,
    email,
    phoneNumber,
    occupation: userOccupation,
    gender,
    password,
    confirmPassword: password,
    isAdult: true,
  };
}
