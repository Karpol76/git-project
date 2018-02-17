#
# ClearTestData.ps1
#
# Load the existing document
$Input = "MainData\RRO_STAGE1.xml"
$Doc = [xml](Get-Content $Input)
# Specify tag names to delete and then find them
$DeleteNames = "data"
$DeleteTableNames = "RRO_Outlays", "RRO_DATA", "SELECTED_FOIV", "RRO_OBAS", "RRO_OBAS_VERSIONS"
$node = $Doc.SelectSingleNode("/document/tables")
($node.ChildNodes |Where-Object { $DeleteTableNames -contains $_.Id }) | ForEach-Object {
    # Remove each node from its parent
    $data = $_.SelectSingleNode("data")
    if($data){[void]$data.ParentNode.RemoveChild($data)}
}

# Save the modified document
$Doc.Save($Input)