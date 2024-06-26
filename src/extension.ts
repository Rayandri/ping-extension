import * as vscode from 'vscode';
import { checkAchievements } from './achievement';

export function activate(context: vscode.ExtensionContext) {
    console.log('Votre extension "my-vscode-extension" est maintenant active!');

    vscode.workspace.onDidChangeTextDocument(event => {
        const linesWritten = event.document.lineCount;
        checkAchievements(linesWritten, context);
    });

    let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
        vscode.window.showInformationMessage('Hello World from your VSCode Extension!');
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
