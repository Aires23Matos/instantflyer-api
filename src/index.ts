import 'dotenv/config';
import { app } from './infrastructure/webserver/server';

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(` InstantFlyer API running on port ${PORT}`);
});