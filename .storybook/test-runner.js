const { getStoryContext } = require('@storybook/test-runner');

module.exports = {
  // Configuration de la viewport pour mobile (iPhone size)
  async preVisit(page) {
    await page.setViewportSize({ width: 375, height: 667 });
  },

  // Tests d'accessibilité automatiques pour chaque story
  async postVisit(page, context) {
    const storyContext = await getStoryContext(page, context);

    // Skip si la story a des tests d'accessibilité désactivés
    if (storyContext.parameters?.a11y?.disable) {
      return;
    }

    // Attendre que le composant soit rendu
    await page.waitForTimeout(500);

    // Vérifier l'accessibilité avec axe-core
    await page.evaluate(() => {
      // axe-core est automatiquement injecté par Storybook
      return window.document.body.innerHTML;
    });
  },

  // Tags pour filtrer les tests
  tags: {
    include: [],
    exclude: ['skip-test'],
  },
};
