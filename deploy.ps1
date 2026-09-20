
$ErrorActionPreference = "Stop"

Write-Host "Creating dist.tar.gz..."
tar -czf dist.tar.gz -C Mayur-Fashion/dist .

$config = Get-Content "$HOME\.antideploy\config.json" | ConvertFrom-Json
$token = $config.token
$appId = "d8ef5185-3c59-40c5-88dd-ddcb549a5102"

Write-Host "Uploading dist.tar.gz to Antideploy..."
curl.exe -s -w "\n%{http_code}" -X POST https://antideploy.com/api/v1/deploy `
  -H "Authorization: Bearer $token" `
  -F "applicationId=$appId" `
  -F "file=@dist.tar.gz" > deploy_result.txt

$exitCode = $LASTEXITCODE
if ($exitCode -ne 0) {
    Write-Host "curl failed with exit code $exitCode"
    exit 1
}

$result = Get-Content deploy_result.txt
Write-Host "Result:"
Write-Host $result

