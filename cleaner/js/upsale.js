$('.tariff__item-upsale').on('click', function() {
  const value = $(this).val();
  const price = $(this).next().find(".tariff__period-price-new").text();
  const event = $(this).attr("data-price");
  $("#upsaleCostInfo").text(price)
});

function requestUpsale(product){
  const url = "https://rocknlabs.com/api/solidgate/upsell_subscription";
  const data = {
    "product_id": product,
  }

  async function sendPostRequest() {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getCookie("userToken")}`

        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }

      const responseData = await response.json();
      console.log('Success:', responseData);
      sendPostRequest(function (){
        $(".popup-success").addClass("active")
      },2000)
    } catch (error) {
      console.error('Error:', error);
    }
  }

  sendPostRequest()
}

$("#btnUpsale").on("click", function() {
  const product = $(".tariff__item-upsale:checked").val()
  console.log('1111' , product)
  console.log( getCookie("userToken"))
  requestUpsale(product)
})