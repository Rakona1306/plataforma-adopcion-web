export default {
  parserPreset: {
    parserOpts: {
      headerPattern: /^(\w+)\(([A-Z]+-\d+)\): (.+)$/,
      headerCorrespondence: ['type', 'ticket', 'subject'],
    },
  },

  rules: {
    'header-match-pattern': [2, 'always'],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'refactor',
        'chore',
        'docs',
        'test',
        'style',
        'perf',
        'build',
        'ci',
        'revert',
      ],
    ],
  },
};