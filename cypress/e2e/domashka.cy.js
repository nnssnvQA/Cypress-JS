describe('Проверка авторизации', function () {

    it('Верный логин и верный пароль', function () {
         cy.visit('https://login.qa.studio/'); // Зашли на сайт
         cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // Проверить цвет кнопки
         

         cy.get('#mail').type('german@dolnikov.ru'); // Ввели правильный логин
         cy.get('#pass').type('iLoveqastudio1'); // Ввели правильный пароль
         cy.get('#loginButton').click(); // Нажала войти

         cy.get('#messageHeader').contains('Авторизация прошла успешно'); // Перешли на окно "Успешной авторизации"
         cy.get('#messageHeader').should('be.visible'); // Надпись успешной авторизации видна пользователю
         cy.get('#exitMessageButton > .exitIcon').should('be.visible') // Есть крестик и он виден пользователю
     })



     it('Восстановить пароль', function () {
        cy.visit('https://login.qa.studio/'); // Зашли на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // Проверить цвет кнопки
        cy.get('#forgotEmailButton').click(); // Нажала "Забыли пароль?"

        cy.get('#forgotForm > .header').contains('Восстановите пароль'); // Перешли на страницу восстановления пароля
        cy.get('#mailForgot').type('nancy@bastie.com'); // Ввели почту
        cy.get('#restoreEmailButton').click(); // Нажала "Отправить код"

        cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail'); // Пароль отправили на новую почту
        cy.get('#messageHeader').should('be.visible');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible') // Есть крестик и он виден пользователю
    })

    

    it('Верный логин и НЕверный пароль', function () {
        cy.visit('https://login.qa.studio/'); // Зашли на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // Проверить цвет кнопки
        

        cy.get('#mail').type('german@dolnikov.ru'); // Ввели правильный логин
        cy.get('#pass').type('iLoveqastudio1000'); // Ввели НЕправильный пароль
        cy.get('#loginButton').click(); // Нажала войти

        cy.get('#messageHeader').contains('Такого логина или пароля нет'); // Перешли на страницу "Такого логина или пароля нет"
        cy.get('#messageHeader').should('be.visible');// Надпись "Такого логина или пароля нет" видна пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible') // Есть крестик и он виден пользователю
    })


    it('НЕверный логин и верный пароль', function () {
        cy.visit('https://login.qa.studio/'); // Зашли на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // Проверить цвет кнопки
        

        cy.get('#mail').type('ggerman@dolnikov.ru'); // Ввели НЕправильный логин
        cy.get('#pass').type('iLoveqastudio1'); // Ввели правильный пароль
        cy.get('#loginButton').click(); // Нажала войти

        cy.get('#messageHeader').contains('Такого логина или пароля нет'); // Перешли на страницу "Такого логина или пароля нет"
        cy.get('#messageHeader').should('be.visible');// Надпись "Такого логина или пароля нет" видна пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible') // Есть крестик и он виден пользователю
    })


    it('Проверка ошибки валидации', function () {
        cy.visit('https://login.qa.studio/'); // Зашли на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // Проверить цвет кнопки
        

        cy.get('#mail').type('germandolnikov.ru'); // Ввели логин с ошибкой валидации
        cy.get('#pass').type('iLoveqastudio1'); // Ввели правильный пароль
        cy.get('#loginButton').click(); // Нажала войти

        cy.get('#messageHeader').contains('Нужно исправить проблему валидации'); // Перешла на страницу ошибки валидации
        cy.get('#messageHeader').should('be.visible') // Ошибка валидации видна пользователю
    })


    it('Проверка на приведение к строчным буквам в логине', function () {
        cy.visit('https://login.qa.studio/'); // Зашли на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // Проверить цвет кнопки
        

        cy.get('#mail').type('GerMan@Dolnikov.ru'); // Ввели логин со строчными и заглавными буквами
        cy.get('#pass').type('iLoveqastudio1'); // Ввели правильный пароль
        cy.get('#loginButton').click(); // Нажала войти

        cy.get('#messageHeader').contains('Авторизация прошла успешно'); // Перешли на окно "Успешной авторизации"
        cy.get('#messageHeader').should('be.visible'); // Надпись успешной авторизации видна пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible') // Есть крестик и он виден пользователю
    })




    it('Проверка покупки доступного аватара', function () {
        cy.visit('https://pokemonbattle.ru'); // Зашли на сайт pokemonbattle.ru
        cy.get(':nth-child(1) > .auth__input').type('USER_LOGIN'); // Ввела логин
        cy.get('#password').type('USER_PASSWORD'); // Ввела пароль
        cy.get('.auth__button').click(); // Нажала войти
        cy.wait(2000);

        cy.get('.header__container > .header__id').click({ force: true }); // Нажала на кнопку личного кабинета
        cy.get('[href="/shop"]').click(); // Нажала на кнопку покупки аватара

        cy.get('.available > button').first().click({ force: true });

        cy.get('.credit').type('4620869113632996');                     // Ввела номер карты
        cy.get('.k_input_ccv').type('125');                             // Ввела CVV карты
        cy.get('.k_input_date').type('1225');                           // Ввела срок действия карты
        cy.get('.k_input_name').type('NAME');                           // Ввела ФИО владельца
        cy.get('.pay-btn').click();                                     // Ввела кнопку оплатить

        cy.get('#cardnumber').type('56456');                            // Ввела код подтверждения
        cy.get('.payment__submit-button').click();                      // Нажала кнопку отправить

        cy.contains('Покупка прошла успешно').should('be.visible');     // Есть сообщение об успешной покупке
    })
 })