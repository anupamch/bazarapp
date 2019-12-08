"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let storage = _multer.default.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/pimages');
  },
  filename: (req, file, cb) => {
    var filename = Date.now() + '-' + file.originalname;
    cb(null, filename);
  }
});

let upload = (0, _multer.default)({
  storage
});
var _default = upload;
exports.default = _default;