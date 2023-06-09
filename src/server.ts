import expess, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import path from 'path';
import 'dotenv/config';
import { router } from './routes';


const app = expess();
app.use(expess.json());
app.use(cors());
const PORT = 3333
app.use(router);

app.use(
    '/files',
    expess.static(path.resolve(__dirname, '..', 'tmp'))
)

app.use((err: Error, req: Request, res: Response, next: NextFunction)=> {
    if(err instanceof Error) {
        return res.status(400).json({
            error: err.message
        })
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    })

})

router.get('/test', (req: Request, res: Response) => {
    return res.json({ ok: 'Server is runing...🚀'})
});


app.listen(process.env.PORT || PORT, () => console.log(`Server is runing...🚀`));