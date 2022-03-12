function predictValues() {
    try_ajax()
  }

  function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
  }
   
  function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
  }
  

function try_ajax() {
    var amount = parseInt(document.getElementById("amount").value) || 0;
    var oldbalanceOrig = parseInt(document.getElementById("oldbalanceOrig").value) || 0;
    var newbalanceOrig = parseInt(document.getElementById("oldbalanceOrig").value) || 0;
    var oldbalanceDest = parseInt(document.getElementById("oldbalanceDest").value) || 0;
    var newbalanceDest = parseInt(document.getElementById("newbalanceDest").value) || 0;
    var step = parseInt(document.getElementById("step").value) || 0;
  var server_data = [
    {"amount": amount, 
    "oldbalanceOrig": oldbalanceOrig,
    "newbalanceOrig": newbalanceOrig,
    "oldbalanceDest": oldbalanceDest,
    "newbalanceDest": newbalanceDest,
    "step": step,
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
      console.log(result);
      document.getElementById("dtc").innerHTML = result['dtc'] == 0 ? 'Not Fraud' : 'Fraud';
      document.getElementById("gnb").innerHTML = result['gnb'] == 0 ? 'Not Fraud' : 'Fraud';
      document.getElementById("lr").innerHTML = result['lr'] == 0 ? 'Not Fraud' : 'Fraud';
      document.getElementById("rf").innerHTML = result['rf'] == 0 ? 'Not Fraud' : 'Fraud';
      document.getElementById("svm").innerHTML = result['svm'] == 0 ? 'Not Fraud' : 'Fraud';
      
    } 
  });


}