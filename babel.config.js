module.exports = ((env) => {
  const isTest = env.NODE_ENV === 'test' || 'CI' in env;

  const plugins = ['@babel/plugin-proposal-class-properties'];

  const presets = [
    '@babel/preset-typescript',
    '@babel/preset-react',
    isTest
      ? [
          '@babel/preset-env',
          {
            targets: {
              node: 'current',
            },
          },
        ]
      : '@babel/preset-env',
  ];

  return {
    plugins,
    presets,
  };
})(process.env);
