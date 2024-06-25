import * as vscode from 'vscode';


let points = 0;
let statusBar: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
  statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  statusBar.text = `Points: ${points}`;
  statusBar.show();
  
  context.subscriptions.push(statusBar);

  context.subscriptions.push(vscode.commands.registerCommand('extension.compileCode', compileCode));
  context.subscriptions.push(vscode.commands.registerCommand('extension.commitCode', commitCode));
  context.subscriptions.push(vscode.commands.registerCommand('extension.createFunction', createFunction));
}

function compileCode() {
  points += 10;
  updateStatusBar();
  vscode.window.showInformationMessage(`Code compiled! Total points: ${points}`);
}

function commitCode() {
  points += 5;
  updateStatusBar();
  vscode.window.showInformationMessage(`Code committed! Total points: ${points}`);
}

function createFunction() {
  points += 1;
  updateStatusBar();
  vscode.window.showInformationMessage(`Function created! Total points: ${points}`);
}

function updateStatusBar() {
  statusBar.text = `Points: ${points}`;
}

export function deactivate() {}
