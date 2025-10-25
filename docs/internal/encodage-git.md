# Guide Encodage Git - Linkart

## Problème d'encodage des messages de commit

### Symptômes

Messages de commit affichés comme : `amÃ©liorer` au lieu de `améliorer`

### Solution

#### 1. Configuration Git globale

```bash
git config --global core.quotepath false
git config --global i18n.commitencoding utf-8
git config --global i18n.logoutputencoding utf-8
```

#### 2. Configuration locale du projet (déjà fait)

```bash
git config core.quotepath false
git config i18n.commitencoding utf-8
git config i18n.logoutputencoding utf-8
```

#### 3. Utiliser `.gitattributes`

Le fichier `.gitattributes` force l'encodage UTF-8 pour tous les fichiers texte.

### Scripts automatiques

Le projet inclut des scripts qui corrigent automatiquement l'encodage :

- `scripts/validate-commit-message.js` : Corrige l'encodage des messages de commit
- Fonction `fixEncoding()` : Remplace les caractères mal encodés

### Caractères corrigés automatiquement

| Caractère attendu | Encodage incorrect |
| ----------------- | ------------------ |
| é                 | Ã©                |
| è                 | Ã¨                 |
| à                 | Ã                  |
| ç                 | Ã§                 |
| ô                 | Ã´                 |
| î                 | Ã®                |
| ï                 | Ã¯                 |
| ù                 | Ã¹                 |
| â                 | Ã¢                 |
| ë                 | Ã«                 |

### Best practices

1. **Toujours utiliser UTF-8** dans votre éditeur
2. **Configurer votre terminal** pour UTF-8
3. **Vérifier les messages** avant de pusher

### Windows PowerShell

Pour PowerShell, ajoutez à votre profil (`$PROFILE`) :

```powershell
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
chcp 65001 > $null
```

### VS Code / Cursor

Configurez dans `settings.json` :

```json
{
  "files.encoding": "utf8",
  "files.autoGuessEncoding": false
}
```

### Tester

```bash
# Commit de test
git commit -m "test(encoding): tester caractères accentués éèàçôùâ"

# Vérifier le log
git log --oneline -1
```

### En cas de problème persistant

1. Vérifier la configuration Git :

   ```bash
   git config --list | findstr encoding
   ```

2. Utiliser `--no-verify` temporairement (⚠️ à éviter) :

   ```bash
   git commit --no-verify -m "message"
   ```

3. Contacter l'équipe si le problème persiste

## Fichiers ignorés du formatage

Les fichiers suivants sont ignorés par Prettier et ESLint :

- `src/types/supabase.ts` (généré automatiquement)
- `docs/generated/**/*` (généré automatiquement)
- `.history/**/*` (fichiers historiques)

## Ressources

- [Git Documentation - i18n](https://git-scm.com/docs/git-config#Documentation/git-config.txt-i18ncommitEncoding)
- [UTF-8 on Windows](https://akrabat.com/utf-8-on-windows/)
