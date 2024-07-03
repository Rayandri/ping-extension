
# Ping GameFi README

Bienvenue dans l'extension "ping-gamefi" ! Cette extension gamifie votre expérience de développement en vous offrant des achievements pour diverses actions de codage.

## Features

- **Première utilisation de l'extension** : Débloquez votre premier achievement dès que vous commencez à utiliser l'extension.
- **Exécution de script Python via F5** : Recevez un achievement lorsque vous lancez un script Python.
- **Création de fonctions** : Débloquez des achievements lorsque vous créez des fonctions et utilisez des tabulations.
- **Code sans erreurs** : Obtenez des achievements lorsque votre code n'a pas de problèmes.
- **Respect des conventions PEP8** : Recevez un achievement lorsque votre code est bien formaté selon PEP8.
- **Interactions Git** : Des achievements pour `push`, `merge`, `pull` avec conflit, `tag`, création de fichier et de dossier, `rebase`, etc.
- **Progression de lignes de code** : Obtenez des achievements pour chaque tranche de 200 lignes de code avec une barre de progression.

## Requirements

Aucune dépendance spécifique n'est nécessaire pour cette extension.

## Extension Settings

Cette extension contribue aux paramètres suivants :

* `ping-gamefi.enable`: Activer/désactiver cette extension.
* `ping-gamefi.achievementNotification`: Activer/désactiver les notifications d'achievements.

## Known Issues

Pour l'instant, il n'y a pas de problèmes connus. Veuillez signaler tout problème rencontré via le dépôt GitHub.

## Release Notes

### 1.0.0

Sortie initiale de Ping GameFi

---

## Installation

### Installation via le fichier .vsix

1. Téléchargez le fichier `.vsix` de l'extension.
2. Ouvrez VSCode.
3. Allez dans l'onglet des extensions (Ctrl+Shift+X).
4. Cliquez sur les trois points en haut à droite de la vue des extensions.
5. Sélectionnez "Install from VSIX..." et choisissez le fichier `.vsix` téléchargé.

### Compilation avec vsce

1. Installez `vsce` si vous ne l'avez pas encore :

   ```sh
   npm install -g vsce
   ```

2. Empaquetez votre extension :

   ```sh
   vsce package
   ```

   Cela générera un fichier `.vsix` dans votre répertoire de projet.

3. Suivez les instructions d'installation via le fichier `.vsix` ci-dessus pour installer l'extension empaquetée.

## Following extension guidelines

Assurez-vous de lire les directives d'extension et de suivre les meilleures pratiques pour créer votre extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

Vous pouvez rédiger votre README en utilisant Visual Studio Code. Voici quelques raccourcis clavier utiles :

* Diviser l'éditeur (`Cmd+\` sur macOS ou `Ctrl+\` sur Windows et Linux).
* Basculer l'aperçu (`Shift+Cmd+V` sur macOS ou `Shift+Ctrl+V` sur Windows et Linux).
* Appuyez sur `Ctrl+Space` (Windows, Linux, macOS) pour voir une liste de snippets Markdown.

## For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Profitez-en !**

![alt text](images/icon.png)
