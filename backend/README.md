# Flask Server

Website's backend API made with flask and sqlite database.
SQLAlchemy is used to connect the API with the database.

## Start
1. clone this repository
2. setup a virtual environment and activate it (optional but recommended) (follow the steps below in the 'Virtual Environment section')
3. install the requirements using the command :
   ```bash
   pip install -r requirements.txt
   ```
4. execute the command
   ```bash
   flask run
   ```
   and the server should be running on your localhost on port 5000 by default.
   Go to http://localhost:5000/ to check if it's running.

## Virtual Environment
Steps to install a virtual environment
1. Execute the command
    ```bash
    py -m venv [env_name]
    ```
    ([env_name] should be replaced with a name of your choice)
    if it was installed successfully, a new directory with the [env_name] name should be created.
1. Activate the environment using the command:
   ```bash
   source ./[env_name]/Scripts/activate
   ```
1. Now, you should see ([env_name]) before your shell prompt.