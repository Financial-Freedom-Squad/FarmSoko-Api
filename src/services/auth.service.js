import { ApiError } from '../utils/apiError.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { generateToken } from '../utils/token.js';
import { db } from '../db/index.js';
import { users } from '../db/schema.js';
import { eq } from 'drizzle-orm';

// In-memory fallback users for development & unit testing when DB is offline
const IN_MEMORY_USERS = [
  {
    id: 'user_farmer_01',
    name: 'John Kiprono',
    email: 'farmer@farmsoko.com',
    passwordHash: '$2a$10$wKz0b/rVqOaWbX7MvP9U5uQyL8eU/2gN1v1T7uC/J6VbFm1a8hY/i', // password123
    role: 'farmer',
    phone: '+254712345678',
    location: 'Eldoret, Uasin Gishu',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

class AuthService {
  constructor() {
    this.memoryUsers = [...IN_MEMORY_USERS];
  }

  async register({ name, email, password, role = 'buyer', phone = '', location = '' }) {
    const cleanEmail = email.trim().toLowerCase();

    // Check existing email
    let existingUser = null;
    if (db) {
      try {
        const found = await db.select().from(users).where(eq(users.email, cleanEmail)).limit(1);
        if (found.length > 0) existingUser = found[0];
      } catch {
        // Fallback to in-memory if DB table not yet migrated
        existingUser = this.memoryUsers.find((u) => u.email === cleanEmail);
      }
    } else {
      existingUser = this.memoryUsers.find((u) => u.email === cleanEmail);
    }

    if (existingUser) {
      throw ApiError.conflict('An account with this email already exists');
    }

    const hashedPassword = await hashPassword(password);
    const id = `user_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`;
    const validRoles = ['farmer', 'buyer', 'admin'];
    const assignedRole = validRoles.includes(role) ? role : 'buyer';

    const newUser = {
      id,
      name: name.trim(),
      email: cleanEmail,
      passwordHash: hashedPassword,
      role: assignedRole,
      phone,
      location,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (db) {
      try {
        await db.insert(users).values(newUser);
      } catch {
        this.memoryUsers.push(newUser);
      }
    } else {
      this.memoryUsers.push(newUser);
    }

    const token = generateToken({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    });

    const { passwordHash: _, ...userSafe } = newUser;
    return { user: userSafe, token };
  }

  async login({ email, password }) {
    const cleanEmail = email.trim().toLowerCase();

    let user = null;
    if (db) {
      try {
        const found = await db.select().from(users).where(eq(users.email, cleanEmail)).limit(1);
        if (found.length > 0) user = found[0];
      } catch {
        user = this.memoryUsers.find((u) => u.email === cleanEmail);
      }
    } else {
      user = this.memoryUsers.find((u) => u.email === cleanEmail);
    }

    if (!user) {
      throw ApiError.unauthorized('Invalid email or password');
    }

    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) {
      throw ApiError.unauthorized('Invalid email or password');
    }

    const token = generateToken({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    });

    const { passwordHash: _, ...userSafe } = user;
    return { user: userSafe, token };
  }

  async getProfile(userId) {
    let user = null;
    if (db) {
      try {
        const found = await db.select().from(users).where(eq(users.id, userId)).limit(1);
        if (found.length > 0) user = found[0];
      } catch {
        user = this.memoryUsers.find((u) => u.id === userId);
      }
    } else {
      user = this.memoryUsers.find((u) => u.id === userId);
    }

    if (!user) {
      throw ApiError.notFound('User profile not found');
    }

    const { passwordHash: _, ...userSafe } = user;
    return userSafe;
  }
}

export const authService = new AuthService();

