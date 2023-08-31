# Movie API

This is a simple movie API project.

## Installation

- Clone the repository:

```bash
    git clone https://github.com/bymoharyadypto/movie-api.git
```

### Development

- Install dependencies:

```bash
cd movie-api
npm install
```

- Set up configuration in 'config/config.js' using environment variables from '.env':

```dotenv
POSTGRESQL_DEV_USER=your_dev_db_user
POSTGRESQL_DEV_PASSWORD=your_dev_db_password
POSTGRESQL_DEV_DB_NAME=your_dev_db_name
POSTGRESQL_DEV_HOST=your_dev_db_host
```

- Create the development database:

```bash
npx sequelize-cli db:create
```

- Run migrations to set up the schema:

```bash
npx sequelize-cli db:migrate
```

- Run seeders to populate the database:

```bash
npx sequelize-cli db:seed:all
```

- Start the application:

```bash
npm run start
```

### Unit Testing

- Create the testing database:

```bash
sequelize db:create --env test
```

- Run migrations for the testing database:

```bash
sequelize db:migrate --env test
```

- Run tests:

```bash
npm run test
```

Make sure to replace placeholders like `your-username`, `your_dev_db_user`, `your_dev_db_password`, etc. with your actual values. This README provides a basic structure and instructions, but you can further customize it to match the specifics of your project and any additional details you want to provide.

For more information on how to use Sequelize CLI, refer to the official documentation: https://sequelize.org/master/manual/migrations.html
