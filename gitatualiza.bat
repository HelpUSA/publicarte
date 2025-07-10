@echo off
echo.
echo Adicionando todos os arquivos...
git add .

echo.
echo Commitando com mensagem padrão...
git commit -m "Atualização automática do projeto PublicArte"

echo.
echo Enviando para o repositório remoto (branch main)...
git push origin main

echo.
echo ✅ Atualização concluída!
pause
