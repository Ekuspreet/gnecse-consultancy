const request = require('supertest');
const express = require('express');
const adminRouter = require('../../controllers/web/admin.controller');
const authMiddleware = require('../../middleware/user.auth');

// Mock authMiddleware to bypass authentication
jest.mock('../../middleware/user.auth', () => jest.fn(() => (req, res, next) => next()));

const app = express();
app.use(express.json());
app.use('/admin', adminRouter);

describe('Admin Controller', () => {
    it('should render mentors page', async () => {
        const res = {
            render: jest.fn(),
        };
        // Mock mentors data
        const mentors = [{ name: 'Mentor 1' }];
        await adminRouter.handle({ method: 'GET', url: '/mentors' }, res);
        expect(res.render).toHaveBeenCalledWith('admin/mentors', {
            title: 'MENTORS',
            mentors: mentors,
        });
    });
});
