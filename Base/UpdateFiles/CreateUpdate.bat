cd "UpdateFiles\"
del Update.upd
cd ..
call arch_empty.bat
"..\..\..\..\EditorPro\Build\Utils\pkzip.exe" -add -rec -path=relative  outlay_empty.zip UpdateFiles\settings.xml
copy outlay_empty.zip UpdateFiles\Update.upd
del outlay_empty.zip