if($(window).width() < 768){
  $("#feedbackSlider").slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    prevArrow: false,
    nextArrow: false,
    autoplay: true,
    autoplaySpeed: 4000,
  });
}

function switchTab() {
  const $currentTab = $('.tab__page.show');

  const currentIndex = $currentTab.data('tab');

  const nextIndex = (currentIndex % $('.tab__page').length) + 1;

  $currentTab.removeClass('show');

  $(`.tab__page[data-tab="${nextIndex}"]`).addClass('show');

  $(".popup").removeClass("active")
}

$(".open-animation-tab").on("click", function(){
  switchTab()

  animateLoading();
  startLottiAnimation("#lottiImgList" , "list-img.json" , true)
})

//animation
function startLottiAnimation(container , path , loop){
  const animation = lottie.loadAnimation({
    container: document.querySelector(container), // элемент, в который будет загружена анимация
    renderer: 'svg', // тип рендерера: 'svg', 'canvas' или 'html'
    loop: loop, // зацикливать анимацию
    autoplay: true, // автоматически воспроизводить анимацию
    path: `assets/animation/${path}` // путь к вашему JSON-файлу
  });
}

startLottiAnimation("#popupScanAnimation" , "popup-scan.json" , true)

const items = document.querySelectorAll('.analyzing__item');
const lineTrack = document.querySelector('.analyzing__line-track');

function animateLoading() {
  let totalTime = 8000; // Общее время анимации в миллисекундах
  let itemDuration = totalTime / items.length; // Время для каждого элемента
  let width = 0; // Начальная ширина

  // Увеличиваем ширину линии
  const widthInterval = setInterval(() => {
    width += (100 / (totalTime / 100)); // Увеличиваем ширину на 1% каждые 100 мс
    lineTrack.style.width = width + '%';

    if (width >= 100) {
      clearInterval(widthInterval);

      setTimeout(()=>{
        $(".popup-scan").addClass("active");
      },500)

    }
  }, 100);

  // Добавляем активный класс к элементам
  items.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add('active');
    }, (index + 1) * itemDuration);
  });
}