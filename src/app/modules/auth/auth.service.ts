import { prisma } from "../../config/prisma";

const createUser = async (payload: any) => {
  await prisma.user.create({
    data: {
      ...payload,
    },
  });
};
