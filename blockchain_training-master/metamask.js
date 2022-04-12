const NetworkNumber = document.getElementById("networkname");



async function switchNetwork(ropstenChainId){
    try {
    await window.ethereum.request({
    method: 'wallet_switchEthereumChain',
    params: [{chainId: web3.utils.toHex(ropstenChainId)}]
    })
    document.getElementsByName('displaywallet')[0].value = '';
    document.getElementsByName('displaybalance')[0].value = '';
    document.getElementsByName('displaynetwork')[0].value = '';
    // document.getElementById("myBtn").disabled = false;
    alert ("The network was switched!");
    showAndHide(); getWalletAddress(); getBalance() ; getChainId();
    document.getElementsByName('displaytransaction')[0].value = "";
    } catch(e) {
    
     alert(e.message);
    }
         
}


btn5.onclick = () => { //this is switch button
    let number = parseInt(NetworkNumber.value);
    switchNetwork(number);
  
    }

    clear.onclick = () => { // this is clear button
      document.getElementById('address').value = "";
      document.getElementById('ethvalue').value = "";
      document.getElementsByName('displaytransaction')[0].value = "";
    }



const btn = document.getElementById('myBtn'); // this is connect button

  btn.addEventListener('click', () => { 
  // hide button
  btn.style.display = 'none';

    });
