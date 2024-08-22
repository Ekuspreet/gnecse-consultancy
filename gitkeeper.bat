@echo off
setlocal enabledelayedexpansion

rem Traverse all directories and subdirectories
for /r /d %%D in (*) do (
    rem Check if the directory is empty
    dir /a /b "%%D" | findstr /r /c:"^" >nul
    if errorlevel 1 (
        rem Directory is empty, create .gitignore
        echo Adding .gitignore to %%D
        echo # Ignore everything in this directory > "%%D\.gitignore"
        echo * >> "%%D\.gitignore"
        echo # Except this file >> "%%D\.git-keep"
        echo !.gitignore >> "%%D\.gitignore"
    )
)

endlocal
