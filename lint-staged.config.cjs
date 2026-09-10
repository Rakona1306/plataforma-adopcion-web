module.exports = {
    'frontend/**/*.{ts,tsx,js,jsx}': (files) => {
        const rel = files
            .map((f) => f.replace(/^frontend\//, ''))
            .map((f) => `"${f}"`)
            .join(' ');
        return [
            `pnpm --prefix frontend exec eslint --fix ${rel}`,
            `pnpm --prefix frontend exec prettier --write ${rel}`,
        ];
    },
    'frontend/**/*.{json,md,yml,yaml}': (files) => {
        const rel = files
            .map((f) => f.replace(/^frontend\//, ''))
            .map((f) => `"${f}"`)
            .join(' ');
        return [`pnpm --prefix frontend exec prettier --write ${rel}`];
    },
};