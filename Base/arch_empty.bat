del outlay_empty.zip 

rd /S /Q "..\Build\"

md "..\Build\"

xcopy "*.xls" "..\Build\" /S /Y

xcopy "*.xml" "..\Build\" /S /Y

xcopy "*.js" "..\Build\" /S /Y 

xcopy "*.txt" "..\Build\" /S /Y 


copy ClearTestData.ps1 "..\Build\ClearTestData.ps1" /Y

cd ..\Build

powershell -File ClearTestData.ps1

cd ..\bin

del "..\Build\ClearTestData.ps1"

"..\..\..\..\EditorPro\Build\Utils\pkzip.exe" -add -rec -path=relative  outlay_empty.zip "..\Build\*.*"

rd /S /Q "..\Build"
