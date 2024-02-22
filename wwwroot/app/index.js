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
export class Speaker {
    Say(text, gender = VoiceGender.Female) {
        return new Promise((resolve, reject) => {
            const promptId = Guid();
            if (this.Done) {
                let previous = this.Done;
                this.Done = (id) => {
                    if (id === promptId) {
                        resolve();
                    }
                    else {
                        previous(id);
                    }
                };
            }
            else {
                this.Done = (id) => {
                    if (id === promptId) {
                        resolve();
                    }
                };
            }
            globalThis.serverSpeaker.say(text, promptId, gender);
        });
    }
}
export var VoiceGender;
(function (VoiceGender) {
    VoiceGender[VoiceGender["NotSet"] = 0] = "NotSet";
    VoiceGender[VoiceGender["Male"] = 1] = "Male";
    VoiceGender[VoiceGender["Female"] = 2] = "Female";
    VoiceGender[VoiceGender["Neutral"] = 3] = "Neutral";
})(VoiceGender || (VoiceGender = {}));
export function test() {
    return __awaiter(this, void 0, void 0, function* () {
        let files = new Array();
        for (let i = 1; i < 218; i++) {
            let name = `onePiece_Page${i}.png`;
            let fullName = "comic/" + name;
            files.push({ name: name, extension: ".png", fullName: fullName });
        }
        globalThis.Speaker = new Speaker();
        const player = new XCBZPlayer("viewPort", files);
        globalThis.player = player;
        globalThis.Rect = Rect;
    });
}
export class Point {
    constructor(X, Y) {
        this.X = X;
        this.Y = Y;
    }
}
export class Rect {
    constructor(X, Y, Width, Height) {
        this.X = X;
        this.Y = Y;
        this.Width = Width;
        this.Height = Height;
    }
    get MigPoint() {
        return new Point(this.X + this.Width, this.Y + this.Height);
    }
}
export class XCBZPlayer {
    Load(path, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const prelImg = document.getElementById(id);
            if (prelImg) {
                return prelImg;
            }
            const result = document.createElement("img");
            result.src = path;
            result.id = id;
            result.style.display = "none";
            document.body.appendChild(result);
            AwaitAnimationFrame();
            return result;
        });
    }
    LoadPage(index) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.GetImage(index);
            // return await this.Load(this.files[index].fullName, `page_${index}`);
        });
    }
    GetImage(index) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.imgCache[index]) {
                return this.imgCache[index];
            }
            var result = yield this.loadImage(this.files[index].fullName);
            this.imgCache[index] = result;
            return result;
        });
    }
    DrawImg(img, source, target) {
        this.context.drawImage(img, source.X, source.Y, source.Height, source.Width, target.X, target.Y, target.Width, target.Height);
    }
    Draw(index, source, target) {
        return __awaiter(this, void 0, void 0, function* () {
            var image = yield this.LoadPage(index);
            this.context.drawImage(image, source.X, source.Y, source.Width, source.Height, target.X, target.Y, target.Width, target.Height);
        });
    }
    constructor(canvasId, files) {
        this.canvasId = canvasId;
        this.files = files;
        this.imgCache = [];
        const viewPort = document.getElementById(canvasId);
        this.width = viewPort.width;
        this.height = viewPort.height;
        this.context = viewPort.getContext("2d");
        //this.files.forEach(n => n.name)
    }
    loadImage(url) {
        return fetch(url).then(reponse => reponse.blob()).then(blob => createImageBitmap(blob));
    }
    Play() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.Draw(4, new Rect(440, 200, 640, 540), new Rect(0, 0, 640 / 3, 540 / 3));
            yield globalThis.Speaker.Say("Gold Roger, The king of the pirates, had achieved  it all.");
            yield globalThis.Speaker.Say("Wealth, fame and power had all been his.");
            yield globalThis.Speaker.Say("Not Surprisingly, The Final word he spoke before they lopped of his head inspired adventurers throughout the world to sail the seas.");
            yield this.Draw(4, new Rect(0, 830, 1500, 1560), new Rect(0, 0, 1500 / 5, 1560 / 5));
            yield globalThis.Speaker.Say("My Tresure?", VoiceGender.Male);
            yield globalThis.Speaker.Say("Why, It's right where i left it...", VoiceGender.Male);
            yield globalThis.Speaker.Say("It's yours if you can find it.", VoiceGender.Male);
            yield globalThis.Speaker.Say("But you'll have to search the whole world!", VoiceGender.Male);
            yield globalThis.Speaker.Say("Shunk!");
            yield globalThis.Speaker.Say("The world...");
            yield globalThis.Speaker.Say("...is about to witness a great era of piracy!");
        });
    }
}
//# sourceMappingURL=index.js.map