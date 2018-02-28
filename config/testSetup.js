const ReactTestRenderer = require("react-test-renderer");
const Enzyme = require("enzyme");
const Adapter = require("enzyme-adapter-react-16");

Enzyme.configure({ adapter: new Adapter() });

global.shallow = Enzyme.shallow;
global.render = Enzyme.render;
global.mount = Enzyme.mount;

global.requestAnimationFrame = function(callback) {
  setTimeout(callback, 0);
};

console.error = message => {
  throw new Error(message);
};
