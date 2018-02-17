
rd /S /Q "Bundle\"

md "Bundle\"

call arch.bat
copy "outlay_test.zip" "Bundle\outlay_test.zip" /Y

call arch_empty.bat
copy "outlay_empty.zip" "Bundle\outlay_empty.zip" /Y

call UpdateFiles\CreateUpdate.bat
copy "UpdateFiles\Update.upd" "Bundle\Update.upd" /Y