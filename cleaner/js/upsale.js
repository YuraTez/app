$('.tariff__item-upsale').on('click', function() {
  const value = $(this).val();
  const price = $(this).next().find(".tariff__period-price-new").text();
  const event = $(this).attr("data-price");
  $("#upsaleCostInfo").text(price)
});