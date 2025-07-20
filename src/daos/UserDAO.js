import User from '../models/User.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

export class UserDAO {
  async create(userData) {
    try {
      const user = new User(userData);
      return await user.save();
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  async findById(id) {
    try {
      return await User.findById(id);
    } catch (error) {
      throw new Error(`Error finding user by ID: ${error.message}`);
    }
  }

  async findByEmail(email) {
    try {
      return await User.findOne({ email });
    } catch (error) {
      throw new Error(`Error finding user by email: ${error.message}`);
    }
  }

  async findAll() {
    try {
      return await User.find();
    } catch (error) {
      throw new Error(`Error finding all users: ${error.message}`);
    }
  }

  async update(id, updateData) {
    try {
      return await User.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      return await User.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  }

  async validatePassword(user, password) {
    try {
      return user.isValidPassword(password);
    } catch (error) {
      throw new Error(`Error validating password: ${error.message}`);
    }
  }

  async updatePassword(id, newPassword) {
    try {
      const hashedPassword = bcrypt.hashSync(newPassword, 10);
      return await User.findByIdAndUpdate(id, { password: hashedPassword }, { new: true });
    } catch (error) {
      throw new Error(`Error updating password: ${error.message}`);
    }
  }

  async createPasswordResetToken(email) {
    try {
      const user = await this.findByEmail(email);
      if (!user) {
        throw new Error('User not found');
      }

      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = resetTokenExpiry;
      await user.save();

      return { user, resetToken };
    } catch (error) {
      throw new Error(`Error creating password reset token: ${error.message}`);
    }
  }

  async validateResetToken(token) {
    try {
      return await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
      });
    } catch (error) {
      throw new Error(`Error validating reset token: ${error.message}`);
    }
  }

  async clearResetToken(userId) {
    try {
      return await User.findByIdAndUpdate(userId, {
        resetPasswordToken: undefined,
        resetPasswordExpires: undefined
      });
    } catch (error) {
      throw new Error(`Error clearing reset token: ${error.message}`);
    }
  }
} 