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
exports.G_API = void 0;
const axios_1 = __importDefault(require("axios"));
const types_1 = require("./types");
const utils_1 = require("./utils");
class G_API {
    constructor(GITHUB_TOKEN) {
        this.event = (EVENT_NAME_1, data_1, ...args_1) => __awaiter(this, [EVENT_NAME_1, data_1, ...args_1], void 0, function* (EVENT_NAME, data, EVENT_MODE = "CREATE", IMG = { img: "", num: 0 }) {
            const API_URL = `/${types_1.REPO_OWNER}/${types_1.REPO_NAME}/contents/events/${EVENT_NAME}/info.json`;
            const MAIN_URL = `/${types_1.REPO_OWNER}/${types_1.REPO_NAME}/contents/info.json`;
            console.log(this.API, API_URL, MAIN_URL, EVENT_MODE, data, IMG);
            if (EVENT_MODE === "CREATE") {
                let json = JSON.stringify(data, null, 2);
                const r = yield fetch(`https://github.com/${types_1.REPO_OWNER}/${types_1.REPO_NAME}/blob/master/info.json`);
                const D = yield r.json();
                let mainData = (0, utils_1.PARSE)(D.payload.blob.rawLines);
                let newMainData = {};
                newMainData[data.id] = {
                    name: data.title,
                    type: data.details.type,
                };
                if (data.details.type !== "ONLINE EVENT")
                    newMainData[data.id].date = data.day === "DAY1" ? "29/02/2024" : (data.day === "DAY2" ? "01/03/2024" : "02/03/2024");
                mainData = Object.assign(Object.assign({}, mainData), newMainData);
                try {
                    const createdFileContent = {
                        message: `ADMIN: CREATING EVENT - ${data.title}`,
                        content: Buffer.from(json).toString('base64'),
                    };
                    yield this.API.put(API_URL, Object.assign(Object.assign({}, createdFileContent), { committer: {
                            name: 'TK EVENTS: ' + data.title + ' coordinator',
                            email: 'cittakshashila@github.com'
                        } }), {
                        headers: {
                            'X-GitHub-Api-Version': '2022-11-28'
                        }
                    });
                }
                catch (err) {
                    return { success: false, message: `Failed to create event` };
                }
                let resp;
                try {
                    resp = yield this.API.get(MAIN_URL);
                }
                catch (err) {
                    return { success: false, message: `Failed to create event` };
                }
                try {
                    const createdMainFileContent = Object.assign(Object.assign({}, resp.data), { message: `ADMIN: CREATING EVENT - ${data.title}`, content: Buffer.from(JSON.stringify(mainData, null, 2)).toString('base64') });
                    yield this.API.put(MAIN_URL, Object.assign(Object.assign({}, createdMainFileContent), { committer: {
                            name: 'TK EVENTS: ' + data.title + ' coordinator',
                            email: 'cittakshashila@github.com'
                        } }), {
                        headers: {
                            'X-GitHub-Api-Version': '2022-11-28'
                        }
                    });
                }
                catch (err) {
                    return { success: false, message: `Failed to create event` };
                }
                return { success: true, message: `Event ${data.title} created successfully` };
            }
            if (EVENT_MODE === "UPDATE") {
                let json = JSON.stringify(data, null, 2);
                const r = yield fetch(`https://github.com/${types_1.REPO_OWNER}/${types_1.REPO_NAME}/blob/master/info.json`);
                const D = yield r.json();
                let mainData = (0, utils_1.PARSE)(D.payload.blob.rawLines);
                mainData[data.id].name = data.title;
                mainData[data.id].type = data.details.type;
                mainData[data.id].date = data.day === "DAY1" ? "29/02/2024" : (data.day === "DAY2" ? "01/03/2024" : "02/03/2024");
                let resp;
                try {
                    resp = yield this.API.get(API_URL);
                }
                catch (err) {
                    return { success: false, message: `Failed to update event - 1 - ` + err };
                }
                try {
                    const updatedFileContent = Object.assign(Object.assign({}, resp.data), { message: `ADMIN: UPDATING EVENT - ${data.title}`, content: Buffer.from(json).toString('base64') });
                    yield this.API.put(API_URL, Object.assign(Object.assign({}, updatedFileContent), { committer: {
                            name: 'TK EVENTS: ' + data.title + ' coordinator',
                            email: 'cittakshashila@github.com'
                        } }), {
                        headers: {
                            'X-GitHub-Api-Version': '2022-11-28'
                        }
                    });
                }
                catch (err) {
                    return { success: false, message: `Failed to update event - 2 - ` + err };
                }
                try {
                    resp = yield this.API.get(MAIN_URL);
                }
                catch (err) {
                    return { success: false, message: `Failed to update event - 3 - ` + err };
                }
                try {
                    const createdMainFileContent = Object.assign(Object.assign({}, resp.data), { message: `ADMIN: UPDATING EVENT - ${data.title}`, content: Buffer.from(JSON.stringify(mainData, null, 2)).toString('base64') });
                    yield this.API.put(MAIN_URL, Object.assign(Object.assign({}, createdMainFileContent), { committer: {
                            name: 'TK EVENTS: ' + data.title + ' coordinator',
                            email: 'cittakshashila@github.com'
                        } }), {
                        headers: {
                            'X-GitHub-Api-Version': '2022-11-28'
                        }
                    });
                }
                catch (err) {
                    return { success: false, message: `Failed to update event - 4 - ` + err };
                }
                return { success: true, message: `Event ${data.title} updated successfully` };
            }
            if (EVENT_MODE === "CREATE IMAGE") {
                const json = IMG.img;
                try {
                    const createdFileContent = {
                        message: `ADMIN: CREATING IMAGE`,
                        content: json,
                    };
                    yield this.API.put(`/${types_1.REPO_OWNER}/${types_1.REPO_NAME}/contents/events/${EVENT_NAME}/assets/${IMG.num}.png`, Object.assign(Object.assign({}, createdFileContent), { committer: {
                            name: 'TK EVENTS: ' + 'coordinator',
                            email: 'cittakshashila@github.com'
                        } }), {
                        headers: {
                            'X-GitHub-Api-Version': '2022-11-28'
                        }
                    });
                }
                catch (err) {
                    return { success: false, message: `Failed to create image` };
                }
                return { success: true, message: `Image created successfully` };
            }
            return { success: false, message: `Failed` };
        });
        this.API = axios_1.default.create({
            baseURL: 'https://api.github.com/repos',
            timeout: 1000,
            headers: {
                Authorization: `Bearer ${GITHUB_TOKEN}`,
                contentType: 'application/json',
            }
        });
    }
}
exports.G_API = G_API;
;
