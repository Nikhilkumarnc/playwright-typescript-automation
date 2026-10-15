export const loginSchema = {
  type: "object",
  properties: {
    token: { type: "string", minLength: 1 },
    userId: { type: "string", minLength: 1 },
    message: { type: "string", minLength: 1 },
  },
  required: ["token", "userId", "message"],
  additionalProperties: true,
} as const;

export const createOrderSchema = {
  type: "object",
  properties: {
    orders: {
      type: "array",
      items: { type: "string", minLength: 1 },
      minItems: 1,
    },
    productOrderId: {
      type: "array",
      items: { type: "string", minLength: 1 },
      minItems: 1,
    },
    message: {
      type: "string",
      minLength: 1,
    },
  },
  required: ["orders", "productOrderId", "message"],
  additionalProperties: true,
} as const;
