param(
	[Parameter(Mandatory=$true, Position=0)]
    [string] $Url
)

#$userCredential = New-Object -TypeName System.Management.Automation.PSCredential -ArgumentList $UserName, $Password

#Connect-PnPOnline -Url $Url -Credentials $userCredential

Connect-PnPOnline -Url $Url -CurrentCredentials

Get-ChildItem -Filter "Deploy.ps1" -Recurse:$true | % {	
	Push-Location -Path $_.DirectoryName
		.\Deploy.ps1
	Pop-Location
}

#Disconnect-PnPOnline