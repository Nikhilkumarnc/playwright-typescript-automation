import { APIRequestContext, expect } from "@playwright/test";
import Ajv from "ajv";
import { loginSchema, createOrderSchema } from "../schemas/api-schemas";
import { envConfig } from "../config/env.config";

type LoginPayload = {
  userEmail: string;
  userPassword: string;
};

type OrderPayload = {
  orders: {
    country: string;
    productOrderedId: string;
  }[];
};

type LoginResponse = {
  token: string;
  userId: string;
  message: string;
};

type CreateOrderResponse = {
  orders: string[];
};

export type CreateOrderResult = {
  token: string;
  orderId: string;
};

const ajv = new Ajv({ allErrors: true });

const validateLoginSchema = ajv.compile<LoginResponse>(loginSchema);

const validateCreateOrderSchema =
  ajv.compile<CreateOrderResponse>(createOrderSchema);

const loginAPIURL = `${envConfig.apiBaseURL}/api/ecom/auth/login`;
const createOrderAPIURL = `${envConfig.apiBaseURL}/api/ecom/order/create-order`;

export class APIUtils {
  constructor(
    private readonly apiContext: APIRequestContext,
    private readonly loginPayload: LoginPayload,
  ) {}

  async getToken(): Promise<string> {
    const loginResponse = await this.apiContext.post(loginAPIURL, {
      data: this.loginPayload,
    });

    expect(
      loginResponse.ok(),
      `Login API returned HTTP ${loginResponse.status()}`,
    ).toBeTruthy();

    const responseBody: unknown = await loginResponse.json();

    if (!validateLoginSchema(responseBody)) {
      throw new Error("Login API response does not match the expected schema.");
    }

    return responseBody.token;
  }

  async createOrder(orderPayload: OrderPayload): Promise<CreateOrderResult> {
    const token = await this.getToken();

    const createOrderResponse = await this.apiContext.post(createOrderAPIURL, {
      data: orderPayload,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });

    expect(
      createOrderResponse.ok(),
      `Create-order API returned HTTP ${createOrderResponse.status()}`,
    ).toBeTruthy();

    const responseBody: unknown = await createOrderResponse.json();

    if (!validateCreateOrderSchema(responseBody)) {
      throw new Error(
        "Create-order API response did not contain a valid order ID.",
      );
    }

    const orderId = responseBody.orders[0];

    if (!orderId) {
      throw new Error("Create-order API returned an empty orders array.");
    }

    return {
      token,
      orderId,
    };
  }
}
