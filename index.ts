import express from 'express';
import jwt from 'jsonwebtoken';
import { G_API } from './API';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import { REPO_NAME, REPO_OWNER } from './types';
dotenv.config();

const app = express();

app.use(cors(), bodyParser.json());

const TOKEN_SECRET = process.env.TOKEN_SECRET || "";

const CALL = new G_API(process.env.G_TOKEN || "");

app.get('/', (_, res) => {
    res.send(`HEY THERE, HEAD TO www.cittakshashila.in :) [META: ${REPO_OWNER}/${REPO_NAME}]`);
})

app.put('/PUT', async (req, res) => {
    const data = req.body;
    console.log(TOKEN_SECRET, process.env.G_TOKEN);
    const { token } = data;
    try {
        jwt.verify(token, TOKEN_SECRET);
    } catch (err) {
        return res.status(403).json({ message: "Forbidden" });
    }
    try {
        const d = await CALL.event(data.event_name, data.event_data, data.type, { img: data.img, num: data.num });
        return res.json(d);
    } catch (e) {
        return res.json(e);
    }
});

const PORT = process.env.PORT || 4209;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
