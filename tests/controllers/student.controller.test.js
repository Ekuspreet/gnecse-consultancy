const request = require('supertest');
const express = require('express');
const studentRouter = require('../../controllers/web/student.controller');
const authMiddleware = require('../../middleware/user.auth');

// Mock authMiddleware to bypass authentication
jest.mock('../../middleware/user.auth', () => jest.fn(() => (req, res, next) => next()));

const app = express();
app.use(express.json());
app.use('/student', studentRouter);

describe('Student Controller', () => {
    it('should render profile page', async () => {
        const res = {
            render: jest.fn(),
        };
        // Mock the user object
        const user = { name: 'Test Student' };
        await studentRouter.handle({ method: 'GET', url: '/profile' }, res, user);
        expect(res.render).toHaveBeenCalledWith('student/index', {
            title: 'PROFILE',
            layout: 'layouts/student',
            user: user, // passing mocked user
        });
    });

    it('should render friends page', async () => {
        const res = {
            render: jest.fn(),
        };
        const user = { name: 'Test Student' };
        await studentRouter.handle({ method: 'GET', url: '/friends' }, res, user);
        expect(res.render).toHaveBeenCalledWith('student/friends', {
            title: 'FRIENDS',
            layout: 'layouts/student',
            user: user,
        });
    });

    it('should render job assigned page', async () => {
        const res = {
            render: jest.fn(),
        };
        const user = { name: 'Test Student' };
        await studentRouter.handle({ method: 'GET', url: '/job-assigned' }, res, user);
        expect(res.render).toHaveBeenCalledWith('student/job-assigned', {
            title: 'JOB ASSIGNED',
            layout: 'layouts/student',
            user: user,
        });
    });
});
