$env:PATH = 'C:\Users\Tecsup\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;' + $env:PATH
Set-Location $PSScriptRoot
& 'C:\Users\Tecsup\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' node_modules/next/dist/bin/next dev --turbopack
