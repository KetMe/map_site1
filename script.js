// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
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

    // Точки на карте Верещагино (5 точек)
    createAudioMarker(mapVereshchagino, 58.0786, 54.6556, 'audio/lenina_vrsh.ogg', 'Улица Ленина');
    createAudioMarker(mapVereshchagino, 58.0800, 54.6570, 'audio/leto_vrsh.ogg', 'Парк Лето');
    createAudioMarker(mapVereshchagino, 58.0770, 54.6540, 'audio/park_vrsh.ogg', 'Центральный парк');
    createAudioMarker(mapVereshchagino, 58.0820, 54.6580, 'audio/vokzal_vrsh.ogg', 'Железнодорожный вокзал');
    createAudioMarker(mapVereshchagino, 58.0750, 54.6520, 'audio/ptichki_vrsh.ogg', 'Городской пруд');

    // Точки на карте Москвы (5 точек)
    createAudioMarker(mapMoscow, 55.7558, 37.6173, 'audio/park_msk.WAV', 'Парк Горького');
    createAudioMarker(mapMoscow, 55.7510, 37.6180, 'audio/red_squ.WAV', 'Красная площадь');
    createAudioMarker(mapMoscow, 55.7600, 37.6200, 'audio/shosse.WAV', 'Кутузовский проспект');
    createAudioMarker(mapMoscow, 55.7520, 37.6150, 'audio/tc_kursk_msk.WAV', 'Курский вокзал');
    createAudioMarker(mapMoscow, 55.7580, 37.6220, 'audio/vokzal_msk.WAV', 'Казанский вокзал');

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

