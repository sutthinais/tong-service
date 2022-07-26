import { createPool, Pool } from 'mysql';


export function createDbPool() {
  return createPool({
      connectionLimit: 10,
      host: `203.114.108.46`,
      user: `root`,
      password: ``,
      database: `tong_dev`,
      port:8080
  });
}

