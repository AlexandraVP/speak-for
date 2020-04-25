## Установка
В корне `meow-server`
```
npm i
```

## Сборка

Скопировать index.html и зависимые ресурсы в папку `public` в корне `meow-server`
сохраняя иерархию

## Запуск
В корне `meow-server`
```
npm start
```
Сервер запускается на порту 3000

```
npm run start:local
```
Сервер запускается на порту 3000 и доступен из локальной сети

## API
### Описание
```
Запрос:
GET /messages?from=${number}

Ответ:
Array<String>
```
Выдает список сообщений начиная с целого числа `from`. Если параметр `from` не передан, то считается
равным 0.

### Примеры
```
Запрос
GET /messages?from=1
Ответ:
["Hi!", "What's up?", "Well, thanks!"]

Запрос
GET /messages?from=2
Ответ:
["What's up?", "Well, thanks!"]

Запрос
GET /messages
Ответ:
["Good morning!","Hi!", "What's up?", "Well, thanks!"]
```

### Описание
```
Запрос:
POST /messages
{
    "text": ${string}
}

Ответ:
{
    "length": ${number}
}
```

Принимает JSON в теле с полем `text` - текстом сообщения.
 Возвращает JSON с полем числовым `length` - количеством сообщений.
 
 ### Примеры
 ```
 Запрос:
 POST /messages
 {
     "text": "That's fine. What about phone call?"
 }
 Ответ:
 {
     "length": 5
 }
 
 
  Запрос:
  POST /messages
  {
      "text": "Yes... in 5 mins"
  }
  Ответ:
  {
      "length": 6
  }
 ```