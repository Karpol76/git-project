del outlay_test.zip

rd /S /Q "..\Build\"

md "..\Build\"

xcopy "*.xls" "..\Build\" /S /Y

xcopy "*.xml" "..\Build\" /S /Y

xcopy "*.js" "..\Build\" /S /Y 

xcopy "*.txt" "..\Build\" /S /Y 

"..\..\..\..\EditorPro\Build\Utils\pkzip.exe" -add -rec -path=relative  outlay_test.zip "..\Build\*.*"

rem pause
rd /S /Q "..\Build"
