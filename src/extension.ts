import * as vscode from 'vscode';
import { checkAchievements, loadAchievements, initStatusBarItem, showAchievements, resetAchievements } from './achievement';

export function activate(context: vscode.ExtensionContext) {
    console.log('Votre extension "my-vscode-extension" est maintenant active!');

    initStatusBarItem(context);
    loadAchievements(context);

    vscode.workspace.onDidChangeTextDocument(event => {
        const linesWritten = event.document.lineCount;
        checkAchievements(linesWritten, context);
    });

    let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
        vscode.window.showInformationMessage('Hello World from your VSCode Extension!');
    });

    let showAchievementsCommand = vscode.commands.registerCommand('extension.showAchievements', () => {
        showAchievements();
    });

    let resetAchievementsCommand = vscode.commands.registerCommand('extension.resetAchievements', () => {
        resetAchievements(context);
    });

    context.subscriptions.push(disposable);
    context.subscriptions.push(showAchievementsCommand);
    context.subscriptions.push(resetAchievementsCommand);
}

export function deactivate() {}
