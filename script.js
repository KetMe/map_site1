// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Глобальная переменная для отслеживания текущего воспроизводимого аудио
    let currentlyPlayingAudio = null;
    // Координаты центров карт
    const VERESHCHAGINO_CENTER = [58.0786, 54.6556]; // Верещагино, Пермский край
    const MOSCOW_CENTER = [55.7558, 37.6173]; // Москва

    // Инициализация карты Верещагино
    const mapVereshchagino = L.map('map-vereshchagino', {
        center: VERESHCHAGINO_CENTER,
        zoom: 13,
        scrollWheelZoom: true,
        zoomControl: true
    });

    // Инициализация карты Москвы
    const mapMoscow = L.map('map-moscow', {
        center: MOSCOW_CENTER,
        zoom: 13,
        scrollWheelZoom: true,
        zoomControl: true
    });

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
        
        // Добавляем обработчик окончания воспроизведения
        audio.addEventListener('ended', function() {
            if (currentlyPlayingAudio === audio) {
                currentlyPlayingAudio = null;
            }
        });
        
        // Обработчик клика на маркер
        marker.on('click', function() {
            // Останавливаем текущее воспроизведение, если есть
            if (currentlyPlayingAudio) {
                currentlyPlayingAudio.pause();
                currentlyPlayingAudio.currentTime = 0;
            }
            
            // Если это тот же аудио файл, что уже играет, просто останавливаем его
            if (currentlyPlayingAudio === audio) {
                currentlyPlayingAudio = null;
                return;
            }
            
            // Воспроизводим новый аудио
            audio.currentTime = 0;
            audio.play().then(() => {
                currentlyPlayingAudio = audio;
            }).catch(error => {
                console.error('Ошибка воспроизведения аудио:', error);
                alert('Не удалось воспроизвести аудио. Убедитесь, что файл существует в папке audio/');
                currentlyPlayingAudio = null;
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

    // Точки на карте Верещагино (6 точек)
    createAudioMarker(mapVereshchagino, 58.0774, 54.6635, 'audio/lenina_vrsh.ogg', 'Улица Ленина');
    createAudioMarker(mapVereshchagino, 58.0771, 54.6607, 'audio/leto_vrsh.ogg', 'ТЦ Лето');
    createAudioMarker(mapVereshchagino, 58.0797, 54.6786, 'audio/park_vrsh.ogg', 'Центральный парк');
    createAudioMarker(mapVereshchagino, 58.0779, 54.6537, 'audio/vokzal_vrsh.ogg', 'Железнодорожный вокзал');
    createAudioMarker(mapVereshchagino, 58.0754, 54.6513, 'audio/ptichki_vrsh.ogg', 'У проезжей части');
    createAudioMarker(mapVereshchagino, 58.080906, 54.689273, 'audio/dom_N3V68jFS.wav', 'У леса');

    // Точки на карте Москвы (5 точек)
    createAudioMarker(mapMoscow, 55.7366, 37.6064, 'audio/park_msk.WAV', 'Парк Музеон');
    createAudioMarker(mapMoscow, 55.7534, 37.6208, 'audio/red_squ.WAV', 'Красная площадь');
    createAudioMarker(mapMoscow, 55.8121, 37.8189, 'audio/shosse.WAV', 'Щелковское шоссе');
    createAudioMarker(mapMoscow, 55.7572, 37.6588, 'audio/tc_kursk_msk.WAV', 'ТЦ Атриум');
    createAudioMarker(mapMoscow, 55.7578, 37.6602, 'audio/vokzal_msk.WAV', 'Курский вокзал');

    // Обработка ошибок загрузки карт
    mapVereshchagino.whenReady(function() {
        console.log('Карта Верещагино загружена');
        setTimeout(function() {
            mapVereshchagino.invalidateSize();
        }, 100);
    });

    mapMoscow.whenReady(function() {
        console.log('Карта Москвы загружена');
        setTimeout(function() {
            mapMoscow.invalidateSize();
        }, 100);
    });

    // Дополнительная проверка размеров при загрузке окна
    window.addEventListener('load', function() {
        setTimeout(function() {
            mapVereshchagino.invalidateSize();
            mapMoscow.invalidateSize();
        }, 200);
    });
});

