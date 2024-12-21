export const formatYearWord = (years: number): string => {
    const yearWords = {
        one: 'год',
        few: 'года',
        many: 'лет',
        other: 'лет'
    };
    return yearWords[new Intl.PluralRules('ru').select(years)];
};

export const formatMonthWord = (months: number): string => {
    const monthWords = {
        one: 'месяц',
        few: 'месяца',
        many: 'месяцев',
        other: 'месяцев'
    };
    return monthWords[new Intl.PluralRules('ru').select(months)];
};

export const formatDayWord = (days: number): string => {
    const dayWords = {
        one: 'день',
        few: 'дня',
        many: 'дней',
        other: 'дней'
    };
    return dayWords[new Intl.PluralRules('ru').select(days)];
};