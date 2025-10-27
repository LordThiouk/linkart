#!/bin/bash

# Script pour générer les types TypeScript depuis Supabase
echo "📝 Génération des types TypeScript depuis Supabase..."

# Générer les types depuis la base de données distante
npx supabase gen types typescript --project-id "tevnkidggpvqpislmhht" --schema public > src/types/supabase.ts

if [ $? -eq 0 ]; then
    echo "✅ Types TypeScript générés avec succès depuis la base de données distante"
else
    echo "❌ Erreur lors de la génération des types"
    exit 1
fi
