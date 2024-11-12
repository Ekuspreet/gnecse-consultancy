const request = require('supertest');
const express = require('express');
const alumniRouter = require('../../controllers/web/alumni.controller');
const authMiddleware = require('../../middleware/user.auth');

jest.mock('../../middleware/user.auth', () => jest.fn(() => (req, res, next) => next()));

const app = express();
app.use(express.json());
app.use('/alumni', alumniRouter);

describe('Alumni Controller', () => {
    it('should render profile page', async () => {
        const res = {
            render: jest.fn(),
        };
        await alumniRouter.handle({ method: 'GET', url: '/profile' }, res);
        expect(res.render).toHaveBeenCalledWith('alumni/index', {
            title: 'PROFILE',
            layout: 'layouts/alumni',
        });
    });
});
