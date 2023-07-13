# Nuber Eats

The Backend of Nuber Eats Clone

- Orders Subscription:

  - Pending Orders (Owner) (T: createOrder)
  - Order Status (Customer, Delivery, Owner) (T: editOrder)
  - Pending Pickup Order (Delivery)

- Payments (CRON)



#14.6 Promoting Restaurants
Date.prototype.setDate()
setDate() 메서드는 현재 설정된 월의 시작 부분을 기준으로 Date 객체의 날짜를 설정합니다.
```
var theBigDay = new Date(1962, 6, 7); // 1962-07-07
theBigDay.setDate(24); // 1962-07-24
theBigDay.setDate(32); // 1962-08-01
theBigDay.setDate(22); // 1962-07-22
```
https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date/setDate

order
데이터를 가져올 때 내림차순 또는 오름차순으로 가져오도록 순서를 지정한다.

ASC(Ascending): 오름차순, 숫자 -1
DESC(Descending): 내림차순, 숫자 1
```
userRepository.find({
order: {
name: "ASC",
id: "DESC",
},
});
```
https://orkhan.gitbook.io/typeorm/docs/find-options

