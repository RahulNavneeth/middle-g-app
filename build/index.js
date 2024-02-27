"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const API_1 = require("./API");
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const types_1 = require("./types");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)(), body_parser_1.default.json());
const TOKEN_SECRET = process.env.TOKEN_SECRET || "";
const CALL = new API_1.G_API(process.env.G_TOKEN || "");
app.get('/', (_, res) => {
    res.send(`HEY THERE, HEAD TO www.cittakshashila.in :) [META: ${types_1.REPO_OWNER}/${types_1.REPO_NAME}]`);
});
app.put('/PUT', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    console.log(TOKEN_SECRET, process.env.G_TOKEN);
    const { token } = data;
    try {
        jsonwebtoken_1.default.verify(token, TOKEN_SECRET);
    }
    catch (err) {
        return res.status(403).json({ message: "Forbidden" });
    }
    try {
        const d = yield CALL.event(data.event_name, data.event_data, data.type, { img: data.img, num: data.num });
        return res.json(d);
    }
    catch (e) {
        return res.json(e);
    }
}));
const PORT = process.env.PORT || 4209;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
