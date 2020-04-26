## Установка
В корне `meow-server`
```
npm i
```


## Запуск
В корне `meow-server`
```
npm start
```
Сервер запускается на порту 8000

```
npm run start:local
```
Сервер запускается на порту 8000 и доступен из локальной сети

## API
### Описание
```
Запрос:
POST /auth/login
{
    username: string;
}

Ответ
{
    token: string;
}
```
Запрос на авторизацию, если username занят, возвращается ошибка 403, иначе 
возвращается объект с токеном авторизации. Запросы требующие авторизации
ожидают этот токен в http заголовке X-Auth-Token. При отсутствии заголовка
или неверном токене вернется ошибка 401.

### Примеры
```

Запрос:
POST /auth/login
{
    username:  "Alex"
}

Ответ
{
    token: "dedm-992h-7lp647";
}
```
### Описание
```
Запрос:
POST /auth/logout


Ответ
Ok
```
Запрос на разлогин. Возвращает 200 если если разлогин успешен.

### Примеры
```

Запрос:
POST /auth/login
{
    username:  "Alex"
}

Ответ
{
    token: "dedm-992h-7lp647";
}
```


### Описание
```
Запрос:
GET /messages?from=${number}

Ответ:
Array<Messages>
Message {
    text: string;
    author: string;
}
```
Выдает список сообщений начиная с целого числа `from`. Если параметр `from` не передан, то считается
равным 0. Требует авторизации.

### Примеры
```
Запрос
GET /messages?from=1
Ответ:
[
    { text: "Hi!", author: 'alex' },
    { text: "What's up?", author: 'sandra' },
    { text: "Well, thanks!", author: 'alex'}
]

Запрос
GET /messages?from=2
Ответ:
[
    { text: "What's up?", author: 'sandra' },
    { text: "Well, thanks!", author: 'alex'}
]

Запрос
GET /messages
Ответ:
[
    {text: "Good morning!", author: 'sandra'},
    { text: "Hi!", author: 'alex' },
    { text: "What's up?", author: 'sandra' },
    { text: "Well, thanks!", author: 'alex'}
]
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
 Требует авторизации.
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