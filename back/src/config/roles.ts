import { Role } from '@prisma/client';

const allRoles = {
  [Role.USER]: ['createPost'],
  [Role.ADMIN]: ['getUsers', 'manageUsers', 'reco']
};

export const roles = Object.keys(allRoles);
export const roleRights = new Map(Object.entries(allRoles));
