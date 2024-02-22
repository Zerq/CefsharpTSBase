export async function DocReady(): Promise<void> {
    const result = new Promise<void>((resolve, reject) => {
        document.addEventListener("readystatechange", () => {
            if (document.readyState === "complete") {

                    resolve();
  
            }
        });
    });
    return result;
}

export async function AwaitAnimationFrame(): Promise<void> {
    const result = new Promise<void>((resolve, reject) => {
        requestAnimationFrame(() => {
            resolve();
        });
    });
    return result;
}

export function Guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
        .replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
}

declare interface MenuLike {
    populatebase(): void;
    addItem(item: string, eventValue: object);
}



export class EventPipe {
    private subscribers = new Map<string, Array<(event: object) => void>>;
    public Subscribe(eventName: string, method: (event: object) => void) {
        if (!this.subscribers.has(eventName)) {
            this.subscribers.set(eventName, []);
        }

        this.subscribers.get(eventName).push(method);
    }
    public UnSubscribe(eventName: string, method: (event: object) => void) {
        if (!this.subscribers.has(eventName)) {
            console.warn("event not found");
            return;
        }

        var evt = this.subscribers.get(eventName);
        const index = evt.indexOf(method);
        evt.splice(index, 1, method);
    }
    public Send(eventName: string, event: object) {
        if (!this.subscribers.has(eventName)) {
            console.warn("event not found");
            return;
        }

        var evt = this.subscribers.get(eventName);
        evt.forEach(n => n(event));
    }
}


export class System {
    public static get Menu() {
        return <MenuLike>(<any>globalThis).Menu;
    }
    public static get EventPipe() {
        if (!<EventPipe>(<any>globalThis).EventPipe) {
            (<any>globalThis).EventPipe = new EventPipe();
        }
            return <EventPipe>(<any>globalThis).EventPipe;
    }

}


export async function App() {
    await DocReady()
    System.Menu.populatebase();
    System.EventPipe.Subscribe("menuEvent", (event: object) => {
        alert((<{message:string}>event).message);
    });
    System.Menu.addItem("test", { message: "hillo!" });

    const canvas = <HTMLCanvasElement>document.getElementById("viewPort");
    const context = canvas.getContext("2d");

    const rnd = () => Math.round(Math.random() * 255);

    for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
            const color = `rgb(${rnd()}, ${rnd()}, ${rnd()})`;

            context.fillStyle = color;
            context.fillRect(x, y, 1, 1);
         
        }
    } 
} 