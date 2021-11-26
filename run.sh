echo "Gerando o build do backend...\n"

cd backend/

npm run build

echo "\nGerando o build do frontend...\n"

cd ../frontend

npm run build

cd ..

echo "\nGerando os containers da aplicação...\n"

docker-compose up
