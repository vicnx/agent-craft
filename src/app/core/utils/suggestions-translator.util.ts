import suggestionsData from '../data/suggestions.json';

interface CatalogCategory {
  readonly rules: readonly string[];
}

interface LanguageCatalog {
  readonly categories: readonly CatalogCategory[];
  readonly roles: readonly string[];
  readonly quickSuggestions?: readonly string[];
}

export function translateCatalogItems(
  rules: readonly string[],
  role: string,
  prevLang: string,
  newLang: string,
): { readonly translatedRules: readonly string[]; readonly translatedRole: string } {
  const catalogs = suggestionsData as unknown as Record<string, LanguageCatalog>;
  const prevData = catalogs[prevLang];
  const newData = catalogs[newLang];

  if (!prevData || !newData) {
    return { translatedRules: rules, translatedRole: role };
  }

  const translatedRules = rules.map((rule) => {
    for (let c = 0; c < prevData.categories.length; c++) {
      const idx = prevData.categories[c].rules.indexOf(rule);
      if (idx !== -1 && newData.categories[c]?.rules[idx]) {
        return newData.categories[c].rules[idx];
      }
    }
    const qIdx = prevData.quickSuggestions?.indexOf(rule) ?? -1;
    if (qIdx !== -1 && newData.quickSuggestions?.[qIdx]) {
      return newData.quickSuggestions[qIdx];
    }
    return rule;
  });

  let translatedRole = role;
  const roleIdx = prevData.roles.indexOf(role);
  if (roleIdx !== -1 && newData.roles[roleIdx]) {
    translatedRole = newData.roles[roleIdx];
  }

  return { translatedRules, translatedRole };
}
