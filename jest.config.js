process.env.TZ = 'GMT';

module.exports = {
  "setupFiles": ["./setupTests.js"],
  "globals": {
    "window": {}
  },
  moduleFileExtensions: ["tsx", "ts", "js", "json"],
  moduleDirectories: ["node_modules", "src"],
  roots: ["src"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|scss)$": "<rootDir>/__mocks__/styleMock.js",
    "\\.(svg)$": "<rootDir>/__mocks__/svgMock.js",
  },
};
