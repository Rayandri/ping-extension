import * as vscode from 'vscode';

let achievements = [
    { name: "First Line!", lines: 1, achieved: false },
    { name: "100 Lines", lines: 100, achieved: false },
    { name: "1000 Lines", lines: 1000, achieved: false }
];

export function checkAchievements(linesWritten: number, context: vscode.ExtensionContext) 
{
    for (let achievement of achievements) 
    {
        if (!achievement.achieved && linesWritten >= achievement.lines) 
        {
            achievement.achieved = true;
            vscode.window.showInformationMessage(`Achievement unlocked: ${achievement.name}`);
            context.globalState.update(achievement.name, true);
        }
    }
}


export function loadAchievements(context: vscode.ExtensionContext) 
{
    for (let achievement of achievements) 
    {
        achievement.achieved = context.globalState.get<boolean>(achievement.name) || false;
    }
}
