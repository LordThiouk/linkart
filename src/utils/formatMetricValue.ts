/**
 * Formate une valeur numérique en format abrégé pour l'affichage des métriques
 * @param value - La valeur numérique à formater
 * @returns La valeur formatée (ex: "1.2K", "1.5M", "42")
 */
export const formatMetricValue = (value: number): string => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toString();
};
