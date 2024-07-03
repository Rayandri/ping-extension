import * as vscode from "vscode";
import {
  checkAchievements,
  loadAchievements,
  initStatusBarItem,
  showAchievements,
  resetAchievements,
  startSession,
  checkExtensionAchievements,
  incrementCommitCount,
  incrementPullCount,
  incrementPushCount,
  incrementTagCount,
} from "./achievement";

export function activate(context: vscode.ExtensionContext) {
  console.log('Votre extension "my-vscode-extension" est maintenant active!');
  vscode.workspace.getConfiguration().update("workbench.colorTheme", "Marc");

  const isFirstTime = context.globalState.get("isFirstTime", true);
  if (isFirstTime) {
    vscode.window.showInformationMessage("Bienvenue à bord !");
    context.globalState.update("isFirstTime", false);
  }

  initStatusBarItem(context);
  loadAchievements(context);
  startSession(context);

  vscode.workspace.onDidChangeTextDocument((event) => {
    const linesWritten = event.document.lineCount;
    checkAchievements(context, linesWritten);
    checkExtensionAchievements(context);
  });

  const gitExtension = vscode.extensions.getExtension("vscode.git");
  if (gitExtension) {
    gitExtension.activate().then(() => {
      const api = gitExtension.exports.getAPI(1);
      if (api) {
        api.onDidChangeState(() => {
          const repositories = api.repositories;
          for (const repo of repositories) {
            repo.state.onDidChange(() => {
              const operations = repo.state.operations;
              if (operations.includes("Commit")) {
                incrementCommitCount(context);
              }
              if (operations.includes("Pull")) {
                incrementPullCount(context);
              }
              if (operations.includes("Push")) {
                incrementPushCount(context);
              }
              if (operations.includes("Tag")) {
                incrementTagCount(context);
              }
            });
          }
        });
      }
    });
  }

  let disposable = vscode.commands.registerCommand(
    "extension.helloWorld",
    () => {
      vscode.window.showInformationMessage(
        "Hello World from your VSCode Extension!"
      );
    }
  );

  let showAchievementsCommand = vscode.commands.registerCommand(
    "extension.showAchievements",
    () => {
      showAchievements();
    }
  );

  let resetAchievementsCommand = vscode.commands.registerCommand(
    "extension.resetAchievements",
    () => {
      resetAchievements(context);
    }
  );

  const resetButton = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    100
  );
  resetButton.text = "$(trash) Reset Achievements";
  resetButton.command = "extension.resetAchievements";
  resetButton.tooltip = "Reset Achievements and Experience";
  resetButton.show();
  context.subscriptions.push(resetButton);

  context.subscriptions.push(disposable);
  context.subscriptions.push(showAchievementsCommand);
  context.subscriptions.push(resetAchievementsCommand);
}

export function deactivate(context: vscode.ExtensionContext) {}
