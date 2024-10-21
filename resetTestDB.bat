@ECHO off
:: Set the PostgreSQL binary path (adjust the version if needed)
SET PATH=C:\Program Files\PostgreSQL\15\bin;%PATH%

:: Set PostgreSQL password
SET PGPASSWORD=postgres

:: Dropping the nestTestDB database
ECHO DROPPING nestTestDB DATABASE...
dropdb -U postgres -h localhost nestTestDB
IF NOT ERRORLEVEL 0 (
  ECHO "Failed to drop nestTestDB database.."
  GOTO :EOF
)

:: Creating a new nestTestDB database
ECHO CREATING NEW nestTestDB DATABASE...
createdb -U postgres -h localhost nestTestDB
IF NOT ERRORLEVEL 0 (
  ECHO "Failed to create new nestTestDB database.."
  GOTO :EOF
)

ECHO "Database restart completed successfully."
GOTO :EOF
