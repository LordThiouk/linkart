# API [Nom de l'Endpoint]

> Version: v[VERSION] Auteur: [AUTEUR] Dernière mise à jour: [DATE] Objet: Documentation de
> l'endpoint [NOM]

---

## Description

[Description de l'endpoint et de sa fonction]

## URL

```
[HTTP_METHOD] /api/[endpoint]
```

## Authentification

- **Requis** : Oui/Non
- **Capabilities** : [Liste des capabilities requises]
- **JWT** : [Détails sur le token JWT]

## Paramètres

### Headers

| Nom           | Type   | Requis | Description      |
| ------------- | ------ | ------ | ---------------- |
| Authorization | string | Oui    | Bearer token JWT |
| Content-Type  | string | Oui    | application/json |

### Body (si applicable)

```json
{
  "param1": "string",
  "param2": "number"
}
```

## Réponse

### Succès (200)

```json
{
  "success": true,
  "data": {
    // Données de réponse
  }
}
```

### Erreurs

| Code | Description           |
| ---- | --------------------- |
| 400  | Bad Request           |
| 401  | Unauthorized          |
| 403  | Forbidden             |
| 404  | Not Found             |
| 500  | Internal Server Error |

## Exemples

### Requête

```bash
curl -X POST /api/[endpoint] \
  -H "Authorization: Bearer [JWT_TOKEN]" \
  -H "Content-Type: application/json" \
  -d '{"param1": "value"}'
```

### Réponse

```json
{
  "success": true,
  "data": {
    "result": "success"
  }
}
```

## Changelog

### v[VERSION] ([DATE])

- Création de la documentation
- [Autres modifications]
