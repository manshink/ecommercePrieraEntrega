import { UserService } from '../services/UserService.js';

export class UserController {
  constructor() {
    this.userService = new UserService();
  }

  async register(req, res) {
    try {
      const { user, token } = await this.userService.registerUser(req.body);
      
      res.status(201).json({
        message: 'Usuario registrado exitosamente',
        user,
        token
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const { user, token } = await this.userService.loginUser(email, password);
      
      res.json({ user, token });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }

  async getCurrentUser(req, res) {
    try {
      const user = await this.userService.getCurrentUser(req.user.id);
      res.json({ user });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUserById(req, res) {
    try {
      const user = await this.userService.getCurrentUser(req.params.id);
      res.json(user);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async updateUser(req, res) {
    try {
      const user = await this.userService.updateUser(req.params.id, req.body);
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteUser(req, res) {
    try {
      const result = await this.userService.deleteUser(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async requestPasswordReset(req, res) {
    try {
      const { email } = req.body;
      const result = await this.userService.requestPasswordReset(email);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async resetPassword(req, res) {
    try {
      const { token, newPassword } = req.body;
      const result = await this.userService.resetPassword(token, newPassword);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
} 