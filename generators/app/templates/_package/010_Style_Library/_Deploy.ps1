$global:scriptVersion = (New-Guid).GetHashCode() * -1

#Add version to file
$newJsName = ("<%= clientLower %>.<%= projectLower %>" + $global:scriptVersion + ".js")
Rename-Item -Path ".\<%= clientLower %>.<%= projectLower %>.js" -NewName $newJsName

#Add Js
Add-PnPFile -Path $newJsName -Folder "/Style Library/<%= client %>/Scripts" -checkout -publish
Add-PnPFile -Path ".\<%= clientLower %>.<%= projectLower %>.js.map" -Folder "/Style Library/<%= client %>/Scripts" -checkout -publish

#Add Css
Add-PnPFile -Path ".\<%= clientLower %>.<%= projectLower %>.css" -Folder "/Style Library/<%= client %>/Styles" -checkout -publish