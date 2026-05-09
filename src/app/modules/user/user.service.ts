import { UserProfile } from "../../../generated/prisma";
import { prisma } from "../../config/prisma";

const getUser = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user;
};

const updateUserProfile = async (id: string, data: Partial<UserProfile>) => {
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
  });
};
export const UserService = {
  getUser,
};
