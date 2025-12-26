import { auth } from '@/auth';
import { Role } from '@prisma/client';

/**
 * Get the current authenticated user session
 */
export async function getCurrentUser() {
    const session = await auth();
    return session?.user;
}

/**
 * Check if user has a specific role
 */
export async function hasRole(role: Role): Promise<boolean> {
    const user = await getCurrentUser();
    return user?.role === role;
}

/**
 * Check if user is an admin
 */
export async function isAdmin(): Promise<boolean> {
    return hasRole(Role.ADMIN);
}

/**
 * Check if user is a lawyer (Abogado)
 */
export async function isAbogado(): Promise<boolean> {
    return hasRole(Role.ABOGADO);
}

/**
 * Check if user is a client (Cliente)
 */
export async function isCliente(): Promise<boolean> {
    return hasRole(Role.CLIENTE);
}

/**
 * Check if user has any of the specified roles
 */
export async function hasAnyRole(roles: Role[]): Promise<boolean> {
    const user = await getCurrentUser();
    if (!user?.role) return false;
    return roles.includes(user.role as Role);
}

/**
 * Require authentication - throws if not authenticated
 */
export async function requireAuth() {
    const user = await getCurrentUser();
    if (!user) {
        throw new Error('Authentication required');
    }
    return user;
}

/**
 * Require specific role - throws if user doesn't have the role
 */
export async function requireRole(role: Role) {
    const user = await requireAuth();
    if (user.role !== role) {
        throw new Error(`Role ${role} required`);
    }
    return user;
}

/**
 * Require admin role - throws if user is not admin
 */
export async function requireAdmin() {
    return requireRole(Role.ADMIN);
}
