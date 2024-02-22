var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function DocReady() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = new Promise((resolve, reject) => {
            document.addEventListener("readystatechange", () => {
                if (document.readyState === "complete") {
                    resolve();
                }
            });
        });
        return result;
    });
}
export function AwaitAnimationFrame() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = new Promise((resolve, reject) => {
            requestAnimationFrame(() => {
                resolve();
            });
        });
        return result;
    });
}
export function Guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
        .replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
export class EventPipe {
    constructor() {
        this.subscribers = new Map;
    }
    Subscribe(eventName, method) {
        if (!this.subscribers.has(eventName)) {
            this.subscribers.set(eventName, []);
        }
        this.subscribers.get(eventName).push(method);
    }
    UnSubscribe(eventName, method) {
        if (!this.subscribers.has(eventName)) {
            console.warn("event not found");
            return;
        }
        var evt = this.subscribers.get(eventName);
        const index = evt.indexOf(method);
        evt.splice(index, 1, method);
    }
    Send(eventName, event) {
        if (!this.subscribers.has(eventName)) {
            console.warn("event not found");
            return;
        }
        var evt = this.subscribers.get(eventName);
        evt.forEach(n => n(event));
    }
}
export class System {
    static get Menu() {
        return globalThis.Menu;
    }
    static get EventPipe() {
        if (!globalThis.EventPipe) {
            globalThis.EventPipe = new EventPipe();
        }
        return globalThis.EventPipe;
    }
}
export function App() {
    return __awaiter(this, void 0, void 0, function* () {
        yield DocReady();
        System.Menu.populatebase();
        System.EventPipe.Subscribe("menuEvent", (event) => {
            alert(event.message);
        });
        System.Menu.addItem("test", { message: "hillo!" });
        const canvas = document.getElementById("viewPort");
        const context = canvas.getContext("2d");
        const rnd = () => Math.round(Math.random() * 255);
        for (let y = 0; y < canvas.height; y++) {
            for (let x = 0; x < canvas.width; x++) {
                const color = `rgb(${rnd()}, ${rnd()}, ${rnd()})`;
                context.fillStyle = color;
                context.fillRect(x, y, 1, 1);
            }
        }
    });
}
//# sourceMappingURL=app.js.map