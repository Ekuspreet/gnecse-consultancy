const request = require('supertest');
const express = require('express');
const authRouter = require('../../controllers/web/auth.controller');
const authMiddleware = require('../../middleware/user.auth');

// Mock authMiddleware to bypass authentication
jest.mock('../../middleware/user.auth', () => jest.fn(() => (req, res, next) => next()));

const app = express();
app.use(express.json());
app.use('/auth', authRouter);

describe('Auth Controller', () => {
    it('should render login page for student', async () => {
        const res = {
            render: jest.fn(),
        };
        await authRouter.handle({ method: 'GET', url: '/login/student' }, res);
        expect(res.render).toHaveBeenCalledWith('auth/login/student', {
            layout: 'layouts/auth',
            role: 'student',
            title: 'STUDENT LOGIN',
        });
    });

    it('should render signup page for student', async () => {
        const res = {
            render: jest.fn(),
        };
        await authRouter.handle({ method: 'GET', url: '/signup/student' }, res);
        expect(res.render).toHaveBeenCalledWith('auth/signup/student', {
            layout: 'layouts/auth',
            role: 'student',
            title: 'STUDENT SIGNUP',
        });
    });
});
