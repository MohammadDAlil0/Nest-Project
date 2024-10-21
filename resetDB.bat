@ECHO off
:: Set the PostgreSQL binary path (adjust the version if needed)
SET PATH=C:\Program Files\PostgreSQL\15\bin;%PATH%

:: Set PostgreSQL password
SET PGPASSWORD=postgres

:: Dropping the nestDB database
ECHO DROPPING nestDB DATABASE...
dropdb -U postgres -h localhost nestDB
IF NOT ERRORLEVEL 0 (
  ECHO "Failed to drop nestDB database.."
  GOTO :EOF
)

:: Creating a new nestDB database
ECHO CREATING NEW nestDB DATABASE...
createdb -U postgres -h localhost nestDB
IF NOT ERRORLEVEL 0 (
  ECHO "Failed to create new nestDB database.."
  GOTO :EOF
)

ECHO "Database restart completed successfully."
GOTO :EOF
