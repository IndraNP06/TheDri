@echo off
echo Starting WebPorto Project...

echo [1] Starting MySQL Database...
start /b C:\xampp\mysql\bin\mysqld.exe --console

echo [2] Starting Backend Server...
start cmd /k "cd server && npm run dev"

echo [3] Starting Frontend App...
start cmd /k "npm run dev"

echo All services are starting!
echo Note: You can close the main terminal, but keep the 2 new backend and frontend windows open.
pause
