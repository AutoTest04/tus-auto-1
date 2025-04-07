import * as go from 'gojs';

declare global {
    class Robot {
        readonly diagram: go.Diagram;
        initializeEvent(e: go.InputEvent, props?: go.ObjectData): void;
        mouseDown(x: number, y: number, time?: number, eventprops?: go.ObjectData): void;
        mouseMove(x: number, y: number, time?: number, eventprops?: go.ObjectData): void;
        mouseUp(x: number, y: number, time?: number, eventprops?: go.ObjectData): void;
        mouseWheel(delta: number, time?: number, eventprops?: go.ObjectData): void;
        keyDown(keyorcode: string | number, time?: number, eventprops?: go.ObjectData): void;
        keyUp(keyorcode: string | number, time?: number, eventprops?: go.ObjectData): void;
    };
}