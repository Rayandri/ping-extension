import * as vscode from 'vscode';

let achievements = 
[
    { name: "First Line!", lines: 1, achieved: false, icon: "🌟", xp : 10},
    { name: "10 Lines", lines: 10, achieved: false, icon: "🌟", xp : 20},
    { name: "100 Lines", lines: 100, achieved: false, icon: "🌟", xp : 40},
    { name: "1000 Lines", lines: 1000, achieved: false, icon: "🏆", xp : 50},
    { name: "10000 Lines", lines: 10000, achieved: false, icon: "🏆", xp : 100},
    { name: "100000 Lines", lines: 1000000, achieved: false, icon: "🏆", xp : 1000},
    { name: "1000000 Lines", lines: 10000000, achieved: false, icon: "🎉", xp : 10000}
];

let statusBarItem: vscode.StatusBarItem;
let experienceBarItem: vscode.StatusBarItem;
let totalExperience: number = 0;
const experienceKey = 'userExperience';

export function checkAchievements(linesWritten: number, context: vscode.ExtensionContext) {
    for (let achievement of achievements) {
        const achieved = context.globalState.get<boolean>(achievement.name) || false;
        if (!achieved && linesWritten >= achievement.lines) {
            vscode.window.showInformationMessage(`Achievement unlocked: ${achievement.name}`);
            context.globalState.update(achievement.name, true);
            achievement.achieved = true;
            totalExperience += achievement.xp;
            context.globalState.update(experienceKey, totalExperience);
            updateStatusBar();
        }
    }
}

export function loadAchievements(context: vscode.ExtensionContext) {
    totalExperience = context.globalState.get<number>(experienceKey) || 0;
    for (let achievement of achievements) {
        achievement.achieved = context.globalState.get<boolean>(achievement.name) || false;
    }
    updateStatusBar();
}

export function initStatusBarItem(context: vscode.ExtensionContext) {
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
    statusBarItem.command = 'extension.showAchievements';
    context.subscriptions.push(statusBarItem);

    experienceBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
    context.subscriptions.push(experienceBarItem);

    updateStatusBar();
}

function updateStatusBar() {
    const achievedCount = achievements.filter(achievement => achievement.achieved).length;
    statusBarItem.text = `Achievements: ${achievedCount}/${achievements.length}`;
    statusBarItem.show();

    experienceBarItem.text = `XP: ${totalExperience}`;
    experienceBarItem.show();
}

export function showAchievements() {
    const achievedList = achievements.map(ach => `${ach.achieved ? '✔️' : '❌'} ${ach.name}`).join('\n');
    vscode.window.showInformationMessage(achievedList, { modal: true });
}

export function resetAchievements(context: vscode.ExtensionContext) {
    totalExperience = 0;
    context.globalState.update(experienceKey, totalExperience);

    for (let achievement of achievements) {
        achievement.achieved = false;
        context.globalState.update(achievement.name, false);
    }

    updateStatusBar();
    vscode.window.showInformationMessage('Achievements and experience have been reset.');
}
