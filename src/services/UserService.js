import { UserRepository } from '../repositories/UserRepository.js';
import { sendPasswordResetEmail } from '../config/mailer.js';
import jwt from 'jsonwebtoken';

export class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async registerUser(userData) {
    try {
      const user = await this.userRepository.createUser(userData);
      
      // Generar JWT para el usuario registrado
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET || 'secretJWT',
        { expiresIn: '1h' }
      );

      return { user, token };
    } catch (error) {
      throw error;
    }
  }

  async loginUser(email, password) {
    try {
      const user = await this.userRepository.authenticateUser(email, password);
      
      // Generar JWT
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET || 'secretJWT',
        { expiresIn: '1h' }
      );

      return { user, token };
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser(userId) {
    try {
      return await this.userRepository.findUserById(userId);
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers() {
    try {
      return await this.userRepository.getAllUsers();
    } catch (error) {
      throw error;
    }
  }

  async updateUser(userId, updateData) {
    try {
      return await this.userRepository.updateUser(userId, updateData);
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(userId) {
    try {
      return await this.userRepository.deleteUser(userId);
    } catch (error) {
      throw error;
    }
  }

  async requestPasswordReset(email) {
    try {
      const { user, resetToken } = await this.userRepository.resetPassword(email);
      
      // Enviar email
      const emailSent = await sendPasswordResetEmail(email, resetToken);
      
      if (!emailSent) {
        throw new Error('Error al enviar el email de recuperación');
      }

      return { message: 'Email de recuperación enviado exitosamente' };
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(token, newPassword) {
    try {
      const user = await this.userRepository.updatePasswordWithToken(token, newPassword);
      return { message: 'Contraseña actualizada exitosamente', user };
    } catch (error) {
      throw error;
    }
  }
} 