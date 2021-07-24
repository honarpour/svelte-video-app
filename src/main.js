import App from './App';
import context from './context';

const app = new App({
  target: document.body,
  props: { context },
});

window.app = app;

export default app;
