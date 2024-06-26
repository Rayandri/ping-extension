import * as vscode from 'vscode';

let achievements = [
    { name: "First Line!", lines: 1, achieved: false, icon: "🌟" },
    { name: "100 Lines", lines: 100, achieved: false, icon: "🏆" },
    { name: "1000 Lines", lines: 1000, achieved: false, icon: "🎉" }
];

export function checkAchievements(linesWritten: number, context: vscode.ExtensionContext) {
    for (let achievement of achievements) {
        const achieved = context.globalState.get<boolean>(achievement.name) || false;
        if (!achieved && linesWritten >= achievement.lines) {
            vscode.window.showInformationMessage(`${achievement.icon} Achievement unlocked: ${achievement.name}!`, 'View Achievements', 'Dismiss')
                .then(selection => {
                    if (selection === 'View Achievements') {
                        vscode.commands.executeCommand('workbench.action.openGlobalKeybindings'); // Example command, replace with your own
                    }
                });
            context.globalState.update(achievement.name, true);
            achievement.achieved = true;
        }
    }
}

export function loadAchievements(context: vscode.ExtensionContext) {
    for (let achievement of achievements) {
        achievement.achieved = context.globalState.get<boolean>(achievement.name) || false;
    }
}
