import * as vscode from "vscode";


let encouragement = [
  { text: "Amazing progress! Keep coding and shine! 💻", icon: "✨" },
  { text: "You're unstoppable! Let's crush more code! 💻", icon: "🔥" },
  { text: "Every line of code brings you closer to greatness! 💻", icon: "🏆" },
  { text: "Coding like a champ! Keep the momentum going! 💻", icon: "🏅" },
  { text: "Innovate, create, and keep coding! 💻", icon: "💡" },
  { text: "Your code is poetry in motion! 💻", icon: "📜" },
  { text: "Stay focused and keep coding! 💻", icon: "🎯" },
  { text: "Keep those fingers coding! 💻", icon: "👨‍💻" },
  { text: "You're building the future, one line at a time! 💻", icon: "🌍" },
  { text: "Persistence is key! Keep coding and conquering! 💻", icon: "🔑" },
  { text: "Your creativity is your superpower! Keep coding! 💻", icon: "🦸‍♀️" },
  { text: "Every bug fixed is a step forward! Keep at it! 💻", icon: "🐞" },
  { text: "You're making magic with your code! 💻", icon: "🪄" },
  { text: "Code like a rockstar! Keep hitting those high notes! 💻", icon: "🎸" },
  { text: "Your dedication is inspiring! Keep coding strong! 💻", icon: "💪" },

  { text: "The only way to do great work is to love what you do. - Steve Jobs 💻", icon: "❤️" },
  { text: "The only way to get started is to quit talking and begin doing. - Walt Disney 💻", icon: "🏁" },
  { text: "Continuous improvement is better than delayed perfection. - Mark Twain 💻", icon: "🔄" },
  { text: "If you are sad, continue coding. It will get better! 💻", icon: "😊" },
  { text: "Success is not the key to happiness. Happiness is the key to success. - Albert Schweitzer 💻", icon: "🔑" },
  { text: "Don't watch the clock; do what it does. Keep going. - Sam Levenson 💻", icon: "⏰" },
  { text: "Hard work beats talent when talent doesn't work hard. - Tim Notke 💻", icon: "💪" },
  { text: "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt 💻", icon: "🌟" },
  { text: "It does not matter how slowly you go as long as you do not stop. - Confucius 💻", icon: "🚶" },
  { text: "The best way to predict the future is to invent it. - Alan Kay 💻", icon: "🔮" },
  
  { text: "I ain't a businessman, I'm a business, man! - Jay-Z 💻", icon: "💼" },
  { text: "I got hustle though, ambition, flow, inside my DNA. - Kendrick Lamar 💻", icon: "🧬" },
  { text: "You can make something of your life, it just depends on your drive. - Eminem 💻", icon: "🚗" },
  { text: "Turn every situation into a win. - DJ Khaled 💻", icon: "🏆" },
  { text: "Success is my only option, failure's not. - Eminem 💻", icon: "🚫" },
  { text: "Sky is the limit. - Notorious B.I.G. 💻", icon: "🌌" },
  { text: "I will not lose, for even in defeat, there's a valuable lesson learned, so it evens up for me. - Jay-Z 💻", icon: "🎓" },
  { text: "Believe in your flyness, conquer your shyness. - Kanye West 💻", icon: "🕊️" },
  { text: "Stay far from timid, only make moves when your heart's in it. - Notorious B.I.G. 💻", icon: "💖" }
];


let achievements = [
  /*LINES */
  { name: "First Line!", lines: 1, achieved: false, icon: "🌟", xp: 10 },
  { name: "10 Lines", lines: 10, achieved: false, icon: "🌟", xp: 20 },
  { name: "Budding writer", lines: 100, achieved: false, icon: "🌟", xp: 40 },
  { name: "Prolific author", lines: 1000, achieved: false, icon: "🏆", xp: 50 },
  { name: "Master coder", lines: 10000, achieved: false, icon: "🏆", xp: 100 },
  {
    name: "Emperor of code",
    lines: 1000000,
    achieved: false,
    icon: "🏆",
    xp: 1000,
  },
  {
    name: "Development god",
    lines: 10000000,
    achieved: false,
    icon: "🎉",
    xp: 10000,
  },

  /*GIT*/
  { name: "First Commit", action: "commit", achieved: false, xp: 20 },
  { name: "10 Commits", commits: 10, achieved: false, icon: "🌟", xp: 50 },
  { name: "100 Commits", commits: 100, achieved: false, icon: "🏆", xp: 100 },
  { name: "1000 Commits", commits: 1000, achieved: false, icon: "🎉", xp: 500 },

  { name: "First Pull", action: "pull", achieved: false, xp: 20 },
  { name: "10 Pulls", pulls: 10, achieved: false, icon: "🌟", xp: 50 },
  { name: "100 Pulls", pulls: 100, achieved: false, icon: "🏆", xp: 100 },
  { name: "1000 Pulls", pulls: 1000, achieved: false, icon: "🎉", xp: 500 },

  { name: "First Push", action: "push", achieved: false, xp: 20 },
  { name: "10 Pushes", pushes: 10, achieved: false, icon: "🌟", xp: 50 },
  { name: "100 Pushes", pushes: 100, achieved: false, icon: "🏆", xp: 100 },
  { name: "1000 Pushes", pushes: 1000, achieved: false, icon: "🎉", xp: 500 },

  { name: "First Tag", action: "tag", achieved: false, xp: 20 },
  { name: "10 Tags", tags: 10, achieved: false, icon: "🌟", xp: 50 },
  { name: "100 Tags", tags: 100, achieved: false, icon: "🏆", xp: 100 },
  { name: "1000 Tags", tags: 1000, achieved: false, icon: "🎉", xp: 500 },

  /*TIMES*/
  { name: "5 secondes spent", time: 5 * 1000, achieved: false, xp: 1 },
  { name: "1 minute spent", time: 60 * 1000, achieved: false, xp: 10 },
  { name: "10 minutes spent", time: 10 * 60 * 1000, achieved: false, xp: 10 },
  { name: "1 hour spent", time: 60 * 60 * 1000, achieved: false, xp: 50 },
  { name: "5 hours spent", time: 5 * 60 * 60 * 1000, achieved: false, xp: 100 },
  {
    name: "10 hours spent",
    time: 10 * 60 * 60 * 1000,
    achieved: false,
    xp: 10,
  },
  {
    name: "100 hours spent",
    time: 100 * 60 * 60 * 1000,
    achieved: false,
    xp: 50,
  },
  {
    name: "1000 hours spent",
    time: 1000 * 60 * 60 * 1000,
    achieved: false,
    xp: 100,
  },

  /*Extensions*/
  {
    name: "5 Extensions Installed",
    extensions: 5,
    achieved: false,
    icon: "🔌",
    xp: 10,
  },
  {
    name: "10 Extensions Installed",
    extensions: 10,
    achieved: false,
    icon: "🔌",
    xp: 20,
  },
  {
    name: "20 Extensions Installed",
    extensions: 20,
    achieved: false,
    icon: "🔌",
    xp: 40,
  },
];

/*TIME*/
let sessionStartTime: number;
let totalTimeSpent: number = 0;
const timeSpentKey = "totalTimeSpent";

export function startSession(context: vscode.ExtensionContext) {
  sessionStartTime = Date.now();
  totalTimeSpent = context.globalState.get<number>(timeSpentKey) || 0;
}

function checkTimeAchievements(
  context: vscode.ExtensionContext,
  totalTimeSpent: number
) {
  for (let achievement of achievements) {
    if (
      achievement.time !== undefined &&
      !achievement.achieved &&
      totalTimeSpent >= achievement.time
    ) {
      unlockAchievement(achievement, context);
    }
  }
}
/* TIME*/

/*Extension*/

export function checkExtensionAchievements(context: vscode.ExtensionContext) {
  const installedExtensions = vscode.extensions.all.filter(
    (ext) => !ext.packageJSON.isBuiltin
  ).length;
  for (let achievement of achievements) {
    if (
      achievement.extensions !== undefined &&
      !achievement.achieved &&
      installedExtensions >= achievement.extensions
    ) {
      unlockAchievement(achievement, context);
    }
  }
}
/*Extension*/

/*GIT COMMIT*/
let totalCommits: number = 0;
const commitsKey = "totalCommits";

export function checkCommitAchievements(context: vscode.ExtensionContext) {
  for (let achievement of achievements) {
    if (
      achievement.commits !== undefined &&
      !achievement.achieved &&
      totalCommits >= achievement.commits
    ) {
      unlockAchievement(achievement, context);
    }
  }
}

export function incrementCommitCount(context: vscode.ExtensionContext) {
  totalCommits = context.globalState.get<number>(commitsKey) || 0;
  totalCommits += 1;
  context.globalState.update(commitsKey, totalCommits);
  checkCommitAchievements(context);
}
/*GIT COMMIT*/

/*GIT PULL*/
let totalPull: number = 0;
const PullKey = "totalPull";

export function checkPullAchievements(context: vscode.ExtensionContext) {
  for (let achievement of achievements) {
    if (
      achievement.pulls !== undefined &&
      !achievement.achieved &&
      totalPull >= achievement.pulls
    ) {
      unlockAchievement(achievement, context);
    }
  }
}

export function incrementPullCount(context: vscode.ExtensionContext) {
  totalPull = context.globalState.get<number>(PullKey) || 0;
  totalPull += 1;
  context.globalState.update(PullKey, totalPull);
  checkPullAchievements(context);
}
/*GIT PULL*/

/*GIT PUSH*/
let totalPush: number = 0;
const PushKey = "totalPush";

export function checkPushAchievements(context: vscode.ExtensionContext) {
  for (let achievement of achievements) {
    if (
      achievement.pushes !== undefined &&
      !achievement.achieved &&
      totalPush >= achievement.pushes
    ) {
      unlockAchievement(achievement, context);
    }
  }
}

export function incrementPushCount(context: vscode.ExtensionContext) {
  totalPush = context.globalState.get<number>(PushKey) || 0;
  totalPush += 1;
  context.globalState.update(PushKey, totalPush);
  checkPushAchievements(context);
}
/*GIT PUSH*/

/*GIT TAG*/
let totalTag: number = 0;
const TagKey = "totalTag";

export function checkTagAchievements(context: vscode.ExtensionContext) {
  for (let achievement of achievements) {
    if (
      achievement.tags !== undefined &&
      !achievement.achieved &&
      totalTag >= achievement.tags
    ) {
      unlockAchievement(achievement, context);
    }
  }
}

export function incrementTagCount(context: vscode.ExtensionContext) {
  totalTag = context.globalState.get<number>(TagKey) || 0;
  totalTag += 1;
  context.globalState.update(TagKey, totalTag);
  checkTagAchievements(context);
}
/*GIT TAG*/

let statusBarItem: vscode.StatusBarItem;
let experienceBarItem: vscode.StatusBarItem;
let resetButton: vscode.StatusBarItem;
let totalExperience: number = 0;
const experienceKey = "userExperience";

export function checkAchievements(
  context: vscode.ExtensionContext,
  linesWritten?: number,
  action?: string
) {
  const sessionEndTime = Date.now();
  const sessionDuration = sessionEndTime - sessionStartTime;
  totalTimeSpent = sessionDuration;
  context.globalState.update(timeSpentKey, totalTimeSpent);
  checkTimeAchievements(context, totalTimeSpent);

  for (let achievement of achievements) {
    const achieved =
      context.globalState.get<boolean>(achievement.name) || false;
    if (!achieved) {
      if (
        achievement.lines !== undefined &&
        linesWritten !== undefined &&
        linesWritten >= achievement.lines
      ) {
        unlockAchievement(achievement, context);
      } else if (
        achievement.action !== undefined &&
        action !== undefined &&
        action === achievement.action
      ) {
        unlockAchievement(achievement, context);
      }
    }
  }
}

function unlockAchievement(achievement: any, context: vscode.ExtensionContext) {
  const message = `Achievement unlocked: ${achievement.name} ${achievement.icon}`;
  const buttons = [{ title: "View Achievements" }];

  vscode.window
    .showInformationMessage(message, ...buttons)
    .then((selection) => {
      if (selection && selection.title === "View Achievements") {
        showAchievements();
      }
    });

  context.globalState.update(achievement.name, true);
  achievement.achieved = true;
  totalExperience += achievement.xp;
  context.globalState.update(experienceKey, totalExperience);
  updateStatusBar();
}

export function loadAchievements(context: vscode.ExtensionContext) {
  totalExperience = context.globalState.get<number>(experienceKey) || 0;
  for (let achievement of achievements) {
    achievement.achieved =
      context.globalState.get<boolean>(achievement.name) || false;
  }
  updateStatusBar();
}

export function initStatusBarItem(context: vscode.ExtensionContext) {
  statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left
  );
  statusBarItem.command = "extension.showAchievements";
  context.subscriptions.push(statusBarItem);

  experienceBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left
  );
  context.subscriptions.push(experienceBarItem);

  resetButton = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left
  );
  resetButton.text = "$(trash) Reset Achievements";
  resetButton.command = "extension.resetAchievements";
  context.subscriptions.push(resetButton);

  updateStatusBar();
}

function updateStatusBar() {
  const achievedCount = achievements.filter(
    (achievement) => achievement.achieved
  ).length;
  statusBarItem.text = `Achievements: ${achievedCount}/${achievements.length}`;
  statusBarItem.show();

  experienceBarItem.text = `XP: ${totalExperience}`;
  experienceBarItem.show();

  resetButton.show();
}

export function showAchievements() {
  let achievedList = achievements
    .map((ach) => `${ach.achieved ? "✅" : "❌"} ${ach.name} (XP: ${ach.xp})`)
    .join("\n");
  achievedList = achievedList.split("\n").sort().join("\n");
  vscode.window.showInformationMessage(achievedList, { modal: true });
}

export function resetAchievements(context: vscode.ExtensionContext) {
  totalExperience = 0;
  totalCommits = 0;
  totalPull = 0;
  totalPush = 0;
  totalTag = 0;
  totalTimeSpent = 0;

  context.globalState.update(experienceKey, totalExperience);
  context.globalState.update(PullKey, totalPull);
  context.globalState.update(commitsKey, totalCommits);
  context.globalState.update(PushKey, totalPush);
  context.globalState.update(TagKey, totalTag);
  context.globalState.update(timeSpentKey, totalTimeSpent);

  for (let achievement of achievements) {
    achievement.achieved = false;
    context.globalState.update(achievement.name, false);
  }

  updateStatusBar();
  vscode.window.showInformationMessage(
    "Achievements and experience have been reset."
  );
}
