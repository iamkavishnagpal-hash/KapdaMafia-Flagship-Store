export const permissions = ['orders:read','orders:write','inventory:read','inventory:write','pos:operate','analytics:read','profit:read','campaigns:write','ai:use'] as const;
export type Permission = typeof permissions[number];
export function can(userPermissions: Permission[], permission: Permission) { return userPermissions.includes(permission); }
