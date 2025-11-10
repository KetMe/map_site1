// Координаты центров карт
const VERESHCHAGINO_CENTER = [58.0786, 54.6556]; // Верещагино, Пермский край
const MOSCOW_CENTER = [55.7558, 37.6173]; // Москва

// Инициализация карты Верещагино
const mapVereshchagino = L.map('map-vereshchagino').setView(VERESHCHAGINO_CENTER, 13);

// Инициализация карты Москвы
const mapMoscow = L.map('map-moscow').setView(MOSCOW_CENTER, 13);

// Добавление тайлов OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
}).addTo(mapVereshchagino);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
}).addTo(mapMoscow);

// Кастомная иконка маркера (черный круг)
const blackIcon = L.divIcon({
    className: 'custom-marker',
    html: '<div style="width: 100%; height: 100%; background-color: #000000; border-radius: 50%; border: 2px solid #ffffff; box-shadow: 0 0 0 1px #000000;"></div>',
    iconSize: [16, 16],
    iconAnchor: [8, 8]
});

// Функция для создания маркера с аудио
function createAudioMarker(map, lat, lng, audioPath, title = '') {
    const marker = L.marker([lat, lng], { icon: blackIcon }).addTo(map);
    
    // Создаем элемент audio
    const audio = new Audio(audioPath);
    
    // Обработчик клика на маркер
    marker.on('click', function() {
        // Останавливаем предыдущее воспроизведение, если оно было
        audio.pause();
        audio.currentTime = 0;
        // Воспроизводим аудио
        audio.play().catch(error => {
            console.error('Ошибка воспроизведения аудио:', error);
            alert('Не удалось воспроизвести аудио. Убедитесь, что файл существует в папке audio/');
        });
    });
    
    // Добавляем подсказку при наведении
    if (title) {
        marker.bindTooltip(title, {
            permanent: false,
            direction: 'top',
            className: 'custom-tooltip'
        });
    }
    
    return marker;
}

// Точки на карте Верещагино
createAudioMarker(
    mapVereshchagino,
    58.0786,
    54.6556,
    'audio/vereshchagino_sample1.ogg',
    'Точка 1'
);

createAudioMarker(
    mapVereshchagino,
    58.0850,
    54.6600,
    'audio/vereshchagino_sample2.ogg',
    'Точка 2'
);

// Точки на карте Москвы
createAudioMarker(
    mapMoscow,
    55.7558,
    37.6173,
    'audio/moscow_sample1.ogg',
    'Точка 1'
);

createAudioMarker(
    mapMoscow,
    55.7510,
    37.6180,
    'audio/moscow_sample2.ogg',
    'Точка 2'
);

createAudioMarker(
    mapMoscow,
    55.7600,
    37.6200,
    'audio/moscow_sample3.ogg',
    'Точка 3'
);

// Обработка ошибок загрузки карт
mapVereshchagino.whenReady(function() {
    console.log('Карта Верещагино загружена');
});

mapMoscow.whenReady(function() {
    console.log('Карта Москвы загружена');
});

