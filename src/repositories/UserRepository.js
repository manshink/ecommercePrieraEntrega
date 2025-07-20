import { UserDAO } from '../daos/UserDAO.js';
import { UserDTO } from '../dtos/UserDTO.js';
import bcrypt from 'bcrypt';

export class UserRepository {
  constructor() {
    this.userDAO = new UserDAO();
  }

  async createUser(userData) {
    try {
      // Verificar si el usuario ya existe
      const existingUser = await this.userDAO.findByEmail(userData.email);
      if (existingUser) {
        throw new Error('El email ya está registrado');
      }

      const user = await this.userDAO.create(userData);
      return UserDTO.fromUser(user);
    } catch (error) {
      throw error;
    }
  }

  async findUserById(id) {
    try {
      const user = await this.userDAO.findById(id);
      if (!user) {
        throw new Error('Usuario no encontrado');
      }
      return UserDTO.fromUser(user);
    } catch (error) {
      throw error;
    }
  }

  async findUserByEmail(email) {
    try {
      const user = await this.userDAO.findByEmail(email);
      return user ? UserDTO.fromUser(user) : null;
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers() {
    try {
      const users = await this.userDAO.findAll();
      return UserDTO.fromUserList(users);
    } catch (error) {
      throw error;
    }
  }

  async updateUser(id, updateData) {
    try {
      // Si se está actualizando el email, verificar que no exista
      if (updateData.email) {
        const existingUser = await this.userDAO.findByEmail(updateData.email);
        if (existingUser && existingUser._id.toString() !== id) {
          throw new Error('El email ya está en uso por otro usuario');
        }
      }

      const user = await this.userDAO.update(id, updateData);
      if (!user) {
        throw new Error('Usuario no encontrado');
      }
      return UserDTO.fromUser(user);
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id) {
    try {
      const user = await this.userDAO.delete(id);
      if (!user) {
        throw new Error('Usuario no encontrado');
      }
      return { message: 'Usuario eliminado exitosamente' };
    } catch (error) {
      throw error;
    }
  }

  async authenticateUser(email, password) {
    try {
      const user = await this.userDAO.findByEmail(email);
      if (!user) {
        throw new Error('Credenciales inválidas');
      }

      const isValidPassword = await this.userDAO.validatePassword(user, password);
      if (!isValidPassword) {
        throw new Error('Credenciales inválidas');
      }

      return UserDTO.fromUser(user);
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(email) {
    try {
      const { user, resetToken } = await this.userDAO.createPasswordResetToken(email);
      return { user: UserDTO.fromUser(user), resetToken };
    } catch (error) {
      throw error;
    }
  }

  async validateResetToken(token) {
    try {
      const user = await this.userDAO.validateResetToken(token);
      return user ? UserDTO.fromUser(user) : null;
    } catch (error) {
      throw error;
    }
  }

  async updatePasswordWithToken(token, newPassword) {
    try {
      const user = await this.userDAO.validateResetToken(token);
      if (!user) {
        throw new Error('Token inválido o expirado');
      }

      // Verificar que la nueva contraseña no sea igual a la actual
      const isSamePassword = await this.userDAO.validatePassword(user, newPassword);
      if (isSamePassword) {
        throw new Error('La nueva contraseña no puede ser igual a la actual');
      }

      const updatedUser = await this.userDAO.updatePassword(user._id, newPassword);
      await this.userDAO.clearResetToken(user._id);

      return UserDTO.fromUser(updatedUser);
    } catch (error) {
      throw error;
    }
  }
} 