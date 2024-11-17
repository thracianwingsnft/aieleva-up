import { Server as HttpServer } from 'http';
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import type { Notification } from '@prisma/client';

interface ServerToClientEvents {
  notification: (notification: Notification) => void;
}

interface ClientToServerEvents {
  subscribe: (token: string) => void;
}

export function setupWebSocketServer(httpServer: HttpServer) {
  const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ['GET', 'POST']
    }
  });

  const userSockets = new Map<string, string>();

  io.on('connection', (socket) => {
    socket.on('subscribe', async (token) => {
      try {
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET || 'your-secret-key'
        ) as { userId: string };

        userSockets.set(decoded.userId, socket.id);

        socket.on('disconnect', () => {
          userSockets.delete(decoded.userId);
        });
      } catch (error) {
        console.error('Invalid token:', error);
      }
    });
  });

  return {
    io,
    notifyUser: (userId: string, notification: Notification) => {
      const socketId = userSockets.get(userId);
      if (socketId) {
        io.to(socketId).emit('notification', notification);
      }
    }
  };
}