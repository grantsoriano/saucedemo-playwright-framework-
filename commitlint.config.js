module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'chore', 'docs', 'test', 'ci', 'refactor', 'style', 'perf', 'revert'],
    ],
    'subject-case': [0],
  },
};
