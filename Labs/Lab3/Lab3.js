let topics = [
    { id: 1, name: "Основи JS", author: "Айк", type: "теорія", usersDay1: 120, usersDay2: 150, duration: 90 }, // duration у хвилинах
    { id: 2, name: "Масиви", author: "Боб", type: "практика", usersDay1: 80, usersDay2: 60, duration: 120 },
    { id: 3, name: "Функції", author: "Айк", type: "практика", usersDay1: 200, usersDay2: 190, duration: 60 },
    { id: 4, name: "Об'єкти", author: "Сміт", type: "теорія", usersDay1: 50, usersDay2: 30, duration: 45 },
    { id: 5, name: "Цикли", author: "Доу", type: "практика", usersDay1: 300, usersDay2: 250, duration: 80 },
    { id: 6, name: "Умови", author: "Айк", type: "теорія", usersDay1: 110, usersDay2: 100, duration: 40 },
    { id: 7, name: "Класи", author: "Боб", type: "практика", usersDay1: 70, usersDay2: 90, duration: 150 },
    { id: 8, name: "DOM", author: "Сміт", type: "теорія", usersDay1: 90, usersDay2: 85, duration: 100 },
    { id: 9, name: "Події", author: "Джонсон", type: "практика", usersDay1: 150, usersDay2: 140, duration: 110 },
    { id: 10, name: "API", author: "Доу", type: "теорія", usersDay1: 210, usersDay2: 300, duration: 180 }
];


function sortAndAverage(arr) {
    arr.sort((a, b) => a.duration - b.duration);

    let totalUsers = 0;
    for (let i = 0; i < arr.length; i++) {
        totalUsers += (arr[i].usersDay1 + arr[i].usersDay2);
    }
    let averageUsers = totalUsers / arr.length;

    console.log("Відсортовані теми:", arr);
    console.log("Середня кількість користувачів на тему:", averageUsers);
}


function findMinUsersDay2(arr) {
    let minTopic = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i].usersDay2 < minTopic.usersDay2) {
            minTopic = arr[i];
        }
    }
    console.log("ID теми з мінімальними переглядами за добу 2:", minTopic.id);
}

function addNewTopic(arr, newTopic) {
    let isMissingInfo = Object.values(newTopic).some(val => val === undefined || val === null || val === "");

    if (isMissingInfo) {
        arr.unshift(newTopic);
        console.log("Додано на початок (неповна інформація)");
    } else {
        arr.sort((a, b) => a.author.localeCompare(b.author));
        arr.push(newTopic);
        arr.sort((a, b) => a.author.localeCompare(b.author));
        console.log("Додано і відсортовано за автором (повна інформація)");
    }
}

// Функція 4: Обчислення тривалості вивчення декількох тем
function calculateStudyDuration(selectedTopics) {
    let multiplier = selectedTopics.length <= 3 ? 1 : 1.5;

    let result = selectedTopics.map(topic => {
        return {
            name: topic.name,
            newDuration: topic.duration * multiplier
        };
    });
    console.log("Нова тривалість вивчення:", result);
}

sortAndAverage(topics);
findMinUsersDay2(topics);
addNewTopic(topics, { id: 11, name: "Node.js", author: "Айк", type: "теорія", usersDay1: 50, usersDay2: 60, duration: 120 });
calculateStudyDuration([topics[0], topics[1], topics[2], topics[3]]);








class UserAccount {
    constructor(surname, name, age, email, feedbackPurpose, dateStr, timeStr) {
        this.surname = surname;
        this.name = name;
        this.age = age;
        this.email = email;
        this.feedbackPurpose = feedbackPurpose;
        this.date = new Date(dateStr + "T" + timeStr);
    }
}

// Створюємо 10 облікових записів
let users = [
    new UserAccount("Шевченко", "Іван", 15, "ivan@gmail.com", "скарга", "2023-08-15", "10:30"),
    new UserAccount("Коваленко", "Олена", 22, "olena@ukr.net", "подяка", "2023-09-10", "14:00"),
    new UserAccount("Бойко", "Тарас", 14, "taras@gmail.com", "питання", "2023-08-20", "09:15"),
    new UserAccount("Ткаченко", "Марія", 45, "maria@test.com", "скарга", "2023-09-12", "11:45"),
    new UserAccount("Кравченко", "Петро", 19, "petro@mail.com", "подяка", "2023-10-05", "16:20"),
    new UserAccount("Олійник", "Анна", 30, "anna@gmail.com", "питання", "2023-11-22", "18:00"),
    new UserAccount("Марченко", "Олег", 12, "oleg@school.com", "скарга", "2023-08-01", "12:00"),
    new UserAccount("Лисенко", "Яна", 50, "yana@work.com", "подяка", "2023-09-10", "08:30"),
    new UserAccount("Гриценко", "Ігор", 17, "igor@univ.com", "питання", "2023-10-15", "15:10"),
    new UserAccount("Романенко", "Юлія", 28, "yulia@gmail.com", "подяка", "2023-08-25", "17:40")
];

function filterUsersByMonthAndTime(usersArr, targetMonth, targetHour) {
    let filtered = usersArr.filter(user =>
        user.date.getMonth() === (targetMonth - 1) &&
        user.date.getHours() === targetHour
    );
    console.log(`Користувачі за місяць ${targetMonth} і годину ${targetHour}:`, filtered);
}

function findYoungestUser(usersArr) {
    let youngest = usersArr[0];
    for(let i = 1; i < usersArr.length; i++) {
        if(usersArr[i].age < youngest.age) {
            youngest = usersArr[i];
        }
    }
    console.log(`Наймолодший: вік ${youngest.age}, email: ${youngest.email}, дата: ${youngest.date.toLocaleDateString()}`);
}

function categorizeUsers(usersArr) {
    let classes = {
        "школярі до початку навчального року": 0,
        "не школярі впродовж семестру": 0,
        "інші": 0
    };

    usersArr.forEach(user => {
        let month = user.date.getMonth() + 1; // 1-12
        let isBeforeSchool = (month === 6 || month === 7 || month === 8);
        let isSemester = (month >= 9 && month <= 12) || (month >= 1 && month <= 5);

        if (user.age < 16 && isBeforeSchool) {
            classes["школярі до початку навчального року"]++;
        } else if (user.age >= 16 && isSemester) {
            classes["не школярі впродовж семестру"]++;
        } else {
            classes["інші"]++;
        }
    });
    console.log("Кількість користувачів за класами:", classes);
}

function sortByEmail(usersArr) {
    let sorted = [...usersArr].sort((a, b) => a.email.localeCompare(b.email));
    console.log("Відсортовані за Email:");
    sorted.forEach(user => {
        console.log(`Email: ${user.email} | Мета: ${user.feedbackPurpose}`);
    });
}

filterUsersByMonthAndTime(users, 8, 12); // Серпень (8), 12:00
findYoungestUser(users);
categorizeUsers(users);
sortByEmail(users);