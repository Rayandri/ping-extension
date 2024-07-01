import * as vscode from 'vscode';
import { checkAchievements, loadAchievements, initStatusBarItem, showAchievements, resetAchievements, startSession } from './achievement';

export function activate(context: vscode.ExtensionContext) 
{
    console.log('Votre extension "my-vscode-extension" est maintenant active!');

    const isFirstTime = context.globalState.get('isFirstTime', true);
    if (isFirstTime) {
        vscode.window.showInformationMessage('Bienvenue à bord !');
        context.globalState.update('isFirstTime', false);
    }

    initStatusBarItem(context);
    loadAchievements(context);
    startSession(context);

    vscode.workspace.onDidChangeTextDocument(event => {
        const linesWritten = event.document.lineCount;
        checkAchievements(context, linesWritten);
    });

    /*const gitExtension = vscode.extensions.getExtension('vscode.git')?.exports;
    const api = gitExtension?.getAPI(1);

    if (api) {
        api.onDidRunGitCommand((event: { command: string; }) => {
            if (event.command === 'commit') {
                checkAchievements(context, undefined, 'commit');
            } else if (event.command === 'pull') {
                checkAchievements(context, undefined, 'pull');
            } else if (event.command === 'push') {
                checkAchievements(context, undefined, 'push');
            } else if (event.command === 'tag') {
                checkAchievements(context, undefined, 'tag');
            }
        });
    }*/

    let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
        vscode.window.showInformationMessage('Hello World from your VSCode Extension!');
    });

    let showAchievementsCommand = vscode.commands.registerCommand('extension.showAchievements', () => {
        showAchievements();
    });

    let resetAchievementsCommand = vscode.commands.registerCommand('extension.resetAchievements', () => {
        resetAchievements(context);
    });

    // Add a button to the activity bar
    const resetButton = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    resetButton.text = '$(trash) Reset Achievements';
    resetButton.command = 'extension.resetAchievements';
    resetButton.tooltip = 'Reset Achievements and Experience';
    resetButton.show();
    context.subscriptions.push(resetButton);

    context.subscriptions.push(disposable);
    context.subscriptions.push(showAchievementsCommand);
    context.subscriptions.push(resetAchievementsCommand);
}

export function deactivate(context: vscode.ExtensionContext) 
{
    
}
