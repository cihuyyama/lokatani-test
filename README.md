# Getting Started with the VITL Stack

## Introduction

The VITL stack combines the power of Laravel, Vue.js, Inertia.js, and Tailwind CSS to create modern and efficient web applications. This documentation will guide you through setting up and running a project using the VITL stack.

## Prerequisites

Before getting started, ensure you have the following installed on your system:

- PHP (recommended version 8.0 or latest)
- Composer (dependency manager for PHP)
- Node.js (recommended LTS version)
- NPM (Node.js package manager)
- MySQL (Database)
- Laragon/XAMPP (local server)

## Environment and Database Configuration

### Copy .env.example to .env

```bash
cp .env.example .env
```

### Configure Database
go to .env file and configure database, in this case we're using mysql

```javascript
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_database_username
DB_PASSWORD=your_database_password
```

### Install Vendor Dependencies
```bash
composer install
```

### Run Migrate
```bash
php artisan migrate:fresh
```

### Seed using tinker (Optional)
```bash
php artisan tinker
```
```bash
App\Models\Customer::factory()->count(30)->create();
```

## Running the Application

### Install JavaScript Dependencies

```bash
npm install
```
This command will install all the required JavaScript dependencies defined in your project's package.json file, including Inertia.js, Tailwind CSS, and any other packages required for your Vue.js application.

### Generate App Key

Generate your application encryption key using:

```bash
php artisan key:generate
```

### Serve your Laravel application

To serve your Laravel application, run the following command in your terminal:

```bash
php artisan serve
```

### Compile your assets

Open another terminal in the root directory and run the code to compile the client side

```bash
npm run dev
```

### Access your application

Open your web browser and navigate to http://127.0.0.1:8000 to access your Laravel application.

### Conclusion

Congratulations! You have successfully set up a project using the VITL stack. You can now start building modern web applications with Laravel, Vue.js, Inertia.js, and Tailwind CSS.
