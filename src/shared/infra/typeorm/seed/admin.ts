import { hash } from "bcryptjs";
import { v4 as uuidV4 } from "uuid";

import { createConnection } from "..";

async function create() {
  const connection = await createConnection("localhost");

  const id = uuidV4();
  const password = await hash("admin", 8);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, driver_license, "isAdmin", created_at)
      values('${id}', 'admin', 'admin@rentx.com.br', '${password}', 'XXXXXX', true, 'now()')
    `
  );

  await connection.destroy();
}

create().then(() => console.log("User admin created."));
