import * as vscode from 'vscode';

// Простая функция для получения времени
function getCurrentTime(): string {
    const now = new Date();
    return now.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit', 
        second: '2-digit',
        hour12: false
    });
}

// Простая функция для получения даты
function getCurrentDate(): string {
    const now = new Date();
    return now.toLocaleDateString('ru-RU', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

export function activate(context: vscode.ExtensionContext) {
    console.log('Current Time Widget started!');

    // Создаем элемент статус-бара
    const statusBarItem = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Right,
        1000
    );

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
    const showDateCommand = vscode.commands.registerCommand(
        'current-time-widget.showDate',
        () => {
            const date = getCurrentDate();
            vscode.window.showInformationMessage(`Сегодня: ${date}`);
        }
    );

    // Назначаем команду на клик
    statusBarItem.command = 'current-time-widget.showDate';

    // Очистка ресурсов
    context.subscriptions.push(
        statusBarItem,
        showDateCommand,
        {
            dispose: () => {
                clearInterval(timer);
            }
        }
    );
}

export function deactivate() {
    console.log('Current Time Widget stopped!');
}
