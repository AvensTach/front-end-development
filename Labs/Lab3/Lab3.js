let topics = [
    { id: 1, name: "Основи JS", author: "Айк", type: "теорія", usersDay1: 120, usersDay2: 150, duration: { hours: 1, mins: 30 } },
    { id: 2, name: "Масиви", author: "Боб", type: "практика", usersDay1: 80, usersDay2: 60, duration: { hours: 2, mins: 0 } },
    { id: 3, name: "Функції", author: "Айк", type: "практика", usersDay1: 200, usersDay2: 190, duration: { hours: 1, mins: 0 } },
    { id: 4, name: "Об'єкти", author: "Сміт", type: "теорія", usersDay1: 50, usersDay2: 30, duration: { hours: 0, mins: 45 } },
    { id: 5, name: "Цикли", author: "Доу", type: "практика", usersDay1: 300, usersDay2: 250, duration: { hours: 1, mins: 20 } },
    { id: 6, name: "Умови", author: "Айк", type: "теорія", usersDay1: 110, usersDay2: 100, duration: { hours: 0, mins: 40 } },
    { id: 7, name: "Класи", author: "Боб", type: "практика", usersDay1: 70, usersDay2: 90, duration: { hours: 2, mins: 30 } },
    { id: 8, name: "DOM", author: "Сміт", type: "теорія", usersDay1: 90, usersDay2: 85, duration: { hours: 1, mins: 40 } },
    { id: 9, name: "Події", author: "Джонсон", type: "практика", usersDay1: 150, usersDay2: 140, duration: { hours: 1, mins: 50 } },
    { id: 10, name: "API", author: "Доу", type: "теорія", usersDay1: 210, usersDay2: 300, duration: { hours: 3, mins: 0 } }
];

function sortAndAverage(arr) {
    arr.sort((a, b) => {
        let timeA = a.duration.hours * 60 + a.duration.mins;
        let timeB = b.duration.hours * 60 + b.duration.mins;
        return timeA - timeB;
    });

    let totalUsers = 0;
    for (let i = 0; i < arr.length; i++) {
        totalUsers += (arr[i].usersDay1 + arr[i].usersDay2);
    }
    let averageUsers = totalUsers / arr.length;

    console.log("Відсортовані теми за тривалістю:", arr);
    console.log("Середня кількість користувачів на тему за два дні:", averageUsers);
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
        console.log("Додано на початок списку (неповна інформація).");
    } else {
        arr.sort((a, b) => a.author.localeCompare(b.author));
        let insertIndex = arr.findIndex(topic => topic.author.localeCompare(newTopic.author) > 0);

        if (insertIndex === -1) {
            arr.push(newTopic);
        } else {
            arr.splice(insertIndex, 0, newTopic);
        }
        console.log("Додано на правильне місце за алфавітом автора (повна інформація).");
    }
}

function calculateStudyDuration(selectedTopics) {
    let multiplier = selectedTopics.length <= 3 ? 1 : 1.5;

    let result = selectedTopics.map(topic => {
        let totalMins = (topic.duration.hours * 60 + topic.duration.mins) * multiplier;

        return {
            name: topic.name,
            newDuration: {
                hours: Math.floor(totalMins / 60),
                mins: Math.floor(totalMins % 60)
            }
        };
    });

    console.log(`Нова тривалість вивчення (множник x${multiplier}):`, result);
}

sortAndAverage(topics);
findMinUsersDay2(topics);

addNewTopic(topics, { id: 11, name: "Node.js", author: "Кларк", type: "теорія", usersDay1: 50, usersDay2: 60, duration: { hours: 2, mins: 0 } });

addNewTopic(topics, { id: 12, name: "React", author: "Вайт", type: "практика", usersDay1: 150, usersDay2: null, duration: { hours: 1, mins: 30 } });

calculateStudyDuration([topics[0], topics[1], topics[2], topics[3]]);







class UserAccount {
    constructor(surname, name, age, email, feedbackPurpose, dateStr, timeStr) {
        this.surname = surname;
        this.name = name;
        this.age = age;
        this.email = email;
        this.feedbackPurpose = feedbackPurpose;
        this.date = new Date(`${dateStr}T${timeStr}`);
    }
}

class UserManager {
    constructor() {
        this.users = [];
    }

    addUser(user) {
        this.users.push(user);
    }

    addUsers(usersArray) {
        this.users.push(...usersArray);
    }

    filterByMonthAndTime(targetMonth, targetHour) {
        let filtered = this.users.filter(user =>
            user.date.getMonth() === (targetMonth - 1) &&
            user.date.getHours() === targetHour
        );
        console.log(`Користувачі за місяць ${targetMonth} і годину ${targetHour}:`, filtered);
        return filtered;
    }

    findYoungestUser() {
        if (this.users.length === 0) return null;

        let youngest = this.users[0];
        for (let user of this.users) {
            if (user.age < youngest.age) {
                youngest = user;
            }
        }
        console.log(`Наймолодший: вік ${youngest.age}, email: ${youngest.email}, дата: ${youngest.date.toLocaleDateString()}`);
        return youngest;
    }

    categorizeUsers() {
        let classes = {
            "школярі до початку навчального року": 0,
            "не школярі впродовж семестру": 0,
            "інші": 0
        };

        this.users.forEach(user => {
            let month = user.date.getMonth() + 1; // 1-12
            let isBeforeSchool = (month >= 6 && month <= 8); // Червень - Серпень
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
        return classes;
    }

    sortByEmailAndShowPurpose() {
        let sorted = [...this.users].sort((a, b) => a.email.localeCompare(b.email));
        console.log("Відсортовані за Email:");
        sorted.forEach(user => {
            console.log(`Email: ${user.email} | Мета: ${user.feedbackPurpose}`);
        });
        return sorted;
    }
}

const manager = new UserManager();

manager.addUsers([
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
]);

manager.filterByMonthAndTime(8, 12);
manager.findYoungestUser();
manager.categorizeUsers();
manager.sortByEmailAndShowPurpose();