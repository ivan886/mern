import { Router } from 'express';

const router = Router();

router.get('/login', (req, res) => {
        return res.send('login');
});


router.get('/register', (req, res) => {
        return res.send('register');
});

export default router;