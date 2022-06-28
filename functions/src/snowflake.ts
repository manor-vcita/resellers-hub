import * as snowflake from 'snowflake-sdk';

const connectionDetails = {
  account: 'km40947.us-east-1',
  username: 'Manor',
  password: 'Frankel*50',
  application: 'DATA_WAREHOUSE_DB',
  database: 'DATA_WAREHOUSE_DB',
  role: 'ETL_ROLE',
  schema: 'PUBLIC',
  warehouse: 'COMPUTE_WH'
}


export const querySnowflake = (sqlText: string): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    console.log('connectToSnowflake Execute');

    const connection = snowflake.createConnection(connectionDetails);
    connection.connect((err, conn) => {
      if (err) {
        console.error('Unable to connect: ' + err.message);
        }
      else {
        console.log('Successfully connected to Snowflake.');
        // Optional: store the connection ID.
        const connection_ID = conn.getId();
        console.log(connection_ID);
      }
    });
    connection.execute({
      sqlText: sqlText,
      complete: (err, stmt, rows) => {
        if (err) {
          console.error('Failed to execute statement due to the following error: ' + err.message);
          reject(err);
        } else {
          resolve(rows!);
          connection.destroy((err) => {
            console.log('Failed to destroy connection. ', err);
          });
        }
      }
    })
  })
}


