import * as vscode from 'vscode';

let achievements = 
[
    { name: "First Line!", lines: 1, achieved: false, icon: "🌟", xp : 10},
    { name: "10 Lines", lines: 10, achieved: false, icon: "🌟", xp : 20},
    { name: "100 Lines", lines: 100, achieved: false, icon: "🌟", xp : 40},
    { name: "1000 Lines", lines: 1000, achieved: false, icon: "🏆", xp : 50},
    { name: "10000 Lines", lines: 10000, achieved: false, icon: "🏆", xp : 100},
    { name: "100000 Lines", lines: 1000000, achieved: false, icon: "🏆", xp : 1000},
    { name: "1000000 Lines", lines: 10000000, achieved: false, icon: "🎉", xp : 10000},
    { name: "First Commit", action: "commit", achieved: false, xp: 20 },
    { name: "First Pull", action: "pull", achieved: false, xp: 20 },
    { name: "First Push", action: "push", achieved: false, xp: 20 },
    { name: "First Tag", action: "tag", achieved: false, xp: 20 }
];

let statusBarItem: vscode.StatusBarItem;
let experienceBarItem: vscode.StatusBarItem;
let resetButton: vscode.StatusBarItem;
let totalExperience: number = 0;
const experienceKey = 'userExperience';

export function checkAchievements(context: vscode.ExtensionContext, linesWritten?: number, action?: string) {
    for (let achievement of achievements) {
        const achieved = context.globalState.get<boolean>(achievement.name) || false;
        if (!achieved) {
            if (achievement.lines !== undefined && linesWritten !== undefined && linesWritten >= achievement.lines) {
                unlockAchievement(achievement, context);
            } else if (achievement.action !== undefined && action !== undefined && action === achievement.action) {
                unlockAchievement(achievement, context);
            }
        }
    }
}

function unlockAchievement(achievement: any, context: vscode.ExtensionContext) {
    const message = `Achievement unlocked: ${achievement.name} ${achievement.icon}`;
    const buttons = [{ title: "View Achievements" }];
    
    vscode.window.showInformationMessage(message, ...buttons).then(selection => {
        if (selection && selection.title === "View Achievements") {
            showAchievements();
        }
    });

    context.globalState.update(achievement.name, true);
    achievement.achieved = true;
    totalExperience += achievement.experience;
    context.globalState.update(experienceKey, totalExperience);
    updateStatusBar();
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

    resetButton = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
    resetButton.text = '$(trash) Reset Achievements';
    resetButton.command = 'extension.resetAchievements';
    context.subscriptions.push(resetButton);

    updateStatusBar();
}

function updateStatusBar() {
    const achievedCount = achievements.filter(achievement => achievement.achieved).length;
    statusBarItem.text = `Achievements: ${achievedCount}/${achievements.length}`;
    statusBarItem.show();

    experienceBarItem.text = `XP: ${totalExperience}`;
    experienceBarItem.show();

    resetButton.show();
}

export function showAchievements() {
    const achievedList = achievements.map(ach => `${ach.achieved ? '✔️' : '❌'} ${ach.name} (XP: ${ach.xp})`).join('\n');
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
