module.exports = {
  services: [
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('volar-service-prettier').create({
      languages: ['html', 'css', 'scss', 'typescript', 'javascript'],
      html: {
        breakContentsFromTags: true,
      },
      ignoreIdeOptions: true,
    }),
  ],
}
