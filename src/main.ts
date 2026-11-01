import App from './app';
import { configuration } from './config/configuration';

const PORT = 3000;
const app = new App().app;

app.listen(PORT, () => {
  console.log(`Server is running on port ${configuration.PORT}`);
});