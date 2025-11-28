"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(require("vscode"));
// Простая функция для получения времени
function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
}
// Простая функция для получения даты
function getCurrentDate() {
    const now = new Date();
    return now.toLocaleDateString('ru-RU', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
function activate(context) {
    console.log('Current Time Widget started!');
    // Создаем элемент статус-бара
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 1000);
    // Функция обновления времени
    const updateTime = () => {
        const time = getCurrentTime();
        statusBarItem.text = `$(clock) ${time}`;
        statusBarItem.tooltip = 'Текущее время. Кликните для даты.';
    };
    // Инициализация
    updateTime();
    statusBarItem.show();
    // Таймер обновления
    const timer = setInterval(updateTime, 1000);
    // Команда для показа даты
    const showDateCommand = vscode.commands.registerCommand('current-time-widget.showDate', () => {
        const date = getCurrentDate();
        vscode.window.showInformationMessage(`Сегодня: ${date}`);
    });
    // Назначаем команду на клик
    statusBarItem.command = 'current-time-widget.showDate';
    // Очистка ресурсов
    context.subscriptions.push(statusBarItem, showDateCommand, {
        dispose: () => {
            clearInterval(timer);
        }
    });
}
exports.activate = activate;
function deactivate() {
    console.log('Current Time Widget stopped!');
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map