const issues = [
  {
    name: '',
    joinDate: '6/14/19',
    reputation: 19,
    language: 'Javascript',
    languageLogo:
      'https://img.favpng.com/3/7/21/javascript-node-js-computer-icons-logo-application-software-png-favpng-ebFcx9xnNQyPYnT2RTy7PWBdV.jpg',
  },
  {
    name:
      'Decklink output only works "properly" on NV12/i420 with 601. All other have artefacts or 90%+ encoding lag',
    link: 'https://github.com/obsproject/obs-studio/issues/2398',
    posted: '2/11/19',
    overview:
      "When using anything else than NV12 or i420 with 601 colour space, there are artefacts in the output. There's something like a pixel shift happening on the right part of the image. It makes text very blurry.   If you select NV12/i420/i444 with 709 or RGB in general. About 90% of the encoded frames are dropped. My CPU nor GPU is significantly going up in usage.",
    language: 'C',
    languageLogo:
      'https://i7.pngguru.com/preview/465/779/778/the-c-programming-language-computer-programming-computer-icons-programmer.jpg',
    solved: false,
  },
  {
    name:
      'Decklink output only works "properly" on NV12/i420 with 601. All other have artefacts or 90%+ encoding lag',
    link: 'https://github.com/obsproject/obs-studio/issues/2398',
    posted: '2/11/19',
    overview:
      "When using anything else than NV12 or i420 with 601 colour space, there are artefacts in the output. There's something like a pixel shift happening on the right part of the image. It makes text very blurry.   If you select NV12/i420/i444 with 709 or RGB in general. About 90% of the encoded frames are dropped. My CPU nor GPU is significantly going up in usage.",
    language: 'C',
    languageLogo:
      'https://i7.pngguru.com/preview/465/779/778/the-c-programming-language-computer-programming-computer-icons-programmer.jpg',
    solved: false,
    bids: 7,
    setPrice: 25,
  },
];

module.exports = { issues };
