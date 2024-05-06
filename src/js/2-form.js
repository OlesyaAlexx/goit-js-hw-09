// Перевірка підтримки локального сховища перед використанням
if (typeof localStorage !== 'undefined') {
  //Оголошено обєкт formData
  const formData = { email: '', message: '' };

  //Оголошено ключ для зберігання даних у локальному сховищі
  const localStorageKey = 'feedback-form-state';

  //Отримано доступ до форми
  const feedbackFormEL = document.querySelector('.feedback-form');

  console.log(feedbackFormEL.elements);

  //Прослуховуємо подію 'input' на формі та викликаємо функцію
  feedbackFormEL.addEventListener('input', () => {
    //Присвоюємо значення ключам обєкта formData, і викликаємо метод trim() щоб не було пробілів по краях
    const userEmail = feedbackFormEL.elements.email.value.trim();
    const userMessage = feedbackFormEL.elements.message.value.trim();

    formData.email = userEmail;
    formData.message = userMessage;
    //Викеликаємо функцію storageFormData в яку передаєм першим аргументом ключ для зберігання даних у локальному сховищі і другим аргументом передає обєкт з ключами та їх значенями
    storageFormData(localStorageKey, formData);
  });

  //Оголошуємо функцію яка перетворює JavaScript об'єкт у JSON
  function storageFormData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Оголошуємо функцію для обробки події надсилання форми
  function handleSubmit(event) {
    const email = feedbackFormEL.elements.email.value;
    const message = feedbackFormEL.elements.message.value;

    //Перевіряємо чи заповнені поля форми
    if (email === '' || message === '') {
      alert('Fill please all fields');
      //Відміняємо поведінку браузера за замовчуванням
      event.preventDefault();
    } else {
      event.preventDefault();
      //Виводимо в консоль обєкт з його значеннями і розпаршуємо(перетворюємо) його з JSON в JavaScript
      console.log(JSON.parse(localStorage.getItem(localStorageKey)));

      //Очищуємо збережене значення ключа в localStorage
      localStorage.removeItem(localStorageKey);

      //Очищуємо форму
      feedbackFormEL.reset();
    }
  }

  // //Прослуховуємо подію 'submit' на формі та викликаємо функцію handleSubmit
  feedbackFormEL.addEventListener('submit', handleSubmit);

  //Оголошуємо функцію яка буде отримувати дані з локального сховища браузера за ключем і повертати ці дані у вигляді об'єкта JavaScript. Якщо дані відсутні або не можуть бути розібрані як JSON, функція виводить інформацію про помилку в консоль і повертає null.
  function errorData(key = 'empty') {
    const data = localStorage.getItem(key);
    try {
      return JSON.parse(data);
    } catch (error) {
      console.log(error.name);
      console.log(error.message);
      return null;
    }
  }

  //Оголошуємо функцію яка  дозволяє відтворити стан форми, якщо користувач вже вводив дані в неї раніше і ці дані були збережені у локальному сховищі браузера.

  function loadData() {
    const parsedData = errorData(localStorageKey) || {};

    feedbackFormEL.elements.email.value = parsedData.email || '';
    feedbackFormEL.elements.message.value = parsedData.message || '';
  }

  loadData();
} else {
  // Обробка випадку, коли локальне сховище не підтримується браузером
  console.log('Local storage is not supported by your browser.');
}
