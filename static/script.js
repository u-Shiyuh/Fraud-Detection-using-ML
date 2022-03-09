function predictValues() {
    try_ajax()
  }


function try_ajax() {
    var amount = parseInt(document.getElementById("amount").value) || 0;
    var oldbalanceOrig = parseInt(document.getElementById("oldbalanceOrig").value) || 0;
    var newbalanceOrig = parseInt(document.getElementById("oldbalanceOrig").value) || 0;
    var oldbalanceDest = parseInt(document.getElementById("oldbalanceDest").value) || 0;
    var newbalanceDest = parseInt(document.getElementById("newbalanceDest").value) || 0;
    
  var server_data = [
    {"amount": amount, 
    "oldbalanceOrig": oldbalanceOrig,
    "newbalanceOrig": newbalanceOrig,
    "oldbalanceDest": oldbalanceDest,
    "newbalanceDest": newbalanceDest
  }
  ];
  $.ajax({
    type: "POST",
    url: "/predict_with_ajax",
    data: JSON.stringify(server_data),
    contentType: "application/json",
    dataType: 'json',
    success: function(result) {
      console.log("Result:");
      document.getElementById("dtc").innerHTML = result['dtc'];
      document.getElementById("gnb").innerHTML = result['gnb'];
      document.getElementById("lr").innerHTML = result['lr'];
      document.getElementById("rf").innerHTML = result['rf'];
      document.getElementById("svm").innerHTML = result['svm'];
      
    } 
  });
}